import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { BackHandler, View, Text, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/core'
import { useTheme, useTranslations } from '../../../dopebase'
import IMCreateGroupComponent from '../../ui/IMCreateGroupComponent/IMCreateGroupComponent'
import { useChatChannels } from '../../api'
import { useSocialGraphFriends } from '../../../socialgraph/friendships'
import { useCurrentUser } from '../../../onboarding'

const IMCreateGroupScreen = props => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const currentUser = useCurrentUser()
  const { friends, loadMoreFriends } = useSocialGraphFriends(currentUser?.id)

  const { createChannel } = useChatChannels()

  const [isLoading, setIsLoading] = useState(false)
  const [isNameDialogVisible, setIsNameDialogVisible] = useState(false)
  const [uiFriends, setUiFriends] = useState(null)

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]
    props.navigation.setOptions({
      headerTitle: localized('Select Friends'),
      headerRight:
        friends?.length > 1
          ? () => (
              <TouchableOpacity
                style={{ marginHorizontal: 7 }}
                onPress={onCreate}>
                <Text
                  style={{
                    color: colorSet.primaryForeground,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {localized('Create')}
                </Text>
              </TouchableOpacity>
            )
          : () => <View />,
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
      },
      headerTintColor: colorSet.primaryText,
    })
  }, [friends])

  useEffect(() => {
    setUiFriends(friends)
  }, [friends])

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackButtonPressAndroid,
      )
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackButtonPressAndroid,
        )
      }
    }, []),
  )

  const onBackButtonPressAndroid = () => {
    props.navigation.goBack()
    return true
  }

  const onCreate = () => {
    const checkedFriends = friends.filter(friend => friend.checked)
    if (checkedFriends.length === 0) {
      alert('Please select at least 2 friends.')
    } else {
      setIsNameDialogVisible(true)
    }
  }

  const onCheck = friend => {
    friend.checked = !friend.checked
    const newFriends = friends.map(item => {
      if (item.id == friend.id) {
        return friend
      }
      return item
    })
    setUiFriends(newFriends)
  }

  const onCancel = () => {
    setIsNameDialogVisible(false)
    setUiFriends(friends)
  }

  const onSubmitName = async name => {
    const participants = friends.filter(friend => friend.checked)
    if (participants.length < 2) {
      alert(localized('Select at least 2 friends to create a group.'))
      return
    }
    setIsNameDialogVisible(false)
    setIsLoading(true)
    const response = await createChannel(currentUser, participants, name, true)
    if (response) {
      onCancel();
      props.navigation.goBack()
    }
  }

  const onEmptyStatePress = () => {
    props.navigation.goBack()
  }

  const onListEndReached = () => {
    loadMoreFriends()
  }

  return (
    <IMCreateGroupComponent
      onCancel={onCancel}
      isNameDialogVisible={isNameDialogVisible}
      friends={uiFriends}
      onSubmitName={onSubmitName}
      onCheck={onCheck}
      isLoading={isLoading}
      onEmptyStatePress={onEmptyStatePress}
      onListEndReached={onListEndReached}
    />
  )
}

export default IMCreateGroupScreen
