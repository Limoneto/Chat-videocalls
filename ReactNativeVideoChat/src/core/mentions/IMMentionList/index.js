import React, { memo } from 'react'
import { ActivityIndicator, FlatList, Animated, View } from 'react-native'
import { useTheme } from '../../dopebase'
import IMMentionListItem from '../IMMentionListItem'
import dynamicStyles from './styles'

export default IMMentionList = memo(props => {
  const {
    onSuggestionTap,
    editorStyles,
    keyword,
    isTrackingStarted,
    containerStyle,
    list,
  } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const renderSuggestionsRow = ({ item, index }) => {
    return (
      <IMMentionListItem
        key={index.toString()}
        onSuggestionTap={onSuggestionTap}
        item={item}
        editorStyles={editorStyles}
      />
    )
  }

  const renderEmptyList = () => {
    if (list.length === 0) {
      return null
    }
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View>
    )
  }

  const withoutAtKeyword = keyword.toLowerCase().substr(1, keyword.length)
  const suggestions =
    withoutAtKeyword !== ''
      ? list.filter(user => user.name.toLowerCase().includes(withoutAtKeyword))
      : list

  if (!isTrackingStarted) {
    return null
  }

  return (
    <Animated.View
      key={keyword}
      style={[
        styles.usersMentionContainer,
        containerStyle,
        { height: Math.min(4 * 64, suggestions.length * 64) },
      ]}>
      <FlatList
        key={keyword}
        style={styles.usersMentionScrollContainer}
        keyboardShouldPersistTaps={'always'}
        horizontal={false}
        ListEmptyComponent={renderEmptyList}
        enableEmptySections={true}
        data={suggestions}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={rowData => {
          return renderSuggestionsRow(rowData)
        }}
      />
    </Animated.View>
  )
})