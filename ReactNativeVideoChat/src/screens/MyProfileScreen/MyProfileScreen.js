import React, { useCallback, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme, useTranslations, TouchableIcon } from '../../core/dopebase'
import { logout, setUserData } from '../../core/onboarding/redux/auth'
import { useConfig } from '../../config'
import { IMUserProfileComponent } from '../../core/profile'
import { useProfileAuth } from '../../core/profile/hooks/useProfileAuth'

const MyProfileScreen = props => {
  const { navigation } = props
  const config = useConfig()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const authManager = useProfileAuth()

  const currentUser = useSelector(state => state.auth.user)

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]
    navigation.setOptions({
      title: localized('My Profile'),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
      },
      headerTitleStyle: {
        color: colorSet.primaryText,
      },
      headerLeft: () => (
        <TouchableIcon
          imageStyle={{ tintColor: colorSet.primaryText }}
          iconSource={theme.icons.menuHamburger}
          onPress={navigation.openDrawer}
        />
      ),
    })
  })

  const onAccountDetailsPress = () => {
    navigation.navigate('AccountDetails', {
      form: config.editProfileFields,
      screenTitle: localized('Edit Profile'),
    })
  }

  const onSettingsPress = () => {
    navigation.navigate('Settings', {
      form: config.userSettingsFields,
      screenTitle: localized('Settings'),
    })
  }

  const onBlockedUsersPress = () => {
    navigation.navigate('BlockedUsers', {
      screenTitle: localized('BlockedUsers'),
    })
  }

  const onContactUsPress = () => {
    navigation.navigate('ContactUs', {
      screenTitle: localized('Contact Us'),
      form: config.contactUsFields,
      phone: config.contactUsPhoneNumber,
    })
  }

  const onUpdateUser = useCallback(
    newUser => {
      dispatch(setUserData({ user: newUser }))
    },
    [dispatch, setUserData],
  )

  const onLogout = useCallback(async () => {
    await authManager?.logout(currentUser)
    dispatch(logout())
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoadScreen',
        },
      ],
    })
  }, [authManager, currentUser, dispatch, navigation, logout])

  const menuItems = [
    {
      title: localized('Account Details'),
      icon: require('../../assets/icons/account-details-icon.png'),
      tintColor: '#6b7be8',
      onPress: onAccountDetailsPress,
    },
    {
      title: localized('Settings'),
      icon: require('../../assets/icons/settings-icon.png'),
      tintColor: '#777777',
      onPress: onSettingsPress,
    },
    {
      title: localized('Contact Us'),
      icon: require('../../assets/icons/contact-us-icon.png'),
      tintColor: '#9ee19f',
      onPress: onContactUsPress,
    },
    {
      title: localized('Blocked Users'),
      icon: require('../../assets/icons/blocked-user-64.png'),
      tintColor: '#9a91c4',
      onPress: onBlockedUsersPress,
    },
  ]

  return (
    <IMUserProfileComponent
      onUpdateUser={onUpdateUser}
      onLogout={onLogout}
      menuItems={menuItems}
    />
  )
}

export default MyProfileScreen
