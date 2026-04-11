import React, { useState, useEffect, memo } from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import { Video } from 'expo-av'
import { Image as FastImage } from 'expo-image'
import { useTheme } from '../../dopebase'
import AudioMediaThreadItem from './AudioMediaThreadItem'
import FileThreadItem from './FileThreadItem'

const circleSnailProps = { thickness: 1, color: '#D0D0D0', size: 50 }

export default ThreadMediaItem = memo(props => {
  const { dynamicStyles, videoRef, item, outBound } = props
  const { theme } = useTheme()

  const isValidUrl = item.media?.url && item.media?.url?.startsWith('http')
  const uri = isValidUrl ? item.media?.url || item.url : ''

  const [videoPaused, setVideoPaused] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)

  const isImage =
    item.media && item.media.type && item.media.type.startsWith('image')
  const isAudio =
    item.media && item.media.type && item.media.type.startsWith('audio')
  const isVideo =
    item.media && item.media.type && item.media.type.startsWith('video')
  const isFile =
    item.media && item.media.type && item.media.type.startsWith('file')
  const noTypeStated = item.media && !item.media.type

  useEffect(() => {
    if (!videoLoading) {
      setVideoPaused(true)
    }
  }, [videoLoading])

  const onVideoLoadStart = () => {
    setVideoLoading(true)
  }

  const onVideoLoad = payload => {
    setVideoLoading(false)
  }

  if (isImage) {
    return (
      <FastImage source={{ uri: uri }} style={dynamicStyles.mediaMessage} />
    )
  }

  if (isAudio) {
    return <AudioMediaThreadItem outBound={outBound} item={item.media} />
  }

  if (isVideo) {
    return (
      <View>
        {videoLoading && (
          <View style={[dynamicStyles.mediaMessage, dynamicStyles.centerItem]}>
            <ActivityIndicator {...circleSnailProps} />
          </View>
        )}
        <Video
          ref={videoRef}
          source={{
            uri,
            // uri: convertToProxyURL(uri),
          }}
          shouldPlay={false}
          onLoad={onVideoLoad}
          onLoadStart={onVideoLoadStart}
          resizeMode={'cover'}
          style={[
            dynamicStyles.mediaMessage,
            { display: videoLoading ? 'none' : 'flex' },
          ]}
        />
        {!videoLoading && (
          <Image
            source={theme.icons.playButton}
            style={dynamicStyles.playButton}
            resizeMode={'contain'}
          />
        )}
      </View>
    )
  }

  if (isFile) {
    return <FileThreadItem item={item.media} outBound={outBound} />
  }
  // To handle old format of an array of url stings. Before video feature
  return <FastImage source={{ uri: uri }} style={dynamicStyles.mediaMessage} />

})
