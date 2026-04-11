import React, { useState, useEffect, memo } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useTheme } from '../../dopebase'
// import { memo } from 'react'
import ThreadItem from './ThreadItem'
import TypingIndicator from './TypingIndicator'
import dynamicStyles from './styles'

const MessageThread = memo(props => {
  const {
    messages,
    user,
    onChatMediaPress,
    onSenderProfilePicturePress,
    onMessageLongPress,
    channelItem,
    onListEndReached,
    onChatUserItemPress,
  } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [isParticipantTyping, setIsParticipantTyping] = useState(false)

  useEffect(() => {
    if (channelItem?.typingUsers) {
      updateTypingIndicator()
    }
  }, [channelItem?.typingUsers])

  const updateTypingIndicator = () => {
    const userID = user.id
    const { typingUsers } = channelItem

    if (typingUsers) {
      // Has anyone been typing in the last 3 seconds?
      const currentTime = Math.floor(new Date().getTime() / 1000)
      const keys = Object.keys(typingUsers)
      for (var i = 0; i < keys.length; i++) {
        const typingUserID = keys[i]
        if (typingUserID !== userID) {
          // only users who are not the current user
          const { lastTypingDate } = typingUsers[typingUserID]
          if (currentTime - lastTypingDate <= 3) {
            // if anyone has been typing in the last 3 seconds
            console.log('lastTypingDate', currentTime - lastTypingDate)
            setIsParticipantTyping(true)
            // We revisit this every 3 seconds to make sure we don't miss any updates
            setTimeout(() => {
              updateTypingIndicator()
            }, 1000)
            return
          }
        }
      }
    }
    setIsParticipantTyping(false)
  }

  const renderListHeaderComponent = () => {
    return (
      isParticipantTyping && (
        <View style={[styles.receiveItemContainer]}>
          <View style={styles.indicatorContainer}>
            <View style={styles.typingIndicatorContainer}>
              <TypingIndicator
                containerStyle={styles.indicatorDotContainer}
                dotRadius={5}
              />
            </View>
            <View style={styles.typingIndicatorContentSupport} />
            <View style={styles.typingIndicatorSupport} />
          </View>
        </View>
      )
    )
  }

  const renderChatItem = ({ item, index }) => {
    const isRecentItem = 0 === index
    const { participants } = channelItem
    return (
      <ThreadItem
        item={item}
        participants={participants}
        key={'chatitem' + (item.id || index)}
        user={{ ...user, userID: user.id }}
        onChatMediaPress={onChatMediaPress}
        onSenderProfilePicturePress={onSenderProfilePicturePress}
        onMessageLongPress={onMessageLongPress}
        isRecentItem={isRecentItem}
        onChatUserItemPress={onChatUserItemPress}
      />
    )
  }

  return (
    <FlatList
      inverted={true}
      vertical={true}
      style={styles.messageThreadContainer}
      showsVerticalScrollIndicator={false}
      data={messages}
      renderItem={renderChatItem}
      contentContainerStyle={styles.messageContentThreadContainer}
      removeClippedSubviews={true}
      ListHeaderComponent={() => renderListHeaderComponent()}
      keyboardShouldPersistTaps={'never'}
      onEndReached={onListEndReached}
      onEndReachedThreshold={0.3}
    />
  )
})

export default MessageThread
