import { db, functions } from '../../../../firebase/config'

// social graph
export const socialGraphRef = db.collection('social_graph')

// doc collections ref
export const DocRef = id => {
  return {
    // friendship
    friendshipsLive: socialGraphRef.doc(id).collection('friendships_live'),
    mutualUsersLive: socialGraphRef.doc(id).collection('mutual_users_live'),
  }
}

export const FriendshipFunctions = () => {
  return {
    // friendship
    add: functions().httpsCallable('add'),
    unfollow: functions().httpsCallable('unfollow'),
    unfriend: functions().httpsCallable('unfriend'),
    fetchFriends: functions().httpsCallable('fetchFriends'),
    fetchFriendships: functions().httpsCallable('fetchFriendships'),
    fetchOtherUserFriendships: functions().httpsCallable(
      'fetchOtherUserFriendships',
    ),
    searchUsers: functions().httpsCallable('searchUsers'),
  }
}
