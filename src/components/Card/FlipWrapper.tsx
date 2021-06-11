import React, { memo, ReactNode } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
} from 'react-native'

import useFlippable from '@/hooks/useFlippable'

export interface FlipWrapperProps {
  front: ReactNode | (() => ReactNode)
  back: ReactNode | (() => ReactNode)
  style?: StyleProp<ViewStyle>
}

function FlipWrapper({ front, back, style }: FlipWrapperProps) {
  const { flip, frontFaceStyle, backFaceStyle } = useFlippable()

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        flip()
      }}>
      <View style={style}>
        <Animated.View style={[frontFaceStyle, { alignItems: 'center' }]}>
          {typeof front === 'function' ? front() : front}
        </Animated.View>
        <Animated.View
          style={[
            backFaceStyle,
            StyleSheet.absoluteFill,
            { alignItems: 'center' },
          ]}>
          {typeof back === 'function' ? back() : back}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default memo(FlipWrapper)
