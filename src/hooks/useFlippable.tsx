import { useEffect, useRef, useCallback } from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'

interface UseFlippableReturns {
  flip: (side?: 'front' | 'back') => void
  frontFaceStyle: Animated.AnimatedProps<StyleProp<ViewStyle>>
  backFaceStyle: Animated.AnimatedProps<StyleProp<ViewStyle>>
}

export default function useFlippable({
  flipBackSpring = {
    useNativeDriver: false,
    toValue: 0,
    friction: 8,
    tension: 10,
  },
  flipFrontSpring = {
    useNativeDriver: false,
    toValue: 180,
    friction: 8,
    tension: 10,
  },
} = {}): UseFlippableReturns {
  const animatedRotation = useRef(new Animated.Value(0)).current
  const rotation = useRef(0)

  const flip = useCallback(
    (side = rotation.current >= 90 ? 'back' : 'front') => {
      if (side === 'back') {
        Animated.spring(animatedRotation, flipBackSpring).start()
      } else {
        Animated.spring(animatedRotation, flipFrontSpring).start()
      }
    },
    [flipBackSpring, flipFrontSpring, animatedRotation],
  )

  useEffect(() => {
    animatedRotation.addListener(({ value }) => {
      rotation.current = value
    })
  }, [animatedRotation])

  const frontInterpolate = animatedRotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })

  const backInterpolate = animatedRotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  })

  const frontOpacity = animatedRotation.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  })

  const backOpacity = animatedRotation.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  })

  return {
    flip,
    frontFaceStyle: {
      backfaceVisibility: 'hidden',
      opacity: frontOpacity,
      transform: [{ rotateY: frontInterpolate }],
    },
    backFaceStyle: {
      backfaceVisibility: 'hidden',
      opacity: backOpacity,
      transform: [{ rotateY: backInterpolate }],
    },
  }
}
