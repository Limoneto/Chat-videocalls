export const addEntity = async fields => {
  var entityID = uuid()

  let data = {
    id: entityID,
    ...fields,
    createdAt: getUnixTimeStamp(),
  }

  const instance = functions().httpsCallable('addEntity')
  try {
    const res = await instance(data)
    return res?.data
  } catch (error) {
    console.log('create error', error)
    return null
  }
}

export const listEntities = async (page = 0, size = 500) => {
  const instance = functions().httpsCallable('listEntities')
  try {
    const res = await instance({
      page,
      size,
    })

    return res?.data?.entities ?? []
  } catch (error) {
    console.log(error)
    return []
  }
}

export const subscribeToEntities = callback => {
  return db
    .collection('entities_live')
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      { includeMetadataChanges: true },
      snapshot => callback && callback(snapshot?.docs.map(doc => doc.data())),
    )
}

export const editEntity = async entityData => {
  const instance = functions().httpsCallable('editEntity')
  try {
    const res = await instance(entityData)
    return res?.data
  } catch (error) {
    console.log('entity edit error', error)
    return null
  }
}

export const retrieveEntity = async entityID => {
  const instance = functions().httpsCallable('retrieveEntity')
  try {
    const res = await instance({ id: entityID })
    return res?.data
  } catch (error) {
    console.log('entity retrieval error', error)
    return null
  }
}

export const removeEntity = async entityID => {
  const instance = functions().httpsCallable('removeEntity')
  try {
    const res = await instance({ id: entityID })
    return res?.data
  } catch (error) {
    console.log('entity removal error', error)
    return null
  }
}
