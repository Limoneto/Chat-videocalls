import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  memo,
} from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, Dimensions, Platform } from 'react-native'
import {
  useTheme,
  useTranslations,
  Alert,
  IconButton,
  useActionSheet,
} from '../../dopebase'

import * as DocumentPicker from 'expo-document-picker'
import { useCurrentUser } from '../../onboarding'
import IMChat from '../IMChat/IMChat'
import {
  useChatMessages,
  useChatChannels,
  useChatSingleChannel,
} from '../../chat/api'
import { storageAPI } from '../../media'
import { useUserReportingMutations } from '../../user-reporting'
import { formatMessage } from '../helpers/utils'
import { initiateAVCall } from '../../avchat'

const IMChatScreen = memo(props => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const currentUser = useCurrentUser()
  const dispatch = useDispatch()

  const { navigation, route } = props
  const openedFromPushNotification = route.params.openedFromPushNotification
  const isChatUserItemPress = route.params.isChatUserItemPress

  const {
    messages,
    subscribeToMessages,
    loadMoreMessages,
    sendMessage: sendMessageAPI,
    optimisticSetMessage,
    deleteMessage,
    addReaction,
    getMessageObject,
  } = useChatMessages()

  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [downloadObject, setDownloadObject] = useState(null)
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false)
  const [isRenameDialogVisible, setIsRenameDialogVisible] = useState(false)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(-1)
  const [inReplyToItem, setInReplyToItem] = useState(null)

  const richTextInputRef = useRef()

  const {
    createChannel,
    markChannelMessageAsRead,
    updateGroup,
    leaveGroup,
    deleteGroup,
  } = useChatChannels()
  const { remoteChannel, subscribeToSingleChannel } = useChatSingleChannel(
    route.params.channel,
  )

  const { showActionSheetWithOptions } = useActionSheet()

  const { markAbuse } = useUserReportingMutations()
  const subscribeMessagesRef = useRef(null)

  const photoUploadActionSheet = useMemo(() => {
    return {
      title: localized('Photo Upload'),
      options: [
        localized('Launch Camera'),
        localized('Open Photo Gallery'),
        localized('Cancel'),
      ],
      cancelButtonIndex: 2,
    }
  }, [])

  const groupOptionsActionSheet = useMemo(() => {
    return {
      title: localized('Group Settings'),
      options: [
        localized('View Members'),
        localized('Rename Group'),
        localized('Leave Group'),
      ],
    }
  }, [])

  const groupSettingsActionSheet = useMemo(() => {
    return {
      title: localized('Group Settings'),
      options: [...groupOptionsActionSheet.options, localized('Cancel')],
      cancelButtonIndex: 3,
    }
  }, [])

  const adminGroupSettingsActionSheet = useMemo(() => {
    return {
      title: localized('Group Settings'),
      options: [
        ...groupOptionsActionSheet.options,
        localized('Delete Group'),
        localized('Cancel'),
      ],
      cancelButtonIndex: 4,
      destructiveButtonIndex: 3,
    }
  }, [])

  const privateSettingsActionSheet = useMemo(() => {
    return {
      title: localized('Actions'),
      options: [
        localized('Block user'),
        localized('Report user'),
        localized('Cancel'),
      ],
      cancelButtonIndex: 2,
    }
  }, [])

  useLayoutEffect(() => {
    if (!openedFromPushNotification) {
      configureNavigation(
        channelWithHydratedOtherParticipants(route.params.channel),
      )
    } else {
      navigation.setOptions({ headerTitle: '' })
    }
  }, [navigation, route.params.channel])

  useEffect(() => {
    configureNavigation(remoteChannel || channel)
  }, [channel, remoteChannel])

  useEffect(() => {
    if (selectedMediaIndex !== -1) {
      setIsMediaViewerOpen(true)
    } else {
      setIsMediaViewerOpen(false)
    }
  }, [selectedMediaIndex])

  useEffect(() => {
    const hydratedChannel = channelWithHydratedOtherParticipants(
      route.params.channel,
    )
    if (!hydratedChannel) {
      return
    }

    const channelID = hydratedChannel?.channelID || hydratedChannel?.id

    setChannel(hydratedChannel)
    subscribeMessagesRef.current = subscribeToMessages(channelID)
    const unsubscribe = subscribeToSingleChannel(channelID)

    return () => {
      subscribeMessagesRef.current && subscribeMessagesRef.current()
      unsubscribe && unsubscribe()
    }
  }, [currentUser?.id])

  useEffect(() => {
    if (downloadObject !== null) {
      // We've just finished the photo upload, so we send the message out
      onSendInput()
    }
  }, [downloadObject])

  const onListEndReached = useCallback(() => {
    loadMoreMessages(route?.params?.channel?.id)
  }, [loadMoreMessages, route?.params?.channel?.id])

  const configureNavigation = channel => {
    if (!channel) {
      return
    }

    var title = channel?.name
    var isGroupChat = channel?.participants?.length > 2
    if (!title && channel?.participants?.length > 1) {
      const otherUser = channel.participants.find(
        participant => participant.id !== currentUser.id,
      )
      title =
        otherUser?.fullName ||
        (otherUser?.firstName ?? '') + ' ' + (otherUser?.lastName ?? '')
    }

    navigation.setOptions({
      headerTitle: title || route.params.title || localized('Chat'),
      headerStyle: {
        backgroundColor: theme.colors[appearance].primaryBackground,
      },
      headerBackTitleVisible: false,
      headerTitleStyle:
        isGroupChat && Platform.OS !== 'web'
          ? {
              width: Dimensions.get('window').width - 110,
            }
          : null,
      headerTintColor: theme.colors[appearance].primaryText,
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            source={require('../assets/settings-icon.png')}
            tintColor={theme.colors[appearance].primaryForeground}
            onPress={onSettingsPress}
            marginRight={15}
            width={20}
            height={20}
          />
          <IconButton
            source={require('../assets/call.png')}
            tintColor={theme.colors[appearance].primaryForeground}
            onPress={onAudioChat}
            marginRight={15}
            width={20}
            height={20}
          />
          <IconButton
            source={require('../assets/video-camera-filled.png')}
            tintColor={theme.colors[appearance].primaryForeground}
            onPress={onVideoChat}
            marginRight={15}
            width={20}
            height={20}
          />
        </View>
      ),
    })
  }

  useEffect(() => {
    if (!remoteChannel) {
      return
    }
    console.log(`Remote channel changed`)
    // We have a hydrated channel, so we replace the partial channel we have on the state
    const hydratedChannel = channelWithHydratedOtherParticipants(remoteChannel)
    setChannel(hydratedChannel)
    markThreadItemAsReadIfNeeded(hydratedChannel)

    // We have a hydrated channel, so we update the title of the screen
    if (openedFromPushNotification) {
      configureNavigation(hydratedChannel)
    }
  }, [remoteChannel])

  const channelWithHydratedOtherParticipants = channel => {
    const allParticipants = channel?.participants
    if (!allParticipants) {
      return channel
    }
    // otherParticipants are all the participants in the chat, except for the currently logged in user
    const otherParticipants =
      allParticipants &&
      allParticipants.filter(
        participant => participant && participant.id !== currentUser.id,
      )
    return { ...channel, otherParticipants }
  }

  const onVideoChat = useCallback(() => {
    if (channel?.otherParticipants) {
      initiateAVCall(channel, 'video', currentUser, dispatch, localized)
    }
  }, [channel, currentUser, dispatch, localized])

  const onAudioChat = useCallback(() => {
    if (channel?.otherParticipants) {
      initiateAVCall(channel, 'audio', currentUser, dispatch, localized)
    }
  }, [channel, currentUser, dispatch, localized])

  const onGroupSettingsActionDone = useCallback(
    (index, passedChannel) => {
      if (index === 0) {
        onViewMembers(passedChannel)
      } else if (index === 1) {
        showRenameDialog(true)
      } else if (index === 2) {
        onLeave(passedChannel)
      }
    },
    [onLeave, onViewMembers, showRenameDialog],
  )

  const onAdminGroupSettingsActionDone = useCallback(
    (index, passedChannel) => {
      if (index === 0) {
        onViewMembers(passedChannel)
      } else if (index === 1) {
        showRenameDialog(true)
      } else if (index === 2) {
        onLeave(passedChannel)
      } else if (index === 3) {
        onDeleteGroup(passedChannel)
      }
    },
    [onDeleteGroup, onLeave, onViewMembers, showRenameDialog],
  )

  const onPrivateSettingsActionDone = useCallback(
    (index, passedChannel) => {
      if (index == 2) {
        return
      }
      var message, actionCallback
      if (index == 0) {
        actionCallback = onUserBlockPress
        message = localized(
          "Are you sure you want to block this user? You won't see their messages again.",
        )
      } else if (index == 1) {
        actionCallback = onUserReportPress
        message = localized(
          "Are you sure you want to report this user? You won't see their messages again.",
        )
      }
      Alert.alert(localized('Are you sure?'), message, [
        {
          text: localized('Yes'),
          onPress: () => actionCallback(passedChannel),
        },
        {
          text: localized('Cancel'),
          style: 'cancel',
        },
      ])
    },
    [localized, onUserBlockPress, onUserReportPress],
  )

  const onSettingsPress = useCallback(() => {
    if (channel?.admins && channel?.admins?.includes(currentUser?.id)) {
      showActionSheetWithOptions(
        {
          title: adminGroupSettingsActionSheet.title,
          options: adminGroupSettingsActionSheet.options,
          cancelButtonIndex: adminGroupSettingsActionSheet.cancelButtonIndex,
          destructiveButtonIndex:
            adminGroupSettingsActionSheet.destructiveButtonIndex,
        },
        index => onAdminGroupSettingsActionDone(index, remoteChannel),
      )
    } else if (channel?.admins) {
      showActionSheetWithOptions(
        {
          title: groupSettingsActionSheet.title,
          options: groupSettingsActionSheet.options,
          cancelButtonIndex: groupSettingsActionSheet.cancelButtonIndex,
        },
        index => onGroupSettingsActionDone(index, remoteChannel),
      )
    } else {
      showActionSheetWithOptions(
        {
          title: privateSettingsActionSheet.title,
          options: privateSettingsActionSheet.options,
          cancelButtonIndex: privateSettingsActionSheet.cancelButtonIndex,
        },
        index => onPrivateSettingsActionDone(index, remoteChannel),
      )
    }
  }, [
    channel?.admins,
    currentUser?.id,
    onGroupSettingsActionDone,
    onAdminGroupSettingsActionDone,
    onPrivateSettingsActionDone,
  ])

  const onViewMembers = useCallback(
    passedChannel => {
      navigation.navigate('ViewGroupMembers', {
        channel: passedChannel,
      })
    },
    [navigation, remoteChannel],
  )

  const onChangeName = useCallback(
    async text => {
      const channelID = channel?.channelID || channel?.id
      setIsRenameDialogVisible(false)
      const data = {
        ...channel,
        name: text,
        content: `${
          currentUser?.firstName ?? 'Someone'
        } has renamed the group.`,
      }
      await updateGroup(channelID, currentUser?.id, data)
      setChannel(data)
      configureNavigation(data)
    },
    [
      channel,
      currentUser?.id,
      setChannel,
      configureNavigation,
      updateGroup,
      setIsRenameDialogVisible,
    ],
  )

  const onLeave = useCallback(
    passedChannel => {
      if (
        passedChannel?.admins.length === 1 &&
        passedChannel?.admins?.includes(currentUser?.id)
      ) {
        Alert.alert(
          localized('Set a new admin'),
          localized(
            'You are the only admin of this group so please choose a new admin first in order to leave this group',
          ),
          [{ text: 'Okay' }],
          { cancelable: false },
        )
      } else {
        Alert.alert(
          localized(`Leave ${passedChannel?.name ?? 'group'}`),
          localized('Are you sure you want to leave this group?'),
          [
            {
              text: 'Yes',
              onPress: () => onLeaveGroupConfirmed(passedChannel),
              style: 'destructive',
            },
            { text: 'No' },
          ],
          { cancelable: false },
        )
      }
    },
    [onLeaveGroupConfirmed, channel],
  )

  const onDeleteGroup = useCallback(
    passedChannel => {
      if (passedChannel?.admins?.includes(currentUser?.id)) {
        Alert.alert(
          localized('Delete Group'),
          localized('Are you sure you want to delete this group?'),
          [
            {
              text: 'Delete Group',
              onPress: () => onDeleteGroupConfirmed(passedChannel),
              style: 'destructive',
            },
            { text: 'No' },
          ],
          { cancelable: false },
        )
      }
    },
    [onLeaveGroupConfirmed, channel],
  )

  const onLeaveGroupConfirmed = useCallback(
    async passedChannel => {
      setLoading(true)
      await leaveGroup(
        passedChannel?.id,
        currentUser?.id,
        `${currentUser?.firstName ?? 'Someone'} has left the group.`,
      )
      setLoading(false)
      navigation.goBack(null)
    },
    [leaveGroup, navigation, channel, currentUser?.id],
  )

  const onDeleteGroupConfirmed = useCallback(
    async passedChannel => {
      setLoading(true)
      await deleteGroup(passedChannel?.id)
      setLoading(false)
      navigation.goBack(null)
    },
    [deleteGroup, channel?.id, navigation],
  )

  const showRenameDialog = useCallback(
    show => {
      setIsRenameDialogVisible(show)
    },
    [setIsRenameDialogVisible],
  )

  const markThreadItemAsReadIfNeeded = channel => {
    const {
      id: channelID,
      lastThreadMessageId,
      readUserIDs,
      lastMessage,
    } = channel
    const userID = currentUser?.id
    const isRead = readUserIDs?.includes(userID)

    if (
      !isRead &&
      channelID &&
      lastMessage &&
      userID &&
      !readUserIDs.includes(userID)
    ) {
      const newReadUserIDs = readUserIDs ? [...readUserIDs, userID] : [userID]
      markChannelMessageAsRead(
        channelID,
        userID,
        lastThreadMessageId,
        newReadUserIDs,
      )
    }
  }

  const onChangeTextInput = useCallback(
    text => {
      setInputValue(text)
    },
    [setInputValue],
  )

  const createOne2OneChannel = async () => {
    const response = await createChannel(
      currentUser,
      channelWithHydratedOtherParticipants(channel)?.otherParticipants,
    )
    if (response) {
      const channelID = channel?.channelID || channel?.id

      setChannel(channelWithHydratedOtherParticipants(response))
      subscribeMessagesRef.current && subscribeMessagesRef.current()
      subscribeMessagesRef.current = subscribeToMessages(channelID)
    }
    return response
  }

  const onSendInput = async () => {
    if (!inputValue && !downloadObject) {
      console.log('No message to be sent')
      return
    }
    let tempInputValue = inputValue
    if (!tempInputValue) {
      tempInputValue = formatMessage(downloadObject, localized)
    }

    const newMessage = optimisticSetMessage(
      currentUser,
      tempInputValue,
      downloadObject,
      inReplyToItem,
    )
    richTextInputRef.current?.clear()
    setInputValue('')
    setInReplyToItem(null)

    if (channel?.lastMessageDate || channel?.otherParticipants?.length > 1) {
      await sendMessage(newMessage, tempInputValue)
      return
    }

    // If we don't have a chat message, we need to create a 1-1 channel first
    const newChannel = await createOne2OneChannel()
    if (newChannel) {
      await sendMessage(newMessage, tempInputValue, newChannel)
    }
    setLoading(false)
  }

  const sendMessage = async (
    newMessage,
    tempInputValue,
    newChannel = channel,
  ) => {
    const response = await sendMessageAPI(newMessage, newChannel)
    if (response?.error) {
      alert(response.error)
      setInputValue(tempInputValue)
      setInReplyToItem(newMessage.inReplyToItem)
    } else {
      setDownloadObject(null)
    }
  }
  const onPhotoUploadDialogDone = useCallback(
    index => {
      if (index === 0) {
        onLaunchCamera()
      }

      if (index === 1) {
        onOpenPhotos()
      }
    },
    [onLaunchCamera, onOpenPhotos],
  )

  const onAddMediaPress = useCallback(() => {
    showActionSheetWithOptions(
      {
        title: photoUploadActionSheet.title,
        options: photoUploadActionSheet.options,
        cancelButtonIndex: photoUploadActionSheet.cancelButtonIndex,
      },
      onPhotoUploadDialogDone,
    )
  }, [
    onPhotoUploadDialogDone,
    photoUploadActionSheet,
    showActionSheetWithOptions,
  ])

  const onAudioRecordSend = useCallback(
    audioRecord => {
      startUpload(audioRecord)
    },
    [startUpload],
  )

  const onLaunchCamera = useCallback(() => {
    ImagePicker.launchCameraAsync({})
      .then(result => {
        if (result.canceled !== true) {
          startUpload(result.assets[0])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [startUpload])

  const onOpenPhotos = useCallback(() => {
    ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    })
      .then(result => {
        
        if (result.canceled !== true) {
          const image = result.assets[0]
          let pattern = /[a-zA-Z]+\/[A-Za-z0-9]+/i // match pattern eg: image/jpeg
          let match = pattern.exec(image.uri)
          startUpload({ type: (match ?? [])[0], ...image })
        }
      })
      .catch(function (error) {
        console.log("this the error",error)
      })
  }, [startUpload])

  const onAddDocPress = useCallback(async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync()
      if (res) {
        startUpload({
          ...res,
          type: 'file',
          fileID: +new Date() + res.name,
        })
      }
    } catch (e) {
      console.warn(e)
    }
  }, [startUpload])

  const startUpload = async uploadData => {
    setLoading(true)
    const { type } = uploadData
    if (!type) {
      console.log("Can't upload file without type")
      console.log(uploadData)
      alert(
        localized(
          `Can\'t upload file without a media type. Please report this error with the full error logs`,
        ),
      )
    }
    const { downloadURL, thumbnailURL } =
      await storageAPI.processAndUploadMediaFile(uploadData)
    if (downloadURL) {
      setDownloadObject({
        ...uploadData,
        source: downloadURL,
        uri: downloadURL,
        url: downloadURL,
        urlKey: '',
        type,
        thumbnailURL,
        thumbnailKey: '',
      })
    }
    setLoading(false)
  }

  const images = useMemo(() => {
    const list = []

    messages?.forEach(item => {
      if (item?.media) {
        const type = item.media?.type
        if (type?.startsWith('image')) {
          list.push({
            id: item.id,
            url: item.media.url,
          })
        }
      }
    })

    return list
  }, [messages])

  const mediaItemURLs = useMemo(() => {
    return images.flatMap(i => i.url)
  }, [images])

  const onChatMediaPress = useCallback(
    item => {
      const index = images?.findIndex(image => {
        return image.id === item.id
      })
      setSelectedMediaIndex(index)
    },
    [images, setSelectedMediaIndex],
  )

  const onMediaClose = useCallback(() => {
    setSelectedMediaIndex(-1)
  }, [setSelectedMediaIndex])

  const onUserBlockPress = useCallback(
    passedChannel => {
      reportAbuse(passedChannel, 'block')
    },
    [channel?.otherParticipants, currentUser?.id, reportAbuse],
  )

  const onUserReportPress = useCallback(
    passedChannel => {
      reportAbuse(passedChannel, 'report')
    },
    [channel?.otherParticipants, currentUser?.id, reportAbuse],
  )

  const reportAbuse = async (passedChannel, type) => {
    setLoading(true)
    const myID = currentUser.id
    const otherUser = passedChannel.participants.find(
      participant => participant.id !== myID,
    )
    const otherUserID = otherUser?.id

    const response = await markAbuse(myID, otherUserID, type)
    setLoading(false)
    if (!response?.error) {
      navigation.goBack(null)
    }
  }

  const onReplyActionPress = useCallback(
    inReplyToItem => {
      setInReplyToItem(inReplyToItem)
    },
    [setInReplyToItem, inReplyToItem],
  )

  const onReplyingToDismiss = useCallback(() => {
    setInReplyToItem(null)
  }, [setInReplyToItem])

  const onDeleteThreadItem = useCallback(
    message => {
      deleteMessage(channel, message?.id)
    },
    [channel, deleteMessage],
  )

  const onChatUserItemPress = useCallback(
    async item => {
      if (isChatUserItemPress) {
        if (item.id === currentUser.id) {
          navigation.navigate('MainProfile', {
            stackKeyTitle: 'MainProfile',
            lastScreenTitle: 'Chat',
          })
        } else {
          navigation.navigate('MainProfile', {
            user: item,
            stackKeyTitle: 'MainProfile',
            lastScreenTitle: 'Chat',
          })
        }
      }
    },
    [navigation, currentUser?.id],
  )

  const onReaction = useCallback(
    async (reaction, message) => {
      await addReaction(message, currentUser, reaction, channel?.id)
    },
    [addReaction, currentUser],
  )

  const onForwardMessageActionPress = useCallback(async (channel, message) => {
    let tempInputValue = { content: message.content }
    if (!tempInputValue) {
      tempInputValue = formatMessage(downloadObject, localized)
    }
    let hydrateChannel = channelWithHydratedOtherParticipants(channel)

    const newMessage = getMessageObject(
      currentUser,
      tempInputValue,
      message?.media,
      null,
      true,
    )

    if (hydrateChannel?.title) {
      const response = await sendMessageAPI(newMessage, hydrateChannel)
      if (response?.error) {
        alert(response.error)
        return false
      } else {
        setInReplyToItem(null)
        return true
      }
    }

    // If we don't have a chat message, we need to create a 1-1 channel first
    const newChannel = await createChannel(
      currentUser,
      channelWithHydratedOtherParticipants(channel)?.otherParticipants,
    )

    if (newChannel) {
      const response = await sendMessageAPI(newMessage, newChannel)
      if (response?.error) {
        alert(response.error)
        return false
      } else {
        setInReplyToItem(null)
        return true
      }
    }
    setInReplyToItem(null)
    return false
  }, [])

  return (

    <IMChat
      user={currentUser}
      messages={messages}
      inReplyToItem={inReplyToItem}
      loading={loading}
      richTextInputRef={richTextInputRef}
      onAddMediaPress={onAddMediaPress}
      onAddDocPress={onAddDocPress}
      onSendInput={onSendInput}
      onAudioRecordSend={onAudioRecordSend}
      onChangeTextInput={onChangeTextInput}
      onLaunchCamera={onLaunchCamera}
      onOpenPhotos={onOpenPhotos}
      mediaItemURLs={mediaItemURLs}
      isMediaViewerOpen={isMediaViewerOpen}
      selectedMediaIndex={selectedMediaIndex}
      onChatMediaPress={onChatMediaPress}
      onMediaClose={onMediaClose}
      isRenameDialogVisible={isRenameDialogVisible}
      showRenameDialog={showRenameDialog}
      onViewMembers={onViewMembers}
      onChangeName={onChangeName}
      onLeave={onLeave}
      onDeleteGroup={onDeleteGroup}
      onUserBlockPress={onUserBlockPress}
      onUserReportPress={onUserReportPress}
      onReplyActionPress={onReplyActionPress}
      onReplyingToDismiss={onReplyingToDismiss}
      onDeleteThreadItem={onDeleteThreadItem}
      channelItem={channel}
      onListEndReached={onListEndReached}
      onChatUserItemPress={onChatUserItemPress}
      onReaction={onReaction}
      onForwardMessageActionPress={onForwardMessageActionPress}
    />
  )
})

export default IMChatScreen
