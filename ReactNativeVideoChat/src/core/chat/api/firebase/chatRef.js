import { db, functions } from '../../../firebase/config'

// chat
export const channelsRef = db.collection('channels')
export const socialFeedsRef = db.collection('social_feeds')

// doc collections ref
export const DocRef = id => {
  return {
    // chat
    chatFeedLive: socialFeedsRef.doc(id).collection('chat_feed_live'),
    messagesLive: channelsRef.doc(id).collection('messages_live'),
  }
}

// chat firebase functions
export const ChatFunctions = () => {
  return {
    listChannels: functions().httpsCallable('listChannels'),
    createChannel: functions().httpsCallable('createChannel'),
    markAsRead: functions().httpsCallable('markAsRead'),
    markUserAsTypingInChannel: functions().httpsCallable(
      'markUserAsTypingInChannel',
    ),
    deleteMessage: functions().httpsCallable('deleteMessage'),
    listMessages: functions().httpsCallable('listMessages'),
    deleteGroup: functions().httpsCallable('deleteGroup'),
    leaveGroup: functions().httpsCallable('leaveGroup'),
    updateGroup: functions().httpsCallable('updateGroup'),
    addMessageReaction: functions().httpsCallable('addMessageReaction'),
    insertMessage: functions().httpsCallable('insertMessage'),
  }
}
