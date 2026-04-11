import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import dynamicStyles from './styles'
import {
  useActionSheet,
  useTheme,
  useTranslations,
  ActivityIndicator,
  Alert,
} from '../../../dopebase'
import IMConversationIconView from '../../IMConversationView/IMConversationIconView/IMConversationIconView'
import { useCurrentUser } from '../../../onboarding'
import { useChatChannels } from '../../api'

const IMViewGroupMembersScreen = props => {
  
  const { navigation, route } = props
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const currentUser = useCurrentUser()
  const styles = dynamicStyles(theme, appearance)

  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(false)

  const selectedMemberRef = useRef(null)

  const { updateGroup, leaveGroup } = useChatChannels()

  const { showActionSheetWithOptions } = useActionSheet()

  const addAdminActionSheet = useMemo(() => {
    return {
      title: localized('settings'),
      options: [
        localized('Make Admin'),
        localized('Remove From Group'),
        localized('Cancel'),
      ],
      cancelButtonIndex: 2,
    }
  }, [])

  const removeAdminActionSheet = useMemo(() => {
    return {
      title: localized('settings'),
      options: [
        localized('Remove as Admin'),
        localized('Remove From Group'),
        localized('Cancel'),
      ],
      cancelButtonIndex: 2,
    }
  }, [])

  useEffect(() => {
    console.log("ccc", IMConversationIconView);
    navigation.setOptions({
      headerTitle: localized('Members'),
      headerStyle: {
        backgroundColor: theme.colors[appearance].primaryBackground,
      },
      headerBackTitleVisible: false,
      headerTintColor: theme.colors[appearance].primaryText,
    })
    setChannel(route?.params?.channel)
  }, [])

  const onPressMember = memberIndex => {
    // if selected member is not already admin and current user is admin and current user cannot make itself admin
    if (
      !channel?.admins?.includes(channel?.participants[memberIndex]?.id) &&
      channel?.admins?.includes(currentUser?.id) &&
      channel?.participants[memberIndex]?.id !== currentUser?.id
    ) {
      selectedMemberRef.current = memberIndex
      showActionSheetWithOptions(
        {
          title: addAdminActionSheet.title,
          options: addAdminActionSheet.options,
          cancelButtonIndex: addAdminActionSheet.cancelButtonIndex,
        },
        onMakeAdminActionDone,
      )
    } else if (
      channel?.admins?.includes(channel?.participants[memberIndex]?.id) &&
      channel?.admins?.includes(currentUser?.id) &&
      channel?.participants[memberIndex]?.id !== currentUser?.id
    ) {
      selectedMemberRef.current = memberIndex
      showActionSheetWithOptions(
        {
          title: removeAdminActionSheet.title,
          options: removeAdminActionSheet.options,
          cancelButtonIndex: removeAdminActionSheet.cancelButtonIndex,
        },
        onRemoveAdminActionDone,
      )
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => onPressMember(index)}
        style={styles.itemContainer}>
        <View style={styles.chatIconContainer}>
          <IMConversationIconView
            style={styles.photo}
            imageStyle={styles.photo}
            participants={[item]}
          />
          <Text style={styles.name}>
            {item?.firstName + ' ' + item?.lastName}
          </Text>
        </View>
        <View style={styles.addFlexContainer}>
          {channel?.admins?.includes(item?.id) && (
            <Text style={styles.adminText}>{localized('admin')}</Text>
          )}
        </View>
        <View style={styles.divider} />
      </TouchableOpacity>
    )
  }

  const onMakeAdmin = useCallback(async () => {
    const channelID = channel.channelID || channel?.id
    setLoading(true)
    const data = {
      admins: [
        ...channel?.admins,
        channel?.participants[selectedMemberRef.current]?.id,
      ],
      content: `${currentUser?.firstName ?? 'Someone'} added ${
        channel?.participants[selectedMemberRef.current]?.firstName
      } as a group admin.`,
    }
    let response = await updateGroup(channelID, currentUser?.id, data)
    if (response.success) {
      setChannel({ ...channel, ...data })
    }
    setLoading(false)
  }, [channel, currentUser?.firstName, currentUser?.id, updateGroup])

  const onRemoveAdmin = useCallback(async () => {
    const channelID = channel.channelID || channel?.id
    setLoading(true)
    const data = {
      admins: channel?.admins.filter(
        item => item !== channel?.participants[selectedMemberRef.current]?.id,
      ),
      content: `${currentUser?.firstName ?? 'Someone'} removed ${
        channel?.participants[selectedMemberRef.current]?.firstName
      } as a group admin.`,
    }
    console.log(data)
    let response = await updateGroup(channelID, currentUser?.id, data)
    if (response.success) {
      setChannel({ ...channel, ...data })
    }
    setLoading(false)
  }, [channel, currentUser?.firstName, currentUser?.id, updateGroup])

  const onMakeAdminActionDone = useCallback(
    index => {
      if (index === 0) {
        Alert.alert(
          localized('Add group admin'),
          localized('As a group admin, "') +
            channel?.participants[selectedMemberRef.current]?.firstName +
            localized(
              ' " will be able to manage who can join and customise the conversation',
            ),
          [
            {
              text: localized('Cancel'),
              onPress: () => console.log('Cancel Pressed'),
            },
            {
              text: localized('Make Admin'),
              onPress: () => onMakeAdmin(),
            },
          ],
        )
      } else if (index === 1) {
        onRemoveParticipant()
      }
    },
    [channel?.participants, localized, onMakeAdmin],
  )

  const onRemoveAdminActionDone = useCallback(
    index => {
      if (index === 0) {
        Alert.alert(
          localized('Remove from being a group admin?'),
          '"' +
            channel?.participants[selectedMemberRef.current]?.firstName +
            localized(
              '" will no longer be able to manage who can join and customise this conversation.',
            ),
          [
            {
              text: localized('Remove as Admin'),
              onPress: () => onRemoveAdmin(),
              style: 'destructive',
            },
            {
              text: localized('Cancel'),
              onPress: () => console.log('Cancel Pressed'),
            },
          ],
        )
      } else if (index === 1) {
        onRemoveParticipant()
      }
    },
    [channel?.participants, localized, onRemoveAdmin, onRemoveParticipant],
  )

  const onRemoveParticipant = useCallback(async () => {
    const channelID = channel.channelID || channel?.id
    setLoading(true)
    const data = {
      admins: channel?.admins.filter(
        item => item !== channel?.participants[selectedMemberRef.current]?.id,
      ),
      participants: channel?.participants.filter(
        item =>
          item?.id !== channel?.participants[selectedMemberRef.current]?.id,
      ),
    }

    let response = await leaveGroup(
      channelID,
      channel?.participants[selectedMemberRef.current]?.id,
      `${currentUser?.firstName ?? 'Someone'} removed ${
        channel?.participants[selectedMemberRef.current]?.firstName
      } from group.`,
    )
    if (response.success) {
      setChannel({ ...channel, ...data })
    }
    setLoading(false)
  }, [channel, currentUser?.firstName, currentUser?.id, leaveGroup])

  return (
    <View style={styles.container}>
      {channel && channel?.participants?.length > 0 && (
        <FlatList
          data={channel?.participants}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          initialNumToRender={5}
          removeClippedSubviews={true}
        />
      )}
      {loading && <ActivityIndicator />}
    </View>
  )
}

export default IMViewGroupMembersScreen
