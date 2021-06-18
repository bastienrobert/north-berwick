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
  | 'color'
  | 'data'
  | 'index'
  | 'collapsed'
  | 'onIndexChange'
  | 'onCollapse'
  | 'onCollapseStart'
>
export interface ChapterLayoutProps
  extends ChapterCompletedParams,
    ChapterCarouselForwardedProps {
  reveal?: boolean
  videoProps: Pick<VideoWithDialogProps, 'source' | 'name' | 'dialogs' | 'hdr'>
  onScanButtonPress: () => void
  introduction?: boolean
  onIntroductionEnd?: () => void
}

export default function ChapterLayout({
  color,
  completed,
  videoProps,
  data,
  index,
  collapsed,
  onIndexChange,
  onCollapse,
  onCollapseStart,
  onScanButtonPress,
  reveal = true,
  introduction = true,
  onIntroductionEnd,
  successSummaryProps,
  wrongButtonProps,
}: ChapterLayoutProps) {
  const isIntroductionEnd = useRef(false)
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false)
  const [isDialogsOver, setIsDialogsOver] = useState(false)
  const [completedOpacity, setCompletedOpacity] = useState(0)

  const mainOpacity = useRef(new Animated.Value(0)).current
  const resultsOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isDialogsOver && completed) {
      setCompletedOpacity(1)
      Animated.spring(mainOpacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start()
    }
  }, [isDialogsOver, completed, mainOpacity, resultsOpacity])

  useEffect(() => {
    if (isDialogsOver) {
      isIntroductionEnd.current = true
      onIntroductionEnd?.()
    }

    if (reveal) {
      Animated.spring(mainOpacity, {
        useNativeDriver: false,
        toValue: isDialogsOver ? 1 : 0,
      }).start()
    }
  }, [reveal, isDialogsOver])

  useEffect(() => {
    if (!introduction) {
      setIsDialogsOver(true)
    }
  }, [introduction])

  /**
   * @todo
   * fix fade
   */
  return (
    <View style={styles.container}>
      <Fade
        color="black"
        start={isBackgroundLoaded}
        initial={videoProps.hdr ? 0 : 1}
        fadeIn={false}
      />
      <VideoWithDialog
        repeat
        hideOnEnd
        style={styles.video}
        resizeMode="cover"
        onReadyForDisplay={() => setIsBackgroundLoaded(true)}
        onEnd={() => setIsDialogsOver(true)}
        hdr={videoProps.hdr}
        name={videoProps.name}
        source={videoProps.source}
        dialogs={introduction ? videoProps.dialogs : []}
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
          onCollapse={onCollapse}
          onCollapseStart={onCollapseStart}
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
