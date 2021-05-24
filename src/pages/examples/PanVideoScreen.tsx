import React, { useCallback, useMemo, useRef, useState } from 'react'
import Video from 'react-native-video'
import { DeviceMotion } from 'expo-sensors'
import { Animated, Easing, PanResponder, View } from 'react-native'

import {
  cover,
  clamp,
  normalize,
  TargetDimensions,
  ComputedBounds,
} from '@/utils/math'

export interface PanVideoScreenProps {}

DeviceMotion.setUpdateInterval(20)
const ANGLE = 70
const ANGLE_IN_RAD = (ANGLE * Math.PI) / 180

export default function PanVideoScreen() {
  const [bounds, setBounds] = useState<ComputedBounds>()
  const translateXRef = useRef({ current: 0, init: 0 }).current
  const translateXAnim = useRef(new Animated.Value(translateXRef.init)).current
  const containerDimensionsRef = useRef<TargetDimensions>()
  const videoDimensionsRef = useRef<TargetDimensions>()

  const [min, max] = useMemo(() => {
    return [
      -(bounds?.width || 0) + (containerDimensionsRef.current?.width || 0),
      0,
    ]
  }, [bounds, containerDimensionsRef])

  const computeBounds = () => {
    if (containerDimensionsRef.current && videoDimensionsRef.current) {
      const bounds = cover(
        videoDimensionsRef.current,
        containerDimensionsRef.current,
      )
      setBounds(bounds)
      translateXRef.current = bounds.left
      translateXAnim.setValue(translateXRef.current)
    }
  }

  const extractInitValue = useCallback(() => {
    translateXRef.init = translateXRef.current
  }, [])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: extractInitValue,
        onPanResponderMove: (_, gesture) => {
          translateXRef.current = clamp(
            translateXRef.init + gesture.dx,
            min,
            max,
          )
          Animated.timing(translateXAnim, {
            useNativeDriver: false,
            toValue: translateXRef.current,
            duration: 120,
            easing: Easing.out(Easing.cubic),
          }).start()
        },
      }),
    [min, max],
  )

  // useEffect(() => {
  //   const listener = DeviceMotion.addListener(({ rotation }) => {
  //     /**
  //      * @todo
  //      * should set the central point if drag so current angle becomes the origin
  //      */
  //     const dx =
  //       min -
  //       clamp(
  //         normalize(rotation.gamma, -ANGLE_IN_RAD / 2, ANGLE_IN_RAD / 2),
  //         0,
  //         1,
  //       ) *
  //         min

  //     translateXRef.current = Math.round(dx)
  //     Animated.timing(translateXAnim, {
  //       useNativeDriver: false,
  //       toValue: translateXRef.current,
  //       duration: 200,
  //       easing: Easing.out(Easing.cubic),
  //     }).start()
  //   })

  //   return () => listener.remove()
  // }, [min, max])

  return (
    <View
      style={{ flex: 1 }}
      onLayout={({ nativeEvent }) => {
        containerDimensionsRef.current = {
          width: nativeEvent.layout.width,
          height: nativeEvent.layout.height,
        }
        computeBounds()
      }}
      {...panResponder.panHandlers}>
      <Animated.View
        style={{
          flex: 1,
          width: bounds?.width || 0,
          height: bounds?.height || 0,
          transform: [
            { translateX: translateXAnim },
            { scale: bounds?.scale || 0 },
          ],
          backgroundColor: '#F00',
        }}>
        <Video
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
          // resizeMode={Video.RESIZE_MODE_COVER}
          onLoad={({ naturalSize }) => {
            videoDimensionsRef.current = {
              width: naturalSize.width,
              height: naturalSize.height,
            }
            computeBounds()
          }}
          source={require('@/assets/storm.mp4')}
        />
      </Animated.View>
    </View>
  )
}
