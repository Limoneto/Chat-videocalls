import React, { useContext } from 'react'
import { Platform } from 'react-native'
import { useTheme, useTranslations } from '../core/dopebase'

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForPhoneNumber = /\d{9}$/

export const ConfigContext = React.createContext({})

export const ConfigProvider = ({ children }) => {
  const { theme } = useTheme()
  const { localized } = useTranslations()
  const config = {
    isSMSAuthEnabled: true,
    isGoogleAuthEnabled: true,
    isAppleAuthEnabled: true,
    isFacebookAuthEnabled: true,
    forgotPasswordEnabled: true,
    appIdentifier: `rn-chat-app-${Platform.OS}`,
    facebookIdentifier: '1288726485109267',
    videoMaxDuration: 30,
    webClientId: Platform.select({
      ios: '22965687108-k9uqgstoahao7bndat1lgbhmlektp2jb.apps.googleusercontent.com',
      default:
        '22965687108-eb2r7krmmebfrd7ks8cl4pc073kek39g.apps.googleusercontent.com',
    }),
    onboardingConfig: {
      welcomeTitle: localized('Instachatty'),
      welcomeCaption: localized(
        'Send texts, photos, videos, and audio messages to your close friends.',
      ),
      walkthroughScreens: [
        {
          icon: require('../assets/icons/private-chat-icon.png'),
          title: localized('Private Messages'),
          description: localized(
            'Communicate with your friends via private messages.',
          ),
        },
        {
          icon: require('../assets/icons/group-chat-bubbles-icon.png'),
          title: localized('Group Chats'),
          description: localized(
            'Create group chats and stay in touch with your gang.',
          ),
        },
        {
          icon: require('../assets/icons/camera-walkthrough-icon.png'),
          title: localized('Send Photos & Videos'),
          description: localized(
            'Have fun with your friends by sending photos and videos to each other.',
          ),
        },
        {
          icon: require('../assets/icons/notification.png'),
          title: localized('Get Notified'),
          description: localized(
            'Receive notifications when your friends are looking for you.',
          ),
        },
      ],
    },
    tabIcons: {},
    drawerMenu: {
      upperMenu: [
        {
          title: localized('Home'),
          icon:
            Platform.OS === 'ios' ? theme.icons.home : theme.icons.home_android,
          navigationPath: 'HomeSearchStack',
        },
        {
          title: localized('Friends'),
          icon:
            Platform.OS === 'ios'
              ? theme.icons.users
              : theme.icons.users_android,
          navigationPath: 'FriendsSearchStack',
        },
        {
          title: localized('Profile'),
          icon:
            Platform.OS === 'ios' ? theme.icons.user : theme.icons.user_android,
          navigationPath: 'MyProfileStack',
        },
      ],
      lowerMenu: [
        {
          title: localized('Logout'),
          icon: theme.icons.logout,
          action: 'logout',
        },
      ],
    },
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
    ],
    signupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('E-mail Address'),
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: localized('Password'),
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
    ],
    editProfileFields: {
      sections: [
        {
          title: localized('PUBLIC PROFILE'),
          fields: [
            {
              displayName: localized('First Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'firstName',
              placeholder: 'Your first name',
            },
            {
              displayName: localized('Last Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'lastName',
              placeholder: 'Your last name',
            },
          ],
        },
        {
          title: localized('PRIVATE DETAILS'),
          fields: [
            {
              displayName: localized('E-mail Address'),
              type: 'text',
              editable: true,
              key: 'email',
              placeholder: 'Your email address',
            },
            {
              displayName: localized('Phone Number'),
              type: 'text',
              editable: true,
              regex: regexForPhoneNumber,
              key: 'phone',
              placeholder: 'Your phone number',
            },
          ],
        },
      ],
    },
    userSettingsFields: {
      sections: [
        {
          title: localized('GENERAL'),
          fields: [
            {
              displayName: localized('Allow Push Notifications'),
              type: 'switch',
              editable: true,
              key: 'push_notifications_enabled',
              value: true,
            },
            {
              ...(Platform.OS === 'ios'
                ? {
                    displayName: localized('Enable Face ID / Touch ID'),
                    type: 'switch',
                    editable: true,
                    key: 'face_id_enabled',
                    value: false,
                  }
                : {}),
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Save'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsFields: {
      sections: [
        {
          title: localized('CONTACT'),
          fields: [
            {
              displayName: localized('Address'),
              type: 'text',
              editable: false,
              key: 'push_notifications_enabled',
              value: '142 Steiner Street, San Francisco, CA, 94115',
            },
            {
              displayName: localized('E-mail us'),
              value: 'florian@instamobile.io',
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your e-mail address',
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Call Us'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsPhoneNumber: '+16504850000',
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)
