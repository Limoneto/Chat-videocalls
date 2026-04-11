import { useState, useRef } from 'react'
import { storageAPI } from '../../../../core/media'
import {
  addEntity as addEntityAPI,
  listEntities as listEntitiesAPI,
  subscribeToEntities as subscribeEntitiesAPI,
} from '../firebaseAdminClient'

export const useAdminEntity = () => {
  const [entities, setEntities] = useState(null)

  const pagination = useRef({ page: 0, size: 25, exhausted: false })
  const [loading, setLoading] = useState(false)

  const startUpload = async uploadData => {
    try {
      const response = await storageAPI.processAndUploadMediaFile(uploadData)
      return {
        ...uploadData,
        source: response.downloadURL,
        uri: response.downloadURL,
        thumbnailURL: response.thumbnailURL ?? response.downloadURL,
      }
    } catch (error) {
      console.log('error uploading media', error)
      return null
    }
  }

  const addEntity = async fields => {
    setLoading(true)
    let document = await startUpload(fields?.document)
    const uploadMediaURLs = []
    const promises = fields?.media?.map(async media => {
      let url = await startUpload(media)
      uploadMediaURLs.push(url)
    })

    await Promise.all(promises)
    const res = await addEntityAPI({
      ...fields,
      document: document,
      media: uploadMediaURLs,
    })
    setLoading(false)
    return res
  }

  const loadMoreEntities = async categoryID => {
    if (pagination.current.exhausted) {
      return
    }
    const newEntities = await listEntitiesAPI(
      categoryID,
      pagination.current.page,
      pagination.current.size,
    )
    if (newEntities?.length === 0) {
      pagination.current.exhausted = true
    }
    pagination.current.page += 1
    setEntities(deduplicatedEntities(entities, newEntities, true))
  }

  const subscribeToEntities = categoryID => {
    return subscribeEntitiesAPI(categoryID, newEntities => {
      setEntities(prevEntities =>
        deduplicatedEntities(prevEntities, newEntities, false),
      )
    })
  }

  const deduplicatedEntities = (entities, newEntities, appendToBottom) => {
    if (!entities?.length || !newEntities?.length) {
      return entities || newEntities || []
    }

    const all = entities
      ? appendToBottom
        ? [...entities, ...newEntities]
        : [...newEntities, ...entities]
      : newEntities
    const deduplicatEntities = all.reduce((acc, curr) => {
      if (!acc.some(entity => entity.id === curr.id)) {
        acc.push(curr)
      }
      return acc
    }, [])
    return deduplicatEntities.sort((a, b) => {
      return b.createdAt - a.createdAt
    })
  }

  return {
    entities,
    loading,
    addEntity,
    loadMoreEntities,
    subscribeToEntities,
  }
}
