import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useConfig } from '../config'
import { useTheme, useTranslations } from '../core/dopebase'
import {
  IMFriendsScreen,
  IMUserSearchModal,
} from '../core/socialgraph/friendships'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import { IMDrawerMenu } from '../core/ui'
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen'
import {
  IMBlockedUsersScreen,
  IMContactUsScreen,
  IMEditProfileScreen,
  IMUserSettingsScreen,
} from '../core/profile'
import {
  IMChatScreen,
  IMViewGroupMembersScreen,
  IMCreateGroupScreen,
} from '../core/chat'

const AppStack = createStackNavigator()
const Drawer = createDrawerNavigator()

const HomeStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerTitleAlign: 'center', headerMode: 'float' }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="CreateGroup" component={IMCreateGroupScreen} />
      <AppStack.Screen name="PersonalChat" component={IMChatScreen} />
      <AppStack.Screen
        name="ViewGroupMembers"
        component={IMViewGroupMembersScreen}
      />
    </AppStack.Navigator>
  )
}

const HomeSearchStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerMode: 'float',
        presentation: 'modal',
      }}>
      <AppStack.Screen
        name="Main"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  )
}

const FriendsStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Friends"
      screenOptions={{ headerMode: 'float' }}>
      <AppStack.Screen
        initialParams={{
          showDrawerMenuButton: true,
        }}
        name="Friends"
        component={IMFriendsScreen}
      />
    </AppStack.Navigator>
  )
}

const FriendsSearchStack = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerMode: 'float', presentation: 'modal' }}>
      <AppStack.Screen
        name="Main"
        component={FriendsStack}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  )
}

const MyProfileStack = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="MyProfile" component={MyProfileScreen} />
      <AppStack.Screen name="AccountDetails" component={IMEditProfileScreen} />
      <AppStack.Screen name="Settings" component={IMUserSettingsScreen} />
      <AppStack.Screen name="ContactUs" component={IMContactUsScreen} />
      <AppStack.Screen name="BlockedUsers" component={IMBlockedUsersScreen} />
    </AppStack.Navigator>
  )
}

// drawer stack
const DrawerStack = () => {
  const config = useConfig()
  const { theme } = useTheme()
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 270 }}
      screenOptions={{ sceneContainerStyle: theme.webContainerStyle }}
      drawerContent={({ navigation, state }) => {
        return (
          <IMDrawerMenu
            navigation={navigation}
            menuItems={config.drawerMenu.upperMenu}
            menuItemsSettings={config.drawerMenu.lowerMenu}
          />
        )
      }}
      initialRouteName="HomeSearchStack">
      <Drawer.Screen
        options={{ headerShown: false }}
        name="HomeSearchStack"
        component={HomeSearchStack}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="FriendsSearchStack"
        component={FriendsSearchStack}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="MyProfileStack"
        component={MyProfileStack}
      />
    </Drawer.Navigator>
  )
}

const MainStackNavigator = () => {
  const { localized } = useTranslations()

  // useNotificationOpenedApp()

  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerMode: 'float' }}>
      <AppStack.Screen
        name={localized('Home')}
        options={{ headerShown: false }}
        component={DrawerStack}
      />
    </AppStack.Navigator>
  )
}

export default MainStackNavigator
