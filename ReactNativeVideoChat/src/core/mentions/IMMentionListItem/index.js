import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from '../../dopebase'
import dynamicStyles from './styles'

export default function IMMentionListItem(props) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const onSuggestionTap = (user, hidePanel) => {
    props.onSuggestionTap(user)
  }

  const { item: user } = props

  const fullname = `${user.firstName && user.firstName} ${
    user.lastName && user.lastName
  }`

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSuggestionTap(user)}
      style={[
        styles.mentionItemContainer,
        // editorStyles.mentionListItemWrapper,
      ]}>
      <View style={styles.mentionPhotoContainer}>
        <View style={styles.mentionPhoto}>
          <Image
            source={{ uri: user.profilePictureURL }}
            style={[styles.mentionPhoto]}
          />
        </View>
      </View>
      <View style={styles.mentionNameContainer}>
        <Text style={styles.mentionName}>{fullname}</Text>
      </View>
    </TouchableOpacity>
  )
}
