import React from 'react'
import { IMAVAppCallWrapper } from './core/avchat'
import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from 'expo-web-browser'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { useConfig } from './config'
import { ProfileConfigProvider } from './core/profile/hooks/useProfileConfig'
import { OnboardingConfigProvider } from './core/onboarding/hooks/useOnboardingConfig'
import AppContainer from './screens/AppContainer'

const MainNavigator =
  IMAVAppCallWrapper(
    AppContainer
  )
WebBrowser.maybeCompleteAuthSession()

const AppContent = () => {
  const config = useConfig()

  return (
    <ProfileConfigProvider config={config}>
      <ActionSheetProvider>
        <OnboardingConfigProvider config={config}>
          <StatusBar style="auto" />
          <MainNavigator />
        </OnboardingConfigProvider>
      </ActionSheetProvider>
    </ProfileConfigProvider>
  )
}

export default AppContent
