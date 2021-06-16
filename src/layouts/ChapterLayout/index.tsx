import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import ChapterCarousel, { ChapterCarouselProps } from './ChapterCarousel'
import ChapterCompleted, { ChapterCompletedParams } from './ChapterCompleted'
import ScanButton from '@/components/ScanButton'
import CardCarousel from '@/components/CardCarousel'
import Fade from '@/components/shared/Fade'

import Video, { VideoProperties } from 'react-native-video'

type ChapterCarouselForwardedProps = Pick<
  ChapterCarouselProps,
  'color' | 'data' | 'index' | 'collapsed' | 'onIndexChange' | 'onCollapsed'
>
export interface ChapterLayoutProps
  extends ChapterCompletedParams,
    ChapterCarouselForwardedProps {
  background: VideoProperties['source']
  onScanButtonPress: () => void
}

export default function ChapterLayout({
  background,
  completed,
  color,
  data,
  index,
  collapsed,
  onIndexChange,
  onCollapsed,
  onScanButtonPress,
  successSummaryProps,
  wrongButtonProps,
}: ChapterLayoutProps) {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false)
  const [completedOpacity, setCompletedOpacity] = useState(0)

  const mainOpacity = useRef(new Animated.Value(1)).current
  const resultsOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setCompletedOpacity(completed !== undefined ? 1 : 0)
    Animated.spring(mainOpacity, {
      useNativeDriver: false,
      toValue: completed === undefined ? 1 : 0,
    }).start()
  }, [completed, mainOpacity, resultsOpacity])

  return (
    <View style={styles.container}>
      <Fade
        color="black"
        start={isBackgroundLoaded}
        initial={1}
        fadeIn={false}
      />
      <Video
        repeat
        style={styles.video}
        source={background}
        resizeMode="cover"
        onReadyForDisplay={() => setIsBackgroundLoaded(true)}
      />
      <ChapterCompleted
        completed={completed}
        opacity={completedOpacity}
        successSummaryProps={successSummaryProps}
        wrongButtonProps={wrongButtonProps}
      />
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: mainOpacity }]}
        pointerEvents={completed === undefined ? 'auto' : 'none'}>
        <ChapterCarousel
          color={color}
          index={index}
          onIndexChange={onIndexChange}
          collapsed={collapsed}
          onCollapsed={onCollapsed}
          data={data}>
          <ScanButton style={styles.scan} onPress={onScanButtonPress} />
        </ChapterCarousel>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scan: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: CardCarousel.COLLAPSIBLE_START_OFFSET + 11,
  },
  video: {
    flex: 1,
  },
})
