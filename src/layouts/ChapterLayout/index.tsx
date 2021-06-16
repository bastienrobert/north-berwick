import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

import ChapterCarousel, { ChapterCarouselProps } from './ChapterCarousel'
import ChapterCompleted, { ChapterCompletedParams } from './ChapterCompleted'
import VideoWithDialog, {
  VideoWithDialogProps,
} from '@/components/VideoWithDialog'
import ScanButton from '@/components/ScanButton'
import CardCarousel from '@/components/CardCarousel'
import Fade from '@/components/shared/Fade'

type ChapterCarouselForwardedProps = Pick<
  ChapterCarouselProps,
  'color' | 'data' | 'index' | 'collapsed' | 'onIndexChange' | 'onCollapsed'
>
export interface ChapterLayoutProps
  extends ChapterCompletedParams,
    ChapterCarouselForwardedProps {
  videoProps: Pick<VideoWithDialogProps, 'source' | 'name' | 'dialogs'>
  onScanButtonPress: () => void
}

export default function ChapterLayout({
  color,
  completed,
  videoProps,
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
  const [isDialogsOver, setIsDialogsOver] = useState(false)
  const [completedOpacity, setCompletedOpacity] = useState(0)

  const mainOpacity = useRef(new Animated.Value(0)).current
  const resultsOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setCompletedOpacity(completed !== undefined ? 1 : 0)
    Animated.spring(mainOpacity, {
      useNativeDriver: false,
      toValue: completed === undefined ? 1 : 0,
    }).start()
  }, [completed, mainOpacity, resultsOpacity])

  useEffect(() => {
    Animated.spring(mainOpacity, {
      useNativeDriver: false,
      toValue: isDialogsOver ? 1 : 0,
    }).start()
  }, [isDialogsOver])

  return (
    <View style={styles.container}>
      <Fade
        color="black"
        start={isBackgroundLoaded}
        initial={1}
        fadeIn={false}
      />
      <VideoWithDialog
        repeat
        hideOnEnd
        style={styles.video}
        resizeMode="cover"
        onReadyForDisplay={() => setIsBackgroundLoaded(true)}
        onEnd={() => setIsDialogsOver(true)}
        {...videoProps}
      />
      <ChapterCompleted
        completed={completed}
        opacity={completedOpacity}
        successSummaryProps={successSummaryProps}
        wrongButtonProps={wrongButtonProps}
      />
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: mainOpacity }]}
        pointerEvents={
          completed === undefined && isDialogsOver ? 'auto' : 'none'
        }>
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
