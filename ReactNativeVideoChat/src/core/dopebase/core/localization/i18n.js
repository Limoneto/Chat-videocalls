import React, { useCallback, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

export const TranslationContext = React.createContext({});

export const TranslationProvider = ({ children, translations }) => {
  const [locale, setLocale] = useState(Localization.locale);
  const [i18n, setI18n] = useState(null);

  useEffect(() => {
    const initI18n = async () => {
      const newI18n = new I18n(translations);
      newI18n.enableFallback = true;
      newI18n.locale = locale;
      setI18n(newI18n);

      const storedLocale = await AsyncStorage.getItem('locale');
      if (storedLocale) {
        setLocale(storedLocale);
      }
    };

    initI18n();
  }, [translations]);

  useEffect(() => {
    if (i18n) {
      i18n.locale = locale;
      AsyncStorage.setItem('locale', locale);
      I18nManager.forceRTL(Localization.isRTL);
    }
  }, [locale, i18n]);

  const localized = useCallback(
    (key, config) => {
      if (!i18n) return key;
      const translation = i18n.t(key, { ...config, locale });
      return translation.includes('missing') ? key : translation;
    },
    [i18n, locale]
  );

  const setAppLocale = useCallback((newLocale) => {
    setLocale(newLocale);
  }, []);

  const value = {
    localized,
    setAppLocale,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};