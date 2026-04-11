import React, { useMemo } from 'react'
import { Platform } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme, useTranslations } from '../../core/dopebase'
import { useConfig } from '../../config'
import { IMDrawerMenu } from '../../core/ui'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import { AddEntityScreen, ListEntitiesScreen } from '../screens/entities'
/* INSERT_NAVIGATOR_SCREEN_IMPORTS */

const AppStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="AdminHome"
      screenOptions={{ headerTitleAlign: 'center', headerMode: 'float' }}>
      <AppStack.Screen name="AdminHome" component={HomeScreen} />
      <AppStack.Screen name="AdminEntityList" component={ListEntitiesScreen} />
      <AppStack.Screen name="AdminAddEntity" component={AddEntityScreen} />
      {/* INSERT_NAVIGATOR_SCREENS */}
    </AppStack.Navigator>
  )
}

const DrawerStack = () => {
  const config = useConfig()
  const { theme } = useTheme()
  const { localized } = useTranslations()

  const adminMenu = useMemo(
    () => [
      {
        title: localized('Home'),
        icon:
          Platform.OS === 'ios' ? theme.icons.home : theme.icons.home_android,
        navigationPath: 'AdminHome',
      },
      // INSERT_DRAWER_MENU_ITEMS
    ],
    [],
  )

  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 270 }}
      drawerContent={({ navigation, state }) => {
        return (
          <IMDrawerMenu
            navigation={navigation}
            menuItems={adminMenu}
            menuItemsSettings={config.drawerMenu.lowerMenu}
          />
        )
      }}
      initialRouteName="HomeStack">
      <Drawer.Screen
        options={{ headerShown: false }}
        name="HomeStack"
        component={HomeStack}
      />
    </Drawer.Navigator>
  )
}

const AdminStackNavigator = () => {
  const { localized } = useTranslations()

  // useNotificationOpenedApp()

  return (
    <Stack.Navigator
      initialRouteName="AdminHome"
      screenOptions={{ headerMode: 'float' }}>
      <Stack.Screen
        name={localized('AdminHome')}
        options={{ headerShown: false }}
        component={DrawerStack}
      />
    </Stack.Navigator>
  )
}

export default AdminStackNavigator
