import React, { useRef, useEffect, memo } from 'react'
import { Animated } from 'react-native'

export default IndicatorDot = memo(props => {
  const animation = useRef(new Animated.Value(0))

  const { startTime, radius } = props

  useEffect(() => {
    setTimeout(() => {
      handleAnimation()
    }, startTime)
  }, [])

  const handleAnimation = () => {
    Animated.sequence([
      Animated.timing(animation.current, {
        duration: 500,
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(animation.current, {
        duration: 500,
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start(() => {
      handleAnimation()
    })
  }

  const backgroundColorInterpolation = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(150, 150, 150)', 'rgb(197,197,200)'],
  })

  const getStyles = () => ({
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    backgroundColor: backgroundColorInterpolation,
    marginHorizontal: 2,
  })

  return <Animated.View key={startTime} style={getStyles(props)} />
})
