import React, { useState, useLayoutEffect, useEffect } from 'react'
import { useTheme, useTranslations } from '../../../../dopebase'
import {
  useSocialGraphMutations,
  useSocialGraphMixedFriendships,
} from '../../api'
import IMFriendsListComponent from '../IMFriendsListComponent/IMFriendsListComponent'
import { FriendshipConstants } from '../../constants'
import { useCurrentUser } from '../../../../onboarding'

function IMAllFriendsScreen(props) {
  const { navigation, route } = props
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const currentUser = useCurrentUser()

  const {
    friendships,
    refreshing,
    setFriendships,
    pullToRefresh,
    loadMoreFriendships,
  } = useSocialGraphMixedFriendships()
  const { addEdge, unfriend, unfollow } = useSocialGraphMutations(
    setFriendships,
    false,
    true,
  )

  const [isLoading, setIsLoading] = useState(false)

  const title = route.params.title
  const otherUser = route.params.otherUser
  const type = route.params.type
  const followEnabled = route.params.followEnabled

  const stackKeyTitle = route.params.stackKeyTitle
    ? route.params.stackKeyTitle
    : 'Profile'

  const emptyStateConfig = {
    title: localized('No ') + (title || localized('People')),
    description: localized("There's nothing to see here yet."),
  }

  useEffect(() => {
    const vieweeID = otherUser ? otherUser?.id : currentUser?.id
    loadMoreFriendships(vieweeID, currentUser?.id, type)
  }, [currentUser?.id, otherUser?.id])

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]

    navigation.setOptions({
      headerTitle: route.params.title,
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
        borderBottomColor: colorSet.hairline,
      },
      headerTintColor: colorSet.primaryText,
    })
  }, [])

  const onFriendAction = (item, index) => {
    switch (item.type) {
      case FriendshipConstants.FriendshipType.none:
        onAddFriend(item, index)
        break
      case FriendshipConstants.FriendshipType.reciprocal:
        onUnfriend(item, index)
        break
      case FriendshipConstants.FriendshipType.inbound:
        onAccept(item, index)
        break
      case FriendshipConstants.FriendshipType.outbound:
        onCancel(item, index)
        break
    }
  }

  const onUnfriend = (item, index) => {
    onCancel(item, index)
  }

  const onAddFriend = async (item, index) => {
    setIsLoading(true)
    await addEdge(currentUser, item.user)
    setIsLoading(false)
  }

  const onCancel = async (item, index) => {
    setIsLoading(true)
    if (followEnabled) {
      await unfollow(currentUser, item.user)
    } else {
      await unfriend(currentUser, item.user)
    }
    setIsLoading(false)
  }

  const onAccept = async (item, index) => {
    setIsLoading(true)
    await addEdge(currentUser, item.user)
    setIsLoading(false)
  }

  const onFriendItemPress = item => {
    const user = item.user || item
    if (currentUser.id === user.id) {
      // my own profile, do nothing
    } else {
      navigation.push(stackKeyTitle, {
        user,
        stackKeyTitle: stackKeyTitle,
      })
    }
  }

  const onListEndReached = () => {
    const vieweeID = otherUser ? otherUser?.id : currentUser?.id
    loadMoreFriendships(vieweeID, currentUser?.id, type)
  }

  const pullToRefreshConfig = {
    refreshing: refreshing,
    onRefresh: () => {
      pullToRefresh(otherUser?.id, currentUser?.id, type)
    },
  }

  return (
    <IMFriendsListComponent
      viewer={currentUser}
      friendsData={friendships}
      searchBar={false}
      onFriendItemPress={onFriendItemPress}
      onFriendAction={onFriendAction}
      isLoading={friendships == null || isLoading}
      followEnabled={followEnabled}
      displayActions={true}
      emptyStateConfig={emptyStateConfig}
      onListEndReached={onListEndReached}
      pullToRefreshConfig={pullToRefreshConfig}
    />
  )
}

export default IMAllFriendsScreen
