import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'

import { Portal } from '@/lib/Portal'

import theme from '@/styles/theme'

export interface FadeProps {
  start: boolean
  initial?: number
  fadeIn?: boolean
  easingIn?: Animated.TimingAnimationConfig['easing']
  easingOut?: Animated.TimingAnimationConfig['easing']
  duration?: number
  color?: 'black' | 'white'
  position?: 'inherit' | 'portal'
  onHalf?: () => void
  onComplete?: () => void
}

export default function Fade({
  initial = 0,
  color = 'black',
  duration = 1600,
  fadeIn = true,
  easingIn = Easing.out(Easing.quad),
  easingOut = Easing.in(Easing.quad),
  position = 'portal',
  start,
  onHalf,
  onComplete,
}: FadeProps) {
  const opacity = useRef(new Animated.Value(initial)).current

  const startFadeOut = useCallback(() => {
    Animated.timing(opacity, {
      useNativeDriver: false,
      toValue: 0,
      duration: fadeIn ? duration / 2 : duration,
      easing: easingOut,
    }).start(onComplete)
  }, [fadeIn, onComplete])

  useEffect(() => {
    if (start) {
      if (fadeIn) {
        Animated.timing(opacity, {
          useNativeDriver: false,
          toValue: 1,
          duration: duration / 2,
          easing: easingIn,
        }).start(() => {
          onHalf?.()
          startFadeOut()
        })
      } else {
        opacity.setValue(initial)
        startFadeOut()
      }
    }
  }, [start, initial, fadeIn, opacity, duration])

  const inner = (
    <Animated.View
      collapsable={false}
      pointerEvents="box-none"
      style={[StyleSheet.absoluteFill, styles.main, styles[color], { opacity }]}
    />
  )

  return position === 'portal' ? <Portal>{inner}</Portal> : inner
}

const styles = StyleSheet.create({
  main: {
    zIndex: 999,
  },
  black: {
    backgroundColor: theme.colors.black,
  },
  white: {
    backgroundColor: theme.colors.white,
  },
})
