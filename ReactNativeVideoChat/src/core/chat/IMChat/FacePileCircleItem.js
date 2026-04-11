import React, { memo } from 'react'
import { Animated } from 'react-native'
import { Image } from 'expo-image'

export default FacePileCircleItem = memo(props => {
  const { imageStyle, circleSize, face, offset, dynamicStyle } = props
  const innerCircleSize = circleSize * 2
  const marginRight = circleSize * offset

  return (
    <Animated.View key={face} style={{ marginRight: -marginRight }}>
      <Image
        key={face}
        style={[
          dynamicStyle.facePileCircleImage,
          {
            width: innerCircleSize,
            height: innerCircleSize,
            borderRadius: circleSize,
          },
          imageStyle,
        ]}
        source={{ uri: face }}
      />
    </Animated.View>
  )
})
