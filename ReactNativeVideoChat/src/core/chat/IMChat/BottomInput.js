import React, { useState, useEffect, useCallback, memo } from 'react'
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Text,
  Keyboard,
  Platform,
} from 'react-native'
import { Audio } from 'expo-av'
import { useTheme, useTranslations, Alert } from '../../dopebase'
import dynamicStyles from './styles'
import BottomAudioRecorder from './BottomAudioRecorder'
import { IMMentionList, IMRichTextInput } from '../../mentions'
import IMRichTextView from '../../mentions/IMRichTextView/IMRichTextView'

const assets = {
  cameraFilled: require('../assets/camera-filled.png'),
  send: require('../assets/send.png'),
  mic: require('../assets/microphone.png'),
  close: require('../assets/close-x-icon.png'),
  newDocument: require('../assets/new-document.png'),
}

const BottomInput = memo(props => {
  const {
    onChangeText,
    onAudioRecordDone,
    onSend,
    onAddMediaPress,
    onAddDocPress,
    inReplyToItem,
    onReplyingToDismiss,
    participants,
    onChatUserItemPress,
    richTextInputRef,
  } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [formattedParticipants, setFormattedParticipants] = useState([])
  const [mentionsKeyword, setMentionsKeyword] = useState('')
  const [isTrackingStarted, setIsTrackingStarted] = useState(false)
  const [isAudioRecorderVisible, setIsAudioRecorderVisible] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (!participants) {
      return
    }
    const formattedUsers = participants.map(user => {
      const name = `${user.firstName} ${user.lastName}`
      const id = user.id

      return { id, name, ...user }
    })
    setFormattedParticipants(formattedUsers)
  }, [participants])

  const onChange = textObject => {
    const { displayText } = textObject
    setDisabled((displayText?.length ?? 0) == 0)
    onChangeText(textObject)
  }

  const onVoiceRecord = useCallback(async () => {
    const response = await Audio.getPermissionsAsync()
    if (response.status === 'granted') {
      console.log("grntted");
      Keyboard.dismiss()
      setTimeout(() => {
        setIsAudioRecorderVisible(prevValue => !prevValue)
      }, 300)
    } else if (response.status === 'denied') {
      Alert.alert(
        localized('Audio permission denied'),
        localized(
          'You must enable audio recording permissions in order to send a voice note.',
        ),
      )
    } else {
      const response = await Audio.requestPermissionsAsync()
      if (response.status === 'granted') {
        onVoiceRecord()
      }
    }
  }, [onVoiceRecord, localized])

  const focusTextInput = () => {
    if (isAudioRecorderVisible) {
      setIsAudioRecorderVisible(false)
      setTimeout(() => {
        richTextInputRef.current?.focus()
      }, 300)
    }
  }

  const onTextPressOut = () => {
    focusTextInput()
  }

  const onAudioSend = audioSource => {
    onAudioRecordDone(audioSource)
    focusTextInput()
  }

  const editorStyles = {
    input: {
      color: theme.colors[appearance].primaryText,
      paddingLeft: 0,
      ...Platform.select({
        web: {
          height: '100%',
        },
      }),
    },
    placeholderText: {
      color: theme.colors[appearance].secondaryText,
    },
    inputMaskText: {
      color: theme.colors[appearance].primaryText,
    },
  }

  const renderBottomInput = useCallback(() => {
    return (
      <View style={styles.bottomContentContainer}>
        {inReplyToItem && (
          <View style={styles.inReplyToView}>
            <Text style={styles.replyingToHeaderText}>
              {localized('Replying to')}{' '}
              <Text style={styles.replyingToNameText}>
                {inReplyToItem.senderFirstName || inReplyToItem.senderLastName}
              </Text>
            </Text>
            <IMRichTextView
              onUserPress={onChatUserItemPress}
              defaultTextStyle={styles.replyingToContentText}>
              {inReplyToItem.content}
            </IMRichTextView>
            <TouchableHighlight
              style={styles.replyingToCloseButton}
              onPress={onReplyingToDismiss}>
              <Image source={assets.close} style={styles.replyingToCloseIcon} />
            </TouchableHighlight>
          </View>
        )}
        <View style={styles.inputBar}>
          <View style={styles.leftIcons}>
            <TouchableOpacity
              onPress={onAddDocPress}
              style={styles.inputIconContainer}>
              <Image style={styles.inputIcon} source={assets.newDocument} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAddMediaPress}
              style={styles.inputIconContainer}>
              <Image style={styles.inputIcon} source={assets.cameraFilled} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={onTextPressOut}
            activeOpacity={1}
            style={styles.inputContainer}>
            <TouchableOpacity
              onPress={onVoiceRecord}
              style={styles.micIconContainer}>
              <Image style={styles.micIcon} source={assets.mic} />
            </TouchableOpacity>
            <IMRichTextInput
              richTextInputRef={richTextInputRef}
              initialValue={''}
              multiline={Platform.OS !== 'web'}
              placeholder={localized('Start typing...')}
              onChange={onChange}
              onPressOut={onTextPressOut}
              editable={!isAudioRecorderVisible}
              showEditor={true}
              toggleEditor={() => {}}
              editorStyles={editorStyles}
              onUpdateSuggestions={setMentionsKeyword}
              onTrackingStateChange={setIsTrackingStarted}
              autoFocus={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              setDisabled(true)
              onSend()
            }}
            style={[
              styles.inputIconContainer,
              disabled ? { opacity: 0.2 } : { opacity: 1 },
            ]}>
            <Image style={styles.inputIcon} source={assets.send} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }, [isAudioRecorderVisible, inReplyToItem, editorStyles])

  return (
    <>
      <IMMentionList
        list={formattedParticipants}
        keyword={mentionsKeyword}
        isTrackingStarted={isTrackingStarted}
        onSuggestionTap={richTextInputRef.current?.onSuggestionTap}
      />
      {renderBottomInput()}
      <BottomAudioRecorder
        theme={theme}
        appearance={appearance}
        localized={localized}
        visible={isAudioRecorderVisible}
        onSend={onAudioSend}
      />
    </>
  )
})

export default BottomInput
