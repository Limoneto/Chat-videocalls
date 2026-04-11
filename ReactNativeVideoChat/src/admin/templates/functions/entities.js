const functions = require('firebase-functions')
const admin = require('firebase-admin')
const collectionsUtils = require('../core/collections')

const { add, get, getList, remove } = collectionsUtils
const db = admin.firestore()

const entitiesRef = db

exports.removeEntity = functions.https.onCall(async (data, context) => {
  console.log('Removing entity')
  console.log(JSON.stringify(data))
  const { id } = data
  await remove(entitiesRef, 'entities', id, true)
})

exports.addEntity = functions.https.onCall(async (data, context) => {
  console.log('Adding entity')
  console.log(JSON.stringify(data))

  const { id } = data

  data.createdAt = Math.floor(new Date().getTime() / 1000)
  data.updatedAt = Math.floor(new Date().getTime() / 1000)

  const entity = await get(entitiesRef, 'entities', id)

  if (entity) {
    console.log(`invalid op, entity already exists - ${data}`)
    return entity
  }
  await add(entitiesRef, 'entities', data, true)
  return { success: true }
})

exports.editEntity = functions.https.onCall(async (data, context) => {
  console.log('Editing entity')
  console.log(JSON.stringify(data))

  const { id } = data

  data.updatedAt = Math.floor(new Date().getTime() / 1000)

  const entity = await get(entitiesRef, 'entities', id)

  if (!entity) {
    console.log(
      `invalid op, entity must already exists in order to be edited - ${data}`,
    )
    return entity
  }
  await add(entitiesRef, 'entities', data, true)
  return { success: true }
})

exports.retrieveEntity = functions.https.onCall(async (data, context) => {
  console.log('Retrieving entity')
  console.log(JSON.stringify(data))

  const { id } = data

  const entity = await get(entitiesRef, 'entities', id)

  if (!entity) {
    console.log(
      `invalid op, entity must already exists in order to be edited - ${data}`,
    )
    return { success: false, error: { message: 'Entity not found' } }
  }
  return { success: true, entity }
})

exports.listEntities = functions.https.onCall(async (data, context) => {
  const { page, size } = data

  const entities = await getList(entitiesRef, 'entities', page, size, true)
  return { entities, success: true }
})
