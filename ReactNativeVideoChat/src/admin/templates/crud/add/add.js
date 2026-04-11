import React, { useLayoutEffect, useState } from 'react'
import { View, Text, Platform } from 'react-native'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  FormButton,
  DatePicker,
  DateRangePicker,
  DocumentPicker,
  DropdownPicker,
  ImagePicker,
  FormSwitch,
  FormTextInput,
} from '../../../../core/dopebase/forms/components'
import {
  useTheme,
  useTranslations,
  ActivityIndicator,
  Alert,
} from '../../../../core/dopebase'
import dynamicStyles from './styles'
import { useCurrentUser } from '../../../../core/onboarding'
import { useEntities } from '../../../backend/firebase'
/* INSERT_ADD_EDIT_SCREEN_IMPORTS */

export const AddEntityScreen = ({ navigation, route }) => {
  const currentUser = useCurrentUser()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { addEntity, loading } = useEntities()

  /* INSERT_ADD_EDIT_FORM_USE_STATE */

  useLayoutEffect(() => {
    const colors = theme.colors[appearance]
    navigation.setOptions({
      headerTitle: localized(`Create New Entity`),
      headerStyle: {
        backgroundColor: colors.primaryBackground,
      },
      headerTintColor: colors.primaryText,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitButton = async () => {
    /* INSERT_ADD_EDIT_FORM_VALIDATION */

    const entity = {
      /* INSERT_ADD_EDIT_FORM_FIELDS */
    }
    const res = await addEntity(entity)
    if (res?.success) {
      /* INSERT_ADD_FORM_SET_STATE_FIELDS_AFTER_SUBMISSION */
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        {/* INSERT_ADD_EDIT_FORM_RENDER */}
        <FormButton
          title={localized('Create New Entity')}
          onPress={handleSubmitButton}
        />
      </KeyboardAwareScrollView>
      {loading && <ActivityIndicator />}
    </View>
  )
}
