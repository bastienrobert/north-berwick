import React, { useEffect, useMemo, useRef, useState } from 'react'
import Video, { OnLoadData } from 'react-native-video'
import { Animated, Easing, PanResponder, View } from 'react-native'
import { clamp } from '@/utils/math'

export interface ScrollVideoScreenProps {}

const LOOP_START = 0
const LOOP_END = 2
// factor to increase animation speed
const THROTTLE = 20

export default function ScrollVideoScreen() {
  const videoRef = useRef<Video>()
  const [isPanning, setIsPanning] = useState(false)
  const videoPositionRef = useRef({ init: 0, current: 0, panning: 0 }).current
  const videoDurationRef = useRef(0)
  const videoPositionAnim = useRef(new Animated.Value(videoPositionRef.current))
    .current

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

  const handleProgress = ({ currentTime }: any) => {
    if (!isPanning) {
      videoPositionRef.panning = currentTime

      if (currentTime >= LOOP_END) {
        videoRef.current?.seek(LOOP_START)
      }
    }
  }

  const handleLoad = ({ duration }: OnLoadData) => {
    videoDurationRef.current = duration * 1000
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          videoPositionRef.init = videoPositionRef.current
          setIsPanning(true)
        },
        onPanResponderMove: (_, gesture) => {
          if (videoRef.current && videoDurationRef.current) {
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
              duration: 500,
            }).start()
          }
        },
        onPanResponderRelease: () => {
          Animated.timing(videoPositionAnim, {
            useNativeDriver: false,
            toValue: LOOP_START,
            easing: Easing.out(Easing.cubic),
            duration: 1500,
          }).start(() => setIsPanning(false))
        },
      }),
    [videoRef],
  )

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <Video
        paused={isPanning}
        ref={handleVideoRef}
        onLoad={handleLoad}
        onProgress={handleProgress}
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
        source={require('@/assets/storm.mp4')}
      />
    </View>
  )
}
