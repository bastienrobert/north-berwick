import React, { memo, ReactNode, useEffect } from 'react'
import { View, StyleSheet, Animated, ViewStyle, StyleProp } from 'react-native'

import useFlippable, { FlippableSide } from '@/hooks/useFlippable'

export interface FlipWrapperProps {
  front: ReactNode | (() => ReactNode)
  back: ReactNode | (() => ReactNode)
  side?: FlippableSide
  style?: StyleProp<ViewStyle>
}

function FlipWrapper({ side, front, back, style }: FlipWrapperProps) {
  const { flip, frontFaceStyle, backFaceStyle } = useFlippable()

  useEffect(() => {
    flip(side)
  }, [side])

  return (
    <View style={style}>
      <Animated.View
        style={[frontFaceStyle, { alignItems: 'center' }]}
        pointerEvents={side === 'front' ? 'auto' : 'none'}>
        {typeof front === 'function' ? front() : front}
      </Animated.View>
      <Animated.View
        style={[
          backFaceStyle,
          StyleSheet.absoluteFill,
          { alignItems: 'center' },
        ]}
        pointerEvents={side === 'back' ? 'auto' : 'none'}>
        {typeof back === 'function' ? back() : back}
      </Animated.View>
    </View>
  )
}

export default memo(FlipWrapper)
