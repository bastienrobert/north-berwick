import React, { useEffect, useMemo, useRef, useState } from 'react'
import Video, { OnLoadData, OnProgressData } from 'react-native-video'
import { Animated, Easing, PanResponder, View } from 'react-native'
import { clamp } from '@/utils/math'

export interface ScrollVideoScreenProps {}

// factor to increase animation speed
const THROTTLE = 20

export default function ScrollVideoScreen() {
  const [isPanning, setIsPanning] = useState(false)
  const [isRepeating, setIsRepeating] = useState(true)

  const videoRef = useRef<Video>()
  const videoPositionRef = useRef({ init: 0, current: 0, panning: 0 }).current
  const videoDurationRef = useRef(0)
  const videoPositionAnim = useRef(new Animated.Value(videoPositionRef.current))
    .current

  const loopVideoRef = useRef<Video>()
  const loopVideoPositionRef = useRef({ init: 0, current: 0, panning: 0 })
    .current
  const loopVideoDurationRef = useRef(0)
  const loopVideoPositionAnim = useRef(
    new Animated.Value(videoPositionRef.current),
  ).current

  useEffect(() => {
    const listener = videoPositionAnim.addListener(({ value }) => {
      videoRef.current?.seek(videoPositionRef.panning + value * 0.001)
      videoPositionRef.current = value
    })

    return () => {
      videoPositionAnim.removeListener(listener)
    }
  }, [videoRef, videoPositionAnim])

  useEffect(() => {
    const listener = loopVideoPositionAnim.addListener(({ value }) => {
      loopVideoRef.current?.seek(loopVideoPositionRef.panning + value * 0.001)
      loopVideoPositionRef.current = value
    })

    return () => {
      loopVideoPositionAnim.removeListener(listener)
    }
  }, [loopVideoRef, loopVideoPositionAnim])

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

  const handleLoopVideoLoad = ({ duration }: OnLoadData) => {
    loopVideoDurationRef.current = duration * 1000
  }

  const onLoopVideoEnd = () => {
    // if (isPanning) setIsRepeating(false)
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          videoPositionRef.init = videoPositionRef.current
          loopVideoPositionRef.init = loopVideoPositionRef.current

          setIsPanning(true)
        },
        onPanResponderMove: (_, gesture) => {
          // if (isRepeating) {
          //   Animated.timing(loopVideoPositionAnim, {
          //     useNativeDriver: false,
          //     toValue: clamp(
          //       (loopVideoPositionRef.init - gesture.dy) * THROTTLE,
          //       loopVideoPositionRef.init,
          //       loopVideoDurationRef.current,
          //     ),
          //     easing: Easing.out(Easing.cubic),
          //     duration: 500,
          //   }).start()
          // }
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
            toValue: 0,
            easing: Easing.out(Easing.cubic),
            duration: 1500,
          }).start()
          setIsPanning(false)
        },
      }),
    [videoRef],
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
        paused={isPanning}
        repeat
        ref={handleLoopVideoRef}
        onLoad={handleLoopVideoLoad}
        onEnd={onLoopVideoEnd}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          // opacity: isRepeating ? 1 : 0,
        }}
        resizeMode="cover"
        source={require('@/assets/tmp/storm_loop.mp4')}
      />
    </View>
  )
}
