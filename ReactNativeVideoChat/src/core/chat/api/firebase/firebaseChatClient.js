import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import { DocRef, channelsRef, ChatFunctions } from './chatRef'
import { getUnixTimeStamp } from '../../../helpers/timeFormat'

export const subscribeChannels = (userID, callback) => {
  return DocRef(userID)
    .chatFeedLive.orderBy('createdAt', 'desc')
    .onSnapshot({ includeMetadataChanges: true }, snapshot =>
      callback(snapshot?.docs.map(doc => doc.data())),
    )
}

export const subscribeToSingleChannel = (channelID, callback) => {
  return channelsRef.doc(channelID).onSnapshot(doc => callback(doc?.data()))
}

export const listChannels = async (userID, page = 0, size = 1000) => {
  const instance = ChatFunctions().listChannels
  try {
    const res = await instance({
      userID,
      page,
      size,
    })

    return res?.data?.channels
  } catch (error) {
    console.log(error)
    return null
  }
}

export const createChannel = async (
  creator,
  otherParticipants,
  name,
  isAdmin = false,
) => {
  var channelID = uuid()
  const id1 = creator.id
  if (otherParticipants?.length === 1) {
    const id2 = otherParticipants[0].id || otherParticipants[0].userID
    if (id1 === id2) {
      // We should never create a self chat
      return null
    }
    // For any 1-1 chat, the id of the channel is the concatanation of the two user ids (in alphabetical order)
    channelID = id1 < id2 ? id1 + id2 : id2 + id1
  }

  let data = {
    creatorID: id1,
    id: channelID,
    channelID,
    name: name || '',
    participants: [...otherParticipants, creator],
    createdAt: getUnixTimeStamp(),
  }

  if (isAdmin) {
    data['admins'] = [creator?.id]
  }
  const instance = ChatFunctions().createChannel
  try {
    const res = await instance(data)

    return res?.data
  } catch (error) {
    console.log('create error', error)
    return null
  }
}

export const markChannelMessageAsRead = async (
  channelID,
  userID,
  messageID,
  readUserIDs,
) => {
  const instance = ChatFunctions().markAsRead
  try {
    const res = await instance({
      channelID,
      userID,
      messageID,
      readUserIDs,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const markUserAsTypingInChannel = async (channelID, userID) => {
  const instance = ChatFunctions().markUserAsTypingInChannel
  try {
    const res = await instance({
      channelID,
      userID,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const sendMessage = async (channel, message) => {
  const instance = ChatFunctions().insertMessage
  try {
    const res = await instance({
      channelID: channel?.id,
      message: message,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteMessage = async (channel, messageID) => {
  if (!channel?.id || !messageID) {
    return
  }
  const instance = ChatFunctions().deleteMessage
  try {
    const res = instance({
      channelID: channel?.id,
      messageID: messageID,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const subscribeToMessages = (channelID, callback) => {
  return DocRef(channelID)
    .messagesLive.orderBy('createdAt', 'desc')
    .onSnapshot(
      { includeMetadataChanges: true },
      snapshot => callback && callback(snapshot?.docs.map(doc => doc.data())),
    )
}

export const listMessages = async (channelID, page = 0, size = 1000) => {
  const instance = ChatFunctions().listMessages
  try {
    const res = await instance({
      channelID,
      page,
      size,
    })

    return res?.data?.messages ?? []
  } catch (error) {
    console.log(error)
    return []
  }
}

export const deleteGroup = async channelID => {
  const instance = ChatFunctions().deleteGroup
  try {
    const res = await instance({
      channelID,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const leaveGroup = async (channelID, userID, content) => {
  const instance = ChatFunctions().leaveGroup
  try {
    const res = await instance({
      channelID,
      userID,
      content,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateGroup = async (channelID, userID, newData) => {
  const instance = ChatFunctions().updateGroup
  try {
    const res = await instance({
      channelID,
      userID,
      channelData: newData,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const currentTimestamp = () => {
  return getUnixTimeStamp()
}

export const addReaction = async (messageID, authorID, reaction, channelID) => {
  const instance = ChatFunctions().addMessageReaction
  try {
    const res = await instance({
      authorID,
      messageID,
      reaction,
      channelID,
    })
    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}
