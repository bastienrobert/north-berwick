import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
  StyleProp,
  SafeAreaView,
} from 'react-native'

import Card from '@/components/Card'
import BottomCollapsible from '@/components/shared/BottomCollapsible'

import useFlippable from '@/hooks/useFlippable'
import Carousel from '@/components/shared/Carousel'
import ActiveCardIndicator from '@/components/ActiveCardIndicator'

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
  const [index, setIndex] = useState<number>(0)
  const [axis, setAxis] = useState<'x' | 'y' | null>(null)
  const { width } = useWindowDimensions()
  const w = (width / 100) * 85

  console.log(index)

  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
        alignItems: 'center',
      }}>
      <SafeAreaView style={{ position: 'absolute', top: 65, right: 30 }}>
        <ActiveCardIndicator
          color="white"
          cards={[
            {
              complete: true,
              active: index === 0,
            },
            {
              complete: 1,
              active: index === 1,
              half: true,
            },
            {
              complete: false,
              active: index === 2,
            },
          ]}
        />
      </SafeAreaView>
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
            targetIndex={index}
            onSlideIndexChange={setIndex}
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
