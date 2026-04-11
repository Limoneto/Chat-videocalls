import React, { memo } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import IMNotificationItem from './IMNotificationItem'
import { useTheme, EmptyStateView } from '../../dopebase'
import dynamicStyles from './styles'

function IMNotification({
  notifications,
  onNotificationPress,
  emptyStateConfig,
}) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const renderItem = ({ item }) => (
    <IMNotificationItem onNotificationPress={onNotificationPress} item={item} />
  )

  if (notifications == null) {
    return (
      <View style={styles.feedContainer}>
        <ActivityIndicator style={{ marginTop: 15 }} size="small" />
      </View>
    )
  }
  if (notifications.length == 0) {
    return (
      <EmptyStateView
        style={styles.emptyStateView}
        emptyStateConfig={emptyStateConfig}
      />
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
      />
    </View>
  )
}

export default memo(IMNotification)
