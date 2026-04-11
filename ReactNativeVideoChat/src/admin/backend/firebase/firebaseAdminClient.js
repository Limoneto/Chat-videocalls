import { db, functions } from '../../../core/firebase/config'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import { getUnixTimeStamp } from '../../../core/helpers/timeFormat'

const adminEntitiesRef = db.collection('admin_entities')

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

export const listEntities = async (categoryID, page = 0, size = 500) => {
  const instance = functions().httpsCallable('listEntities')
  try {
    const res = await instance({
      categoryID,
      page,
      size,
    })

    return res?.data?.entities ?? []
  } catch (error) {
    console.log(error)
    return []
  }
}

export const subscribeToEntities = (category_id, callback) => {
  return adminEntitiesRef
    .doc(category_id)
    .collection('entities_live')
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      { includeMetadataChanges: true },
      snapshot => callback && callback(snapshot?.docs.map(doc => doc.data())),
    )
}

/* INSERT_FIREBASE_FUNCTIONS_CALLS */
