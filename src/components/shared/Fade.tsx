import React, { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'

import { Portal } from '@/lib/Portal'

export interface FadeProps {
  start: boolean
  easingIn?: Animated.TimingAnimationConfig['easing']
  easingOut?: Animated.TimingAnimationConfig['easing']
  duration?: number
  color?: 'black' | 'white'
  onHalf?: () => void
  onComplete?: () => void
}

export default function Fade({
  color = 'black',
  duration = 1600,
  easingIn = Easing.out(Easing.quad),
  easingOut = Easing.in(Easing.quad),
  start,
  onHalf,
  onComplete,
}: FadeProps) {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (start) {
      Animated.timing(opacity, {
        useNativeDriver: false,
        toValue: 1,
        duration: duration / 2,
        easing: easingIn,
      }).start(() => {
        onHalf?.()
        Animated.timing(opacity, {
          useNativeDriver: false,
          toValue: 0,
          duration: duration / 2,
          easing: easingOut,
        }).start(onComplete)
      })
    }
  }, [start, opacity, duration])

  return (
    <Portal>
      <Animated.View
        collapsable={false}
        pointerEvents="box-none"
        style={[
          StyleSheet.absoluteFill,
          styles.main,
          styles[color],
          { opacity },
        ]}
      />
    </Portal>
  )
}

const styles = StyleSheet.create({
  main: {
    zIndex: 999,
  },
  black: {
    backgroundColor: 'black',
  },
  white: {
    backgroundColor: 'white',
  },
})
