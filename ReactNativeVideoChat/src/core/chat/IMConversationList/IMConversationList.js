import React, { memo } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { useTheme, EmptyStateView } from '../../dopebase'
import IMConversationView from '../IMConversationView'
import dynamicStyles from './styles'

const IMConversationList = memo(props => {
  const {
    onConversationPress,
    emptyStateConfig,
    conversations,
    loading,
    loadingBottom,
    user,
    headerComponent,
    onListEndReached,
    pullToRefreshConfig,
  } = props
  const { refreshing, onRefresh } = pullToRefreshConfig

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const renderConversationView = ({ item }) => (
    <IMConversationView
      onChatItemPress={onConversationPress}
      item={item}
      user={user}
    />
  )

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 15 }} size="small" />
      </View>
    )
  }

  return (
    <FlatList
      vertical={true}
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={conversations}
      renderItem={renderConversationView}
      keyExtractor={item => `${item.id}`}
      removeClippedSubviews={false}
      ListHeaderComponent={headerComponent}
      ListEmptyComponent={
        <View style={styles.emptyViewContainer}>
          <EmptyStateView emptyStateConfig={emptyStateConfig} />
        </View>
      }
      ListFooterComponent={
        loadingBottom && (
          <View style={styles.loadingFooter}>
            <ActivityIndicator size="small" />
          </View>
        )
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onListEndReached}
      onEndReachedThreshold={0.3}
    />
  )
})

export default IMConversationList
