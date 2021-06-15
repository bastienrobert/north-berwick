import React, { useEffect, useMemo, useRef, useState } from 'react'
import Video, { OnLoadData, OnProgressData } from 'react-native-video'
import { Animated, Easing, PanResponder, StyleSheet, View } from 'react-native'
import { clamp } from '@/utils/math'

export interface ScrollVideoScreenProps {}

// factor to increase animation speed
const THROTTLE = 20

export default function ScrollVideoScreen() {
  const [isLock, setIsLock] = useState(false)
  const [isRepeating, setIsRepeating] = useState(true)

  const videoRef = useRef<Video>()
  const videoPositionRef = useRef({ init: 0, current: 0, panning: 0 }).current
  const videoDurationRef = useRef(0)
  const videoPositionAnim = useRef(new Animated.Value(videoPositionRef.current))
    .current

  const loopVideoRef = useRef<Video>()

  useEffect(() => {
    const listener = videoPositionAnim.addListener(({ value }) => {
      videoRef.current?.seek(videoPositionRef.panning + value * 0.001)
      videoPositionRef.current = value
    })

    return () => {
      videoPositionAnim.removeListener(listener)
    }
  }, [videoRef, videoPositionAnim])

  const handleVideoRef = (ref: Video | null) => {
    if (ref) {
      videoRef.current = ref
    }
  }

  const handleLoopVideoRef = (ref: Video | null) => {
    if (ref) {
      loopVideoRef.current = ref
    }
  }

  const handleVideoLoad = ({ duration }: OnLoadData) => {
    videoDurationRef.current = duration * 1000
  }

  const onLoopVideoEnd = () => {
    if (isLock) setIsRepeating(false)
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !isLock,
        onMoveShouldSetPanResponder: () => !isLock,
        onPanResponderGrant: () => {
          videoPositionRef.init = videoPositionRef.current
          setIsLock(true)
        },
        onPanResponderMove: (_, gesture) => {
          if (videoRef.current && videoDurationRef.current && !isRepeating) {
            Animated.timing(videoPositionAnim, {
              useNativeDriver: false,
              toValue: Math.floor(
                clamp(
                  (videoPositionRef.init - gesture.dy) * THROTTLE,
                  0,
                  videoDurationRef.current,
                ),
              ),
              easing: Easing.out(Easing.cubic),
              duration: 300,
            }).start()
          }
        },
        onPanResponderRelease: () => {
          Animated.timing(videoPositionAnim, {
            useNativeDriver: false,
            toValue: 0,
            easing: Easing.out(Easing.cubic),
            duration: 1500,
          }).start(() => {
            loopVideoRef.current?.seek(0)
            setIsLock(false)
            setIsRepeating(true)
          })
        },
      }),
    [videoRef, isLock, isRepeating],
  )

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <Video
        paused
        ref={handleVideoRef}
        onLoad={handleVideoLoad}
        bufferConfig={{
          minBufferMs: 50000,
          maxBufferMs: 50000,
        }}
        resizeMode="cover"
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        source={require('@/assets/tmp/storm.mp4')}
      />
      <Video
        repeat
        ref={handleLoopVideoRef}
        onEnd={onLoopVideoEnd}
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: isRepeating ? 1 : 0,
          },
        ]}
        resizeMode="cover"
        source={require('@/assets/tmp/storm_loop.mp4')}
      />
    </View>
  )
}
