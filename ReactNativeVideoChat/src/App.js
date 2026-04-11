import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import * as Dopebase from './core/dopebase'; // Namespace import for reliable access
import configureStore from './redux/store';
import AppContent from './AppContent';
import translations from './translations/';
import { ConfigProvider } from './config';
import { AuthProvider } from './core/onboarding/hooks/useAuth';
import { ProfileAuthProvider } from './core/profile/hooks/useProfileAuth';
import { authManager } from './core/onboarding/api';
import InstamobileTheme from './theme';

const store = configureStore();

const App = () => {
  const theme = Dopebase.extendTheme(InstamobileTheme); // Access via namespace

  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs(true);
    // No need to request permissions here — handled by react-native-image-picker internally
  }, []);

  return (
    <Provider store={store}>
      <Dopebase.TranslationProvider translations={translations}>
        <Dopebase.DopebaseProvider theme={theme}>
          <ConfigProvider>
            <AuthProvider authManager={authManager}>
              <ProfileAuthProvider authManager={authManager}>
                <Dopebase.ActionSheetProvider>
                  <AppContent />
                </Dopebase.ActionSheetProvider>
              </ProfileAuthProvider>
            </AuthProvider>
          </ConfigProvider>
        </Dopebase.DopebaseProvider>
      </Dopebase.TranslationProvider>
    </Provider>
  );
};

export default App;
