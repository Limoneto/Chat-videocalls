import React, { useState, useRef, memo } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import dynamicStyles from './styles'

const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.AndroidOutputFormat.MPEG_4,
    audioEncoder: Audio.AndroidAudioEncoder.AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.aac',
    outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
    audioQuality: Audio.IOSAudioQuality.MAX,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
}

const BottomAudioRecorder = memo(props => {
  const { visible, onSend, theme, appearance, localized } = props
  const styles = dynamicStyles(theme, appearance)

  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(null)
  const recording = useRef(null)
  const duration = useRef(null)
  const recordingSettings = useRef(RECORDING_OPTIONS_PRESET_HIGH_QUALITY)

  const recordStartTime = useRef(null)

  const cancelButton = {
    id: 'Cancel',
    title: 'Cancel',
    disabled: isLoading,
    onPress: () => onRecordStop(),
  }

  const sendButton = {
    id: 'Send',
    title: 'Send',
    disabled: false,
    onPress: () => onRecordSend(),
  }

  const recordButton = {
    id: 'Record',
    title: 'Record',
    disabled: false,
    onPress: () => onRecordStart(),
  }

  const multiButton = [cancelButton, sendButton]

  const updateScreenForRecordingStatus = status => {
    const currentTime = +new Date()
    const altDurationMillis = currentTime - recordStartTime.current
    const durationMillis = status.durationMillis || altDurationMillis

    if (status.canRecord) {
      setIsRecording(status.isRecording)
      setRecordingDuration(durationMillis)
      duration.current = durationMillis
    } else if (status.isDoneRecording) {
      setIsRecording(false)
      setRecordingDuration(durationMillis)
      duration.current = durationMillis
    }
  }

  const onRecordSend = async () => {
    setIsLoading(true)
    await stopRecording()
    const audioSource = {
      uri: recording.current.getURI(),
      type: 'audio',
      duration: duration.current,
    }

    setRecordingDuration(null)
    setIsLoading(false)
    onSend(audioSource)
  }

  const onRecordStop = async () => {
    if (isRecording) {
      setIsLoading(true)
      setIsRecording(false)
      setIsLoading(false)
      await stopRecording()
      setRecordingDuration(null)
    }
  }

  const onRecordStart = () => {
    recordStartTime.current = +new Date()
    if (!isRecording) {
      beginRecording()
    }
  }

  const stopRecording = async () => {
    try {
      await recording.current.stopAndUnloadAsync()
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
  }

  const beginRecording = async () => {
    setIsLoading(true)

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
    })
    if (recording.current !== null) {
      recording.current.setOnRecordingStatusUpdate(null)
      recording.current = null
    }

    const newRecordingInit = new Audio.Recording()
    await newRecordingInit.prepareToRecordAsync(recordingSettings.current)
    newRecordingInit.setOnRecordingStatusUpdate(updateScreenForRecordingStatus)

    recording.current = newRecordingInit
    await recording.current.startAsync() // Will call updateScreenForRecordingStatus to update the screen.
    setIsLoading(false)
  }

  const getMMSSFromMillis = millis => {
    const totalSeconds = millis / 1000
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)

    const padWithZero = number => {
      const string = number.toString()
      if (number < 10) {
        return '0' + string
      }
      return string
    }
    return padWithZero(minutes) + ':' + padWithZero(seconds)
  }

  const getRecordingTimestamp = duration => {
    if (duration != null) {
      return `${getMMSSFromMillis(duration)}`
    }
    return `${getMMSSFromMillis(0)}`
  }

  const renderButton = (button, buttonStyle) => {
    return (
      <View key={button.id} style={styles.recorderButtonContainer}>
        <TouchableOpacity
          disabled={button.disabled}
          onPress={button.onPress}
          activeOpacity={0.7}
          style={[styles.recorderControlButton, buttonStyle]}>
          <Text style={styles.recoderControlText}>{button.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderMultiButton = () => {
    return multiButton.map(button => renderButton(button))
  }

  if (!visible) {
    return null
  }

  return (
    <View style={styles.recorderContainer}>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {getRecordingTimestamp(recordingDuration)}
        </Text>
      </View>
      <View style={styles.recorderButtonsContainer}>
        {isRecording
          ? renderMultiButton()
          : renderButton(recordButton, styles.butonAlternateColor)}
      </View>
    </View>
  )
})

export default BottomAudioRecorder
