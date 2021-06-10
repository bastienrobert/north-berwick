import React, { useEffect, useMemo, useState } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
  StyleProp,
  PanResponder,
} from 'react-native'

import Card from '@/components/Card'
import BottomCollapsible from '@/components/shared/BottomCollapsible'

import useFlippable from '@/hooks/useFlippable'
import Carousel from '@/components/shared/Carousel'

function FlipCard({ style }: { style: StyleProp<ViewStyle> }) {
  const { flip, frontFaceStyle, backFaceStyle } = useFlippable()

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        flip()
      }}>
      <View style={style}>
        <Animated.View style={[frontFaceStyle, { alignItems: 'center' }]}>
          <Card
            number={1}
            color="purple"
            title={['Hello', 'World']}
            bottom="Falcon of Leith"
          />
        </Animated.View>
        <Animated.View
          style={[
            backFaceStyle,
            StyleSheet.absoluteFill,
            { alignItems: 'center' },
          ]}>
          <Card
            revert
            number={2}
            color="blue"
            text="Tu n'as pas encore assez d'informations pour remplir cette carte"
            bottom="Falcon of Leith"
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default function FlipCardCarousel() {
  const [axis, setAxis] = useState<'x' | 'y' | null>(null)
  const { width } = useWindowDimensions()
  const w = (width / 100) * 85

  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
        alignItems: 'center',
      }}>
      <BottomCollapsible
        disabled={axis === 'x'}
        style={{
          position: 'absolute',
          width: w,
          height: (w / Card.DIMENSIONS.width) * Card.DIMENSIONS.height,
        }}
        onResponderStart={() => setAxis('y')}
        onResponderRelease={() => setAxis(null)}
        startOffset={100}
        endOffset={40}>
        <View>
          <Carousel
            disabled={axis === 'y'}
            onResponderStart={() => setAxis('x')}
            onResponderRelease={() => setAxis(null)}
            axis="x"
            length={3}
            margins={{ left: 15, right: 0, top: 0, bottom: 0 }}>
            <FlipCard style={{ width: w, marginLeft: 15 }} />
            <FlipCard style={{ width: w, marginLeft: 15 }} />
            <FlipCard style={{ width: w, marginLeft: 15 }} />
          </Carousel>
        </View>
      </BottomCollapsible>
    </View>
  )
}
