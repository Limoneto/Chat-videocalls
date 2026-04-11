import React, { memo } from 'react'
import { View } from 'react-native'
import { useTheme, useTranslations, StoriesTray} from '../../../dopebase'
import { SearchBarAlternate } from '../../../ui'
import dynamicStyles from './styles'
import IMConversationListView from '../../IMConversationListView/IMConversationListView'

const IMChatHomeComponent = memo(props => {
  const {
    onRefreshHeader,
    friends,
    onFriendListEndReached,
    onSearchBarPress,
    onFriendItemPress,
    navigation,
    onEmptyStatePress,
    searchBarplaceholderTitle,
    emptyStateConfig,
    isChatUserItemPress,
  } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const styles = dynamicStyles(theme, appearance)

  const defaultEmptyStateConfig = {
    title: localized('No Conversations'),
    description: localized(
      'Add some friends and start chatting with them. Your conversations will show up here.',
    ),
    callToAction: localized('Add friends'),
    onPress: onEmptyStatePress,
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatsChannelContainer}>
        <IMConversationListView
          isChatUserItemPress={isChatUserItemPress}
          navigation={navigation}
          emptyStateConfig={emptyStateConfig ?? defaultEmptyStateConfig}
          onRefreshHeader={onRefreshHeader}
          headerComponent={
            <>
              <View style={styles.searchBarContainer}>
                <SearchBarAlternate
                  onPress={onSearchBarPress}
                  placeholderTitle={
                    searchBarplaceholderTitle ?? localized('Search for friends')
                  }
                />
              </View>
              {friends && friends.length > 0 && (
                <StoriesTray
                  onStoryItemPress={onFriendItemPress}
                  onListEndReached={onFriendListEndReached}
                  storyItemContainerStyle={styles.userImageContainer}
                  data={friends}
                  displayVerifiedBadge={false}
                  displayLastName={false}
                  showOnlineIndicator={true}
                />
              )}
            </>
          }
        />
      </View>
    </View>
  )
})

export default IMChatHomeComponent
