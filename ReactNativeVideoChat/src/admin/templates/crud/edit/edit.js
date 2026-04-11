import React, { useEffect, useLayoutEffect, useState } from 'react'
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

export const EditEntityScreen = ({ navigation, route }) => {
  const {
    params: { id, entity },
  } = route
  const currentUser = useCurrentUser()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { editEntity, retrieveEntity, loading } = useEntities()

  const [loaded, setLoaded] = useState(false)
  /* INSERT_ADD_EDIT_FORM_USE_STATE */

  useLayoutEffect(() => {
    const colors = theme.colors[appearance]
    navigation.setOptions({
      headerTitle: localized(`Edit Entity`),
      headerStyle: {
        backgroundColor: colors.primaryBackground,
      },
      headerTintColor: colors.primaryText,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!id) {
      return
    }
    retrieveEntity(id).then(res => {
      if (res) {
        const entity = res.entity
        /* INSERT_EDIT_FORM_SET_STATE_FIELDS */
        setLoaded(true)
      }
    })
  }, [id])

  const handleSubmitButton = async () => {
    /* INSERT_ADD_EDIT_FORM_VALIDATION */

    const entity = {
      id,
      /* INSERT_ADD_EDIT_FORM_FIELDS */
    }
    const res = await editEntity(entity)
    if (res?.success) {
      /* INSERT_EDIT_FORM_SET_STATE_FIELDS_AFTER_SUBMISSION */
    }
  }

  if (!loaded) {
    return <ActivityIndicator />
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
          title={localized('Update Entity')}
          onPress={handleSubmitButton}
        />
      </KeyboardAwareScrollView>
      {loading && <ActivityIndicator />}
    </View>
  )
}
