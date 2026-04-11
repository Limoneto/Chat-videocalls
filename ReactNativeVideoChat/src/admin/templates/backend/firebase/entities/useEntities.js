import { useState, useRef } from 'react'
import { storageAPI } from '../../../../core/media'
import {
  addEntity as addEntityAPI,
  editEntity as editEntityAPI,
  listEntities as listEntitiesAPI,
  retrieveEntity as retrieveEntityAPI,
  removeEntity as removeEntityAPI,
  subscribeToEntities as subscribeEntitiesAPI,
} from '../firebaseAdminClient'

export const useEntities = () => {
  const [entities, setEntities] = useState(null)

  const pagination = useRef({ page: 0, size: 25, exhausted: false })
  const [loading, setLoading] = useState(false)

  const startUpload = async uploadData => {
    return await storageAPI.uploadMedia(uploadData)
  }

  const addEntity = async fields => {
    setLoading(true)

    var mutableFields = { ...fields }

    /* INSERT_ADD_FORM_PREPROCESS_FIELDS_BEFORE_SENDING_TO_SERVER */

    const res = await addEntityAPI(mutableFields)
    setLoading(false)
    return res
  }

  const loadMoreEntities = async () => {
    if (pagination.current.exhausted) {
      return
    }
    const newEntities = await listEntitiesAPI(
      pagination.current.page,
      pagination.current.size,
    )
    if (newEntities?.length === 0) {
      pagination.current.exhausted = true
    }
    pagination.current.page += 1
    setEntities(deduplicatedEntities(entities, newEntities, true))
  }

  const subscribeToEntities = () => {
    return subscribeEntitiesAPI(newEntities => {
      setEntities(prevEntities =>
        deduplicatedEntities(prevEntities, newEntities, false),
      )
    })
  }

  const editEntity = async fields => {
    setLoading(true)
    var mutableFields = { ...fields }

    /* INSERT_EDIT_FORM_PREPROCESS_FIELDS_BEFORE_SENDING_TO_SERVER */

    const res = await editEntityAPI(mutableFields)
    setLoading(false)
    return res
  }

  const retrieveEntity = async id => {
    setLoading(true)
    const res = await retrieveEntityAPI(id)
    setLoading(false)
    return res
  }

  const removeEntity = async id => {
    setLoading(true)
    const res = await removeEntityAPI(id)
    setLoading(false)
    return res
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
    editEntity,
    retrieveEntity,
    removeEntity,
    loadMoreEntities,
    subscribeToEntities,
  }
}
