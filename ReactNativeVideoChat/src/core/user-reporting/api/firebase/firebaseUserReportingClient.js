import {
  DocRef,
  UserReportingFunctions,
} from './userReportingRef'

export const subscribeToReportedUsers = (userID, callback) => {
  return DocRef(userID).reportsLive.onSnapshot(snapshot => {
    if (!snapshot || !snapshot.docs) {
      callback && callback([])
    } else {
      callback && callback(snapshot?.docs?.map(doc => doc.data()))
    }
  })
}

export const fetchBlockedUsers = async (userID, page = 0, size = 1000) => {
  const instance = UserReportingFunctions().fetchBlockedUsers
  try {
    const res = await instance({
      userID,
      page,
      size,
    })

    return res?.data?.users
  } catch (error) {
    console.log(error)
    return null
  }
}

export const markAbuse = async (sourceUserID, destUserID, abuseType) => {
  if (sourceUserID === destUserID) {
    return null
  }

  const instance = UserReportingFunctions().markAbuse
  try {
    const res = await instance({
      sourceUserID,
      destUserID,
      abuseType,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const unblockUser = async (sourceUserID, destUserID) => {
  const instance = UserReportingFunctions().unblockUser
  try {
    const res = await instance({
      sourceUserID,
      destUserID,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}
