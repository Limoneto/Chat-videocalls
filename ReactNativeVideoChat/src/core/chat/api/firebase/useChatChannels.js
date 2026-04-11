import { useRef, useState } from 'react'
import {
  subscribeChannels as subscribeChannelsAPI,
  listChannels as listChannelsAPI,
  createChannel as createChannelAPI,
  markChannelMessageAsRead as markChannelMessageAsReadAPI,
  updateGroup as updateGroupAPI,
  leaveGroup as leaveGroupAPI,
  deleteGroup as deleteGroupAPI,
  markUserAsTypingInChannel as markUserAsTypingInChannelAPI,
} from './firebaseChatClient'

export const useChatChannels = () => {
  const [channels, setChannels] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [loadingBottom, setLoadingBottom] = useState(false)

  const pagination = useRef({ page: 0, size: 25, exhausted: false })
  const realtimeChannelsRef = useRef(null)
  const semaphores = useRef({ isMarkingAsTyping: false })

  const loadMoreChannels = async userID => {
    if (pagination.current.exhausted) {
      return
    }

    setLoadingBottom(true)

    const newChannels = await listChannelsAPI(
      userID,
      pagination.current.page,
      pagination.current.size,
    )
    if (newChannels?.length === 0) {
      pagination.current.exhausted = true
    }
    pagination.current.page += 1

    setLoadingBottom(false)

    setChannels(oldChannels =>
      deduplicatedChannels(oldChannels, newChannels, true),
    )
  }

  const subscribeToChannels = userID => {
    return subscribeChannelsAPI(userID, newChannels => {
      realtimeChannelsRef.current = newChannels
      setChannels(oldChannels =>
        deduplicatedChannels(oldChannels, newChannels, false),
      )
    })
  }

  const pullToRefresh = async userID => {
    setRefreshing(true)
    pagination.current.page = 0
    pagination.current.exhausted = false

    const newChannels = await listChannelsAPI(
      userID,
      pagination.current.page,
      pagination.current.size,
    )
    if (newChannels?.length === 0) {
      pagination.current.exhausted = true
    }
    pagination.current.page += 1
    setRefreshing(false)
    setChannels(
      deduplicatedChannels(realtimeChannelsRef.current, newChannels, true),
    )
  }

  const createChannel = async (creator, otherParticipants, name, isAdmin) => {
    return await createChannelAPI(creator, otherParticipants, name, isAdmin)
  }

  const markUserAsTypingInChannel = async (channelID, userID) => {
    if (semaphores.current.isMarkingAsTyping === true) {
      return
    }
    semaphores.current.isMarkingAsTyping = true
    const res = await markUserAsTypingInChannelAPI(channelID, userID)
    semaphores.current.isMarkingAsTyping = false
    return res
  }

  const markChannelMessageAsRead = async (
    channelID,
    userID,
    threadMessageID,
    readUserIDs,
  ) => {
    return await markChannelMessageAsReadAPI(
      channelID,
      userID,
      threadMessageID,
      readUserIDs,
    )
  }

  const updateGroup = async (channelID, userID, data) => {
    return await updateGroupAPI(channelID, userID, data)
  }

  const leaveGroup = async (channelID, userID, content) => {
    return await leaveGroupAPI(channelID, userID, content)
  }

  const deleteGroup = async channelID => {
    return await deleteGroupAPI(channelID)
  }

  const deduplicatedChannels = (oldChannels, newChannels, appendToBottom) => {
    const oldList = oldChannels || []
    const newList = newChannels || []

    const all = oldChannels
      ? appendToBottom
        ? [...oldList, ...newList]
        : [...newList, ...oldList]
      : newChannels
    const deduplicatedChannels = all.reduce((acc, curr) => {
      if (!acc.some(friend => friend.id === curr.id)) {
        acc.push(curr)
      }
      return acc
    }, [])
    return deduplicatedChannels
  }

  return {
    channels,
    refreshing,
    loadingBottom,
    subscribeToChannels,
    loadMoreChannels,
    pullToRefresh,
    markChannelMessageAsRead,
    markUserAsTypingInChannel,
    createChannel,
    updateGroup,
    leaveGroup,
    deleteGroup,
  }
}
