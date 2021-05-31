import React, { useEffect, useRef, useState } from 'react'
import { Animated, PanResponder, View } from 'react-native'

import PlaceHolder from '@/assets/tmp/fragment_placeholder.svg'
import Fragment from '@/assets/tmp/fragment.svg'

const DEFAULT_POSITION = { x: 40, y: 200 }
const PLACEHOLDER_POSITION = { x: 200, y: 400 }

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1)
}

export default function DragZone() {
  const pan = useRef(new Animated.ValueXY()).current
  const [shouldListen, setShouldListen] = useState(true)

  useEffect(() => {
    pan.setValue(DEFAULT_POSITION)
    pan.extractOffset()
  }, [])

  useEffect(() => {
    if (!shouldListen) {
      pan.flattenOffset()
      Animated.spring(pan, {
        useNativeDriver: false,
        toValue: PLACEHOLDER_POSITION,
      }).start()
    }
  }, [shouldListen])

  pan.addListener(({ x, y }) => {
    const d = distance(x, y, PLACEHOLDER_POSITION.x, PLACEHOLDER_POSITION.y)
    if (d < 100) {
      setShouldListen(false)
    }
  })

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    ),
    onPanResponderRelease: () => {
      pan.extractOffset()
    },
  })

  return (
    <View>
      <PlaceHolder
        style={{
          width: 140,
          height: 140,
          position: 'absolute',
          top: PLACEHOLDER_POSITION.y,
          left: PLACEHOLDER_POSITION.x,
        }}
      />
      <Animated.View
        style={[
          {
            width: 140,
            height: 140,
            position: 'absolute',
            top: 0,
            left: 0,
          },
          pan.getLayout(),
        ]}
        {...(shouldListen ? panResponder.panHandlers : {})}>
        <Fragment style={{ width: '100%', height: '100%' }} />
      </Animated.View>
    </View>
  )
}
