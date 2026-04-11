import React, { useState, useCallback, memo } from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import {
  useTheme,
  useTranslations,
  ActivityIndicator,
  TouchableIcon,
  MediaViewerModal,
  KeyboardAvoidingView,
} from '../../dopebase'
import DialogInput from 'react-native-dialog-input'
import { useChatChannels } from '../api/firebase/useChatChannels'
import BottomInput from './BottomInput'
import MessageThread from './MessageThread'
import dynamicStyles from './styles'
import { EU } from '../../mentions/IMRichTextInput/EditorUtils'
import { ForwardMessageModal } from './ForwardMessageModal'

const reactionIcons = ['like', 'love', 'laugh', 'surprised', 'cry', 'angry']

const assets = {
  surprised: require('../assets/wow.png'),
  laugh: require('../assets/crylaugh.png'),
  cry: require('../assets/crying.png'),
  like: require('../assets/blue-like.png'),
  love: require('../assets/red-heart.png'),
  angry: require('../assets/anger.png'),
}

const IMChat = memo(props => {
  const {
    onSendInput,
    onAudioRecordSend,
    messages,
    onChangeTextInput,
    user,
    loading,
    inReplyToItem,
    onAddMediaPress,
    mediaItemURLs,
    isMediaViewerOpen,
    selectedMediaIndex,
    onChatMediaPress,
    onMediaClose,
    onChangeName,
    onAddDocPress,
    isRenameDialogVisible,
    showRenameDialog,
    onSenderProfilePicturePress,
    onReplyActionPress,
    onReplyingToDismiss,
    onDeleteThreadItem,
    channelItem,
    onListEndReached,
    richTextInputRef,
    onChatUserItemPress,
    onReaction,
    onForwardMessageActionPress,
  } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const { markUserAsTypingInChannel } = useChatChannels()

  const [channel] = useState({})
  const [temporaryInReplyToItem, setTemporaryInReplyToItem] = useState(null)
  const [threadItemActionSheet, setThreadItemActionSheet] = useState({})
  const [isReactionsContainerVisible, setIsReactionsContainerVisible] =
    useState(false)
  const [showForwardMessageModal, setShowForwardMessageModal] = useState(false)

  const CANCEL = localized('Cancel')
  const REPLY = localized('Reply')
  const FORWARD = localized('Forward')
  const DELETE = localized('Delete')

  const mediaThreadItemSheetOptions = [
    CANCEL,
    FORWARD,
  ]

  const inBoundThreadItemSheetOptions = [
    REPLY,
    FORWARD,
  ]
  const outBoundThreadItemSheetOptions = [
    REPLY,
    FORWARD,
    DELETE,
  ]

  const markUserAsTyping = inputValue => {
    if (inputValue?.length > 0) {
      markUserAsTypingInChannel(channelItem?.id, user.id)
    }
  }

  const onChangeText = useCallback(
    ({ displayText, text }) => {
      const mentions = EU.findMentions(text)
      onChangeTextInput({
        content: text,
        mentions,
      })
      markUserAsTyping(displayText)
    },
    [markUserAsTyping, onChangeTextInput],
  )

  const onAudioRecordDone = useCallback(
    item => {
      onAudioRecordSend(item)
    },
    [onAudioRecordSend],
  )

  const onSend = useCallback(() => {
    onSendInput()
  }, [onSendInput])

  const onMessageLongPress = useCallback(
    (threadItem, isMedia, reactionsPosition) => {
      setTemporaryInReplyToItem(threadItem)
      setIsReactionsContainerVisible(true)

      if (isMedia) {
        setThreadItemActionSheet({
          options: mediaThreadItemSheetOptions,
          reactionsPosition: reactionsPosition,
        })
      } else if (user.id === threadItem?.senderID) {
        setThreadItemActionSheet({
          inBound: false,
          options: outBoundThreadItemSheetOptions,
          reactionsPosition: reactionsPosition,
        })
      } else {
        setThreadItemActionSheet({
          inBound: true,
          options: inBoundThreadItemSheetOptions,
          reactionsPosition: reactionsPosition,
        })
      }
    },
    [setThreadItemActionSheet, setTemporaryInReplyToItem, user.id],
  )

  const onReplyPress = useCallback(
    index => {
      if (index === 0) {
        onReplyActionPress && onReplyActionPress(temporaryInReplyToItem)
      }
    },
    [onReplyActionPress, temporaryInReplyToItem],
  )

  const handleInBoundThreadItemActionSheet = useCallback(
    index => {
      if (index === inBoundThreadItemSheetOptions.indexOf(REPLY)) {
        return onReplyPress(index)
      }
      if (index === inBoundThreadItemSheetOptions.indexOf(FORWARD)) {
        return setShowForwardMessageModal(true)
      }
    },
    [onReplyPress],
  )

  const handleOutBoundThreadItemActionSheet = useCallback(
    index => {
      if (index === outBoundThreadItemSheetOptions.indexOf(REPLY)) {
        return onReplyPress(index)
      }

      if (index === outBoundThreadItemSheetOptions.indexOf(FORWARD)) {
        return setShowForwardMessageModal(true)
      }

      if (index === outBoundThreadItemSheetOptions.indexOf(DELETE)) {
        return onDeleteThreadItem && onDeleteThreadItem(temporaryInReplyToItem)
      }
    },
    [onDeleteThreadItem, onReplyPress],
  )

  const handleMediaThreadItemActionSheet = useCallback(index => {
    if (index === inBoundThreadItemSheetOptions.indexOf(FORWARD)) {
      setShowForwardMessageModal(true)
    }
  }, [])

  const onThreadItemActionSheetDone = useCallback(
    index => {
      if (threadItemActionSheet.inBound !== undefined) {
        if (threadItemActionSheet.inBound) {
          handleInBoundThreadItemActionSheet(index)
        } else {
          handleOutBoundThreadItemActionSheet(index)
        }
      }
      else {
        handleMediaThreadItemActionSheet(index)
      }
    },
    [threadItemActionSheet.inBound, handleInBoundThreadItemActionSheet],
  )

  const onForwardMessage = useCallback(
    channel => {
      if (onForwardMessageActionPress) {
        onForwardMessageActionPress(channel, temporaryInReplyToItem)
      }
    },
    [onForwardMessageActionPress, temporaryInReplyToItem],
  )

  const onReactionPress = async reaction => {
    // this was a reaction on the reactions tray, coming after a long press + one tap

    setIsReactionsContainerVisible(false)
    onReaction(reaction, temporaryInReplyToItem)
  }

  const renderReactionButtonIcon = (src, tappedIcon, index) => {
    return (
      <TouchableIcon
        key={index + 'icon'}
        containerStyle={styles.reactionIconContainer}
        iconSource={src}
        imageStyle={styles.reactionIcon}
        onPress={() => onReactionPress(tappedIcon)}
      />
    )
  }

  const renderReactionsContainer = () => {
    if (isReactionsContainerVisible) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setIsReactionsContainerVisible(false)
          }}
          style={styles.threadReactionContainer}>
          <View
            style={[
              styles.reactionContainer,
              { top: threadItemActionSheet?.reactionsPosition },
            ]}>
            {reactionIcons.map((icon, index) =>
              renderReactionButtonIcon(assets[icon], icon, index),
            )}
          </View>
        </TouchableOpacity>
      )
    }
    return null
  }

  const renderThreadItemActionSheet = () => {
    return (
      <View
        style={[
          styles.threadItemActionSheetContainer,
          styles.bottomContentContainer,
        ]}>
        {threadItemActionSheet?.options?.map((item, index) => {
          return (
            <TouchableOpacity
              key={item + index}
              onPress={() => {
                onThreadItemActionSheetDone(index)
                setIsReactionsContainerVisible(false)
              }}>
              <Text style={styles.threadItemActionSheetOptionsText}>
                {item}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  const ContainerComponent = Platform.OS === 'ios' ? KeyboardAvoidingView : View

  return (
    <ContainerComponent style={styles.personalChatContainer}>
      <>
        <MessageThread
          messages={messages}
          user={user}
          onChatMediaPress={onChatMediaPress}
          onSenderProfilePicturePress={onSenderProfilePicturePress}
          onMessageLongPress={onMessageLongPress}
          channelItem={channelItem}
          onListEndReached={onListEndReached}
          onChatUserItemPress={onChatUserItemPress}
        />
        {renderReactionsContainer()}
        {!isReactionsContainerVisible && (
          <BottomInput
            richTextInputRef={richTextInputRef}
            onAudioRecordDone={onAudioRecordDone}
            onChangeText={onChangeText}
            onSend={onSend}
            trackInteractive={true}
            onAddMediaPress={onAddMediaPress}
            onAddDocPress={onAddDocPress}
            inReplyToItem={inReplyToItem}
            onReplyingToDismiss={onReplyingToDismiss}
            participants={channelItem?.participants}
            onChatUserItemPress={onChatUserItemPress}
          />
        )}
        {isReactionsContainerVisible && renderThreadItemActionSheet()}
      </>
      <DialogInput
        isDialogVisible={isRenameDialogVisible}
        title={localized('Change Name')}
        hintInput={channel.name}
        textInputProps={{ selectTextOnFocus: true }}
        submitText={localized('OK')}
        submitInput={onChangeName}
        closeDialog={() => {
          showRenameDialog(false)
        }}
      />
      <MediaViewerModal
        mediaItems={mediaItemURLs}
        isModalOpen={isMediaViewerOpen}
        onClosed={onMediaClose}
        selectedMediaIndex={selectedMediaIndex}
      />
      <ForwardMessageModal
        isVisible={showForwardMessageModal}
        onDismiss={() => setShowForwardMessageModal(false)}
        onSend={onForwardMessage}
      />
      {(loading || messages == null) && <ActivityIndicator />}
    </ContainerComponent>
    
  )
})

export default IMChat
