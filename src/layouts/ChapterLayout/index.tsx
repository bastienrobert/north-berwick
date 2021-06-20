import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'
import Video, { VideoProperties } from 'react-native-video'

import ChapterCarousel, { ChapterCarouselProps } from './ChapterCarousel'
import ChapterCompleted, { ChapterCompletedParams } from './ChapterCompleted'
import BackgroundWithDialog, {
  BackgroundWithDialogProps,
} from '@/components/BackgroundWithDialog'
import ScanButton from '@/components/ScanButton'
import Image360, { Image360Props } from '@/components/shared/Image360'
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
  video: VideoProperties['source']
  dialogProps: Pick<
    BackgroundWithDialogProps,
    'source' | 'name' | 'dialogs' | 'sound'
  > &
    Partial<Pick<BackgroundWithDialogProps, 'type'>>
  onScanButtonPress: () => void
  reveal?: boolean
  hdr?: Image360Props['source']
  introduction?: boolean
  onIntroductionEnd?: () => void
}

export default function ChapterLayout({
  color,
  completed,
  video,
  dialogProps,
  data,
  index,
  hdr,
  collapsed,
  onIndexChange,
  onCollapse,
  onCollapseStart,
  onScanButtonPress,
  reveal = true,
  introduction = true,
  onIntroductionEnd,
  successSummaryProps,
  wrongProps,
}: ChapterLayoutProps) {
  const isIntroductionEnd = useRef(false)
  const [isVideoVisible, setIsVideoVisible] = useState(introduction)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isIntroductionOver, setIsIntroductionOver] = useState(false)
  const [isDialogsOver, setIsDialogsOver] = useState(false)
  const [completedOpacity, setCompletedOpacity] = useState(0)

  const mainOpacity = useRef(new Animated.Value(0)).current
  // prettier-ignore
  const backgroundOpacity = useRef(new Animated.Value(introduction ? 0 : 1)).current

  useEffect(() => {
    if (isDialogsOver && reveal) {
      setCompletedOpacity(completed !== undefined ? 1 : 0)
      Animated.spring(mainOpacity, {
        useNativeDriver: false,
        toValue: completed === undefined ? 1 : 0,
      }).start()
    }
  }, [isDialogsOver, reveal, completed, mainOpacity])

  useEffect(() => {
    if (isIntroductionOver || (isDialogsOver && !hdr)) {
      Animated.spring(backgroundOpacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start(() => setIsVideoVisible(false))
    }
  }, [isIntroductionOver])

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
    if (isDialogsOver && hdr) {
      Animated.spring(backgroundOpacity, {
        useNativeDriver: false,
        toValue: 0,
      }).start()
    }
  }, [isDialogsOver, hdr, backgroundOpacity])

  useEffect(() => {
    if (!introduction) {
      setIsDialogsOver(true)
    }
  }, [introduction])

  return (
    <View style={styles.container}>
      <Fade
        position="inherit"
        color="black"
        start={!introduction || isVideoLoaded}
        initial={1}
        fadeIn={false}
      />
      {isVideoVisible && (
        <Video
          muted
          source={video}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, styles.video]}
          onReadyForDisplay={() => setIsVideoLoaded(true)}
          onEnd={() => setIsIntroductionOver(true)}
        />
      )}
      <Animated.View style={[styles.wrapper, { opacity: backgroundOpacity }]}>
        <BackgroundWithDialog
          {...dialogProps}
          hideOnEnd
          type={(dialogProps.type || 'image') as any}
          resizeMode="cover"
          style={styles.background}
          onEnd={() => setIsDialogsOver(true)}
          play={!isVideoVisible && introduction}
        />
      </Animated.View>
      {hdr && (
        <Image360 source={hdr} style={[StyleSheet.absoluteFill, styles.hdr]} />
      )}
      <ChapterCompleted
        completed={completed}
        opacity={completedOpacity}
        successSummaryProps={successSummaryProps}
        wrongProps={wrongProps}
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
    bottom: ChapterCarousel.COLLAPSIBLE_START_OFFSET + 11,
  },
  background: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  hdr: {
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
})
