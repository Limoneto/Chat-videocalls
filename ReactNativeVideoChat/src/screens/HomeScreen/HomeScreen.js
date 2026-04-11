import React, { useCallback, useLayoutEffect } from 'react'
import { useTheme, useTranslations, TouchableIcon } from '../../core/dopebase'
import { IMChatHomeComponent } from '../../core/chat'
import { useSocialGraphFriends } from '../../core/socialgraph/friendships'
import { useCurrentUser } from '../../core/onboarding'

import RNCallKeep from 'react-native-callkeep';

const HomeScreen = props => {
  const { navigation } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const currentUser = useCurrentUser()
  const { friends, loadMoreFriends, refreshFriends } = useSocialGraphFriends(
    currentUser?.id,
  )
 

  useLayoutEffect(() => {
    const colors = theme.colors[appearance]
    navigation.setOptions({
      headerTitle: localized('Home'),
      headerRight: () => (
        <TouchableIcon
          imageStyle={{ tintColor: colors.primaryText }}
          iconSource={theme.icons.inscription}
          onPress={() => navigation.navigate('CreateGroup')}
        />
      ),
      headerLeft: () => (
        <TouchableIcon
          imageStyle={{ tintColor: colors.primaryText }}
          iconSource={theme.icons.menuHamburger}
          onPress={openDrawer}
        />
      ),
      headerStyle: {
        backgroundColor: colors.primaryBackground,
      },
      headerTintColor: colors.primaryText,
    })
  }, [])

  const openDrawer = () => {
    navigation.openDrawer()
  }

  const onFriendItemPress = useCallback(
    friend => {
      const id1 = currentUser.id
      const id2 = friend.id
      var channel = {
        id: id1 < id2 ? id1 + id2 : id2 + id1,
        participants: [currentUser, friend],
      }

      navigation.navigate('PersonalChat', { channel })
    },
    [navigation],
  )

  const onSearchButtonPress = useCallback(async () => {
    navigation.navigate('UserSearchScreen', {
      followEnabled: false,
    })
  }, [navigation])

  const onEmptyStatePress = useCallback(() => {
    onSearchButtonPress()
  }, [onSearchButtonPress])

  const onSenderProfilePicturePress = useCallback(item => {
    console.log(item)
  }, [])

  const onFriendsListEndReached = useCallback(() => {
    loadMoreFriends(currentUser?.id)
  }, [loadMoreFriends, currentUser?.id])

  return (
    <IMChatHomeComponent
      onRefreshHeader={refreshFriends}
      friends={friends}
      onFriendListEndReached={onFriendsListEndReached}
      onFriendItemPress={onFriendItemPress}
      onSearchBarPress={onSearchButtonPress}
      navigation={navigation}
      onEmptyStatePress={onEmptyStatePress}
      onSenderProfilePicturePress={onSenderProfilePicturePress}
      user={currentUser}
    />
  )
}

export default HomeScreen
