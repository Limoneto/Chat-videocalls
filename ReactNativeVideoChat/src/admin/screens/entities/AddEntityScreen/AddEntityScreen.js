import React, { useState } from 'react'
import { View, Text } from 'react-native'
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
import { useAdminEntity } from '../../../backend/firebase'

export const AddEntityScreen = ({ navigation, route }) => {
  const currentUser = useCurrentUser()
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { addEntity, loading } = useAdminEntity()

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [dateRange, setDateRange] = useState(null)
  const [selectedOption, setSelectedOption] = useState([])
  const [isSwitch, setIsSwitch] = useState(false)
  const [document, setDocument] = useState(null) //this state name should not be changed
  const [media, setMedia] = useState(null) //this state name should not be changed
  const [date, setDate] = useState('')

  const handleSubmitButton = async () => {
    if (!name?.trim()) {
      Alert.alert(
        '',
        localized('Please enter a valid Name.'),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
      return
    } else if (!age?.trim()) {
      Alert.alert(
        '',
        localized('Please enter a valid Age.'),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
      return
    } else if (!dateRange) {
      Alert.alert(
        '',
        localized('Please select a valid Date Range.'),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
      return
    } else if (!selectedOption.length) {
      Alert.alert(
        '',
        localized('Please select an option.'),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
      return
    } else if (!document) {
      Alert.alert(
        '',
        localized('Please select a Document.'),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
      return
    } else if (!media) {
      Alert.alert(
        '',
        localized('Please select a Media.'),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
      return
    } else if (!date.length) {
      Alert.alert(
        '',
        localized('Please select a Date.'),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
      return
    }

    const entity = {
      name,
      age,
      dateRange,
      selectedOption,
      isSwitch,
      document,
      media,
      date,
      userID: currentUser.id,
    }
    const res = await addEntity(entity)
    if (res?.success) {
      setName('')
      setAge('')
      setDateRange(null)
      setSelectedOption([])
      setIsSwitch(false)
      setDocument(null)
      setMedia(null)
      setDate('')
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <FormTextInput title={'Name'} onChangeText={setName} />
        <DateRangePicker
          title={'DOB'}
          onDone={setDateRange}
          startDay={moment().format('YYYY-MM-DD')}
          endDay={moment().format('YYYY-MM-DD')}
        />
        <DropdownPicker
          title={'List'}
          allowMultipleSelection={false}
          selectedItemsList={['Apple']}
          items={['Apple', 'Banana', 'Guava', 'Orange', 'Mango']}
          onSelectItem={setSelectedOption}
        />
        <FormSwitch
          title={'Switch'}
          isSelected={true}
          onToggleSwitch={setIsSwitch}
        />
        <DocumentPicker
          title={'Select Document'}
          handleDocument={setDocument}
        />
        {/*select single image*/}
        <ImagePicker
          title={'Select Image'}
          allowsMultipleSelection={false}
          handleImages={setMedia}
        />
        <DatePicker title={'Select Date'} handleDate={setDate} />
        <FormTextInput title={'Age'} type={'numeric'} onChangeText={setAge} />
        <FormButton title={'submit'} onPress={handleSubmitButton} />
      </KeyboardAwareScrollView>
      {loading && <ActivityIndicator />}
    </View>
  )
}
