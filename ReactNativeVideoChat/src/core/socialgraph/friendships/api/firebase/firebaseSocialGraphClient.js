import {
  FriendshipFunctions,
  DocRef,
} from './friendshipRef'

export const subscribeToFriendships = (userID, callback) => {
  return DocRef(userID).friendshipsLive.onSnapshot(querySnapshot => {
    if (!querySnapshot || !querySnapshot.docs) {
      callback && callback([])
    } else {
      callback && callback(querySnapshot?.docs?.map(doc => doc.data()))
    }
  })
}

export const subscribeToFriends = (userID, callback) => {
  return DocRef(userID).mutualUsersLive.onSnapshot(querySnapshot => {
    if (!querySnapshot || !querySnapshot.docs) {
      callback && callback([])
    } else {
      callback && callback(querySnapshot?.docs?.map(doc => doc.data()))
    }
  })
}

export const add = async (sourceUserID, destUserID) => {
  const instance = FriendshipFunctions().add
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

export const unfollow = async (sourceUserID, destUserID) => {
  const instance = FriendshipFunctions().unfollow
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

export const unfriend = async (sourceUserID, destUserID) => {
  const instance = FriendshipFunctions().unfriend
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

export const fetchFriends = async (userID, page = 0, size = 1000) => {
  const instance = FriendshipFunctions().fetchFriends
  try {
    const res = await instance({
      userID,
      page,
      size,
    })

    return res?.data?.friends
  } catch (error) {
    console.log(error)
    return null
  }
}

export const fetchFriendships = async (userID, page = 0, size = 1000) => {
  const instance = FriendshipFunctions().fetchFriendships
  try {
    const res = await instance({
      userID,
      page,
      size,
    })

    return res?.data?.friendships
  } catch (error) {
    console.log(error)
    return null
  }
}

export const fetchOtherUserFriendships = async (
  userID,
  viewerID,
  type,
  page = 0,
  size = 1000,
) => {
  const instance = FriendshipFunctions().fetchOtherUserFriendships
  try {
    const res = await instance({
      userID,
      viewerID,
      type,
      page,
      size,
    })

    return res?.data?.friendships
  } catch (error) {
    console.log(error)
    return null
  }
}

export const searchUsers = async (userID, keyword, page = 0, size = 1000) => {
  const instance = FriendshipFunctions().searchUsers
  try {
    const res = await instance({
      userID,
      keyword,
      page,
      size,
    })

    return res?.data?.users
  } catch (error) {
    console.log(error)
    return null
  }
}
