import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList, Text, TouchableOpacity } from 'react-native'
import {
  useTheme,
  useTranslations,
  TouchableIcon,
} from '../../../core/dopebase'
import dynamicStyles from './styles'
import { useAdminCategories } from '../../backend/firebase/categories/useAdminCategories'

const HomeScreen = props => {
  const { navigation } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { categories, subscribeToCategories } = useAdminCategories()

  useLayoutEffect(() => {
    const colors = theme.colors[appearance]
    navigation.setOptions({
      headerTitle: localized('Home'),
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

  useEffect(() => {
    subscribeToCategories()
  }, [])

  const openDrawer = () => {
    navigation.openDrawer()
  }

  return (
    <FlatList
      contentContainerStyle={styles.mainContainer}
      data={categories}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate('AdminEntityList', {
              title: item?.name,
              categoryID: item?.id,
            })
          }>
          <Text style={styles.itemText}>{item?.name}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default HomeScreen
