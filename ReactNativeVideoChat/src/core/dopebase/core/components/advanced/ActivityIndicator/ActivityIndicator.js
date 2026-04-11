import React, { memo } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../../..'
import { ActivityIndicator as NativeActivityIndicator } from 'react-native'
import dynamicStyles from './styles'

export const ActivityIndicator = memo(props => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <NativeActivityIndicator size="small" color="#f5f5f5" />
        {props.text && props.text.length > 1 ? (
          <Text>{props.text}</Text>
        ) : (
          <View />
        )}
      </View>
    </View>
  )
})
