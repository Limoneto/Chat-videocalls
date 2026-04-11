import React, { useState, useEffect, useRef, memo } from 'react'
import
{
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '../../dopebase'
import { Audio, InterruptionModeIOS, InterruptionModeAndroid, } from 'expo-av'
import Slider from '@react-native-community/slider'
import { loadCachedItem } from '../../helpers/cacheManager'
import dynamicStyles from './styles'
import { getDocFromServer } from '@react-native-firebase/firestore'

const assets = {
  play: require('../assets/play.png'),
  pause: require('../assets/pause.png'),
}

export default AudioMediaThreadItem = memo(props =>
{
  const { item, outBound } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance, outBound)

  const [volume, setVolume] = useState(1.0)
  const [rate, setRate] = useState(1.0)
  const [soundPosition, setSoundPosition] = useState(null)
  const [soundDuration, setSoundDuration] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const soundRef = useRef(null)
  const shouldPlay = useRef(false)
  const isSeeking = useRef(false)
  const shouldPlayAtEndOfSeek = useRef(false)

  useEffect(() =>
  {
    return () =>
    {
      stopPlayback()
    }
  }, [])

  const loadCachedAudio = async () =>
  {
    setIsLoading(true)
    const path = await loadCachedItem({ uri: item.url })
    return loadAudio(path)
  }

  const loadAudio = async (path) =>
  {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
    });


    try
    {

      const sound = new Audio.Sound();
      sound.setOnPlaybackStatusUpdate(updateScreenForSoundStatus);

      await sound.loadAsync(
          {
            uri: path,
          },
          {
            isLooping: false,
            isMuted: false,
            volume: volume,
            rate: rate,
            shouldPlay: true,
            shouldCorrectPitch: true,
          }
      );
      soundRef.current = sound;
      console.log("Audio loaded successfully");
      setIsLoading(false);
    } catch (error)
    {
      console.error("Error loading audio:", error);
      setIsLoading(false);
    }
  };

  const stopPlayback = async () =>
  {
    if (soundRef.current !== null && !isLoading)
    {
      await soundRef.current.stopAsync()
      await soundRef.current.unloadAsync()
      soundRef.current.setOnPlaybackStatusUpdate(null)
      soundRef.current = null
      setSoundPosition(null)
    }
  }

  const updateScreenForSoundStatus = status =>
  {
    if (status.isLoaded)
    {
      setIsPlaying(status.isPlaying)
      setSoundDuration(status.durationMillis)
      setSoundPosition(status.positionMillis)
      setVolume(status.volume)
      setRate(status.rate)
      setIsPlaybackAllowed(true)
      shouldPlay.current = status.shouldPlay
    } else
    {
      setSoundDuration(null)
      setSoundPosition(null)
      setIsPlaybackAllowed(false)

      if (status.error)
      {
        console.log(`FATAL PLAYER ERROR: ${status.error}`)
      }
    }
  }

  const getMMSSFromMillis = millis =>
  {
    if (!millis || millis === Infinity)
    {
      return ''
    }

    const totalSeconds = millis / 1000
    const seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)

    const padWithZero = number =>
    {
      const string = number.toString()
      if (number < 10)
      {
        return '0' + string
      }
      return string
    }
    return padWithZero(minutes) + ':' + padWithZero(seconds)
  }

  const getPlaybackTimestamp = (position, duration) =>
  {
    if (soundRef.current != null && position != null && duration != null)
    {
      if (!shouldPlay.current)
      {
        return `${getMMSSFromMillis(duration)}`
      }
      return `${getMMSSFromMillis(position)}`
    }
    return ''
  }

  const onPlayPausePressed = async () =>
  {
    console.log("Play/Pause pressed", { isPlaying, soundRef: !!soundRef.current, soundDuration, soundPosition });
    if (soundRef.current != null)
    {
      if (soundDuration === soundPosition)
      {

        await soundRef.current.replayAsync();
      } else if (isPlaying)
      {
        console.log("Pausing");
        await soundRef.current.setStatusAsync({ shouldPlay: false })
      } else
      {
        try
        {
          await soundRef.current.setStatusAsync({ shouldPlay: true })

        } catch (e)
        {
          console.error("Error playing audio:", e);
        }
      }
    } else
    {
      console.log("Loading audio");
      await loadCachedAudio();
      console.log("Playing loaded audio");

      try
      {
        await soundRef.current.setStatusAsync({ shouldPlay: true })

      } catch (e)
      {
        console.error("Error lodedd playing audio:", e);
      }
    }
  }

  const onSeekSliderValueChange = value =>
  {
    if (soundRef.current != null && !isSeeking.current)
    {
      isSeeking.current = true
      shouldPlayAtEndOfSeek.current = shouldPlay.current

      soundRef.current.setStatusAsync({ shouldPlay: false })
    }
  }


  const onSeekSliderSlidingComplete = async (value) => {
    if (soundRef.current != null) {
      isSeeking.current = false;
      const seekPosition = value * soundDuration;
      if (shouldPlayAtEndOfSeek.current) {
        await soundRef.current.setStatusAsync({
          shouldPlay: true,
          positionMillis: seekPosition,
        });
      } else {
        await soundRef.current.setStatusAsync({
          positionMillis: seekPosition,
        });
      }
    }
  };

  const getSeekSliderPosition = (position, duration) =>
  {
    if (soundRef.current != null && position != null && duration != null)
    {
      return position / duration
    }
    return 0
  }

  return (

      <View style={styles.audioMediaThreadItemContainer}>
        <TouchableOpacity
            disabled={isLoading}
            onPress={onPlayPausePressed}
            style={styles.audioPlayPauseIconContainer}>
          <View style={styles.playPauseIconContainer}>
            <Image
                style={[
                  styles.audioPlayIcon,
                  isPlaying ? { marginLeft: 0 } : { marginLeft: 2 },
                ]}
                source={isPlaying ? assets.pause : assets.play}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.audioMeterContainer}>
          <Slider
              style={styles.audioMeter}
              thumbStyle={styles.audioMeterThumb}
              value={getSeekSliderPosition(soundPosition, soundDuration)}
              step={getSeekSliderPosition(soundPosition, soundDuration)}
              onValueChange={onSeekSliderValueChange}
              onSlidingComplete={value =>
                  onSeekSliderSlidingComplete(value, soundDuration)
              }
              minimumTrackTintColor={styles.minimumAudioTrackTintColor.color}
              //   maximumTrackTintColor={styles.maximumAudioTrackTintColor.color}
              thumbTintColor={styles.audioThumbTintColor.color}
              disabled={isLoading}
          />
        </View>
        <View style={styles.audioTimerContainer}>
          {isLoading ? (
              <ActivityIndicator color={styles.minimumAudioTrackTintColor.color} />
          ) : (
              <Text style={styles.audioTimerCount}>
                {soundRef.current !== null
                    ? getPlaybackTimestamp(soundPosition, soundDuration)
                    : getMMSSFromMillis(item.duration)}
              </Text>
          )}
        </View>
      </View>
  )
})
