import React, { memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme, useTranslations } from '../../dopebase'
import IMConversationIconView from './IMConversationIconView/IMConversationIconView'
import { timeFormat } from '../../helpers/timeFormat'
import dynamicStyles from './styles'
import { formatMessage } from '../helpers/utils'
import { IMRichTextView } from '../../mentions'

const IMConversationView = memo(props => {
  const { onChatItemPress, item, user } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const userID = user.userID || user.id
  const { markedAsRead } = item

  let title = item.title

  return (
    <TouchableOpacity
      onPress={() => onChatItemPress(item)}
      style={styles.chatItemContainer}>
      <IMConversationIconView
        participants={
          item?.admins?.length
            ? item.participants
            : item.participants.filter(value => {
                return value?.id !== userID
              })
        }
      />
      <View style={styles.chatItemContent}>
        <Text
          style={[
            styles.chatFriendName,
            !markedAsRead && styles.unReadmessage,
          ]}>
          {title}
        </Text>
        <View style={styles.content}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'middle'}
            style={[styles.message, !markedAsRead && styles.unReadmessage]}>
            <IMRichTextView
              emailStyle={[
                styles.message,
                !markedAsRead && styles.unReadmessage,
              ]}
              phoneStyle={[
                styles.message,
                !markedAsRead && styles.unReadmessage,
              ]}
              hashTagStyle={[
                styles.message,
                !markedAsRead && styles.unReadmessage,
              ]}
              usernameStyle={[
                styles.message,
                !markedAsRead && styles.unReadmessage,
              ]}>
              {formatMessage(item, localized) || ' '}
            </IMRichTextView>
            {' • '}
            <Text
              numberOfLines={1}
              ellipsizeMode={'middle'}
              style={[styles.message, !markedAsRead && styles.unReadmessage]}>
              {timeFormat(item.updatedAt || item.createdAt)}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
})

export default IMConversationView
