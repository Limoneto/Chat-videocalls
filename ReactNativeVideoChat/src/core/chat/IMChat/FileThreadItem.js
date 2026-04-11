import React, { memo } from 'react'
import { Image, Text, View } from 'react-native'
import { A } from '@expo/html-elements'

import { useTheme, useTranslations } from '../../dopebase'

import dynamicStyles from './styles'

const FileThreadItem = memo(props => {
  const { item, outBound } = props
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance, outBound)

  return (
    <View style={styles.bodyContainer}>
      <Image
        style={styles.icon}
        source={require('../assets/new-document.png')}
      />

      <Text numberOfLines={1} style={styles.title}>
        <A href={item.url} hrefAttrs={{ target: '_blank' }}>
          {item.name ?? localized('File')}
        </A>
      </Text>
    </View>
  )
})

export default FileThreadItem
