import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { useTranslate } from 'react-polyglot'
import Video from 'react-native-video'
import { NavigationProp } from '@react-navigation/core'

import { RootNavigationParamList } from '@/App/Router'

import BackgroundWithDialog from '@/components/BackgroundWithDialog'
import Fade from '@/components/shared/Fade'

import subtitles from '@/assets/videos/subtitles.json'

export interface ConclusionEndProps {}
type ConclusionEndPropsWithNavigation = ConclusionEndProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Conclusion:End'>
}

export default function ConclusionEnd({
  navigation,
}: ConclusionEndPropsWithNavigation) {
  const t = useTranslate()

  const dialogInOpacity = useRef(new Animated.Value(0)).current
  const revealOpacity = useRef(new Animated.Value(0)).current
  const dialogOutOpacity = useRef(new Animated.Value(0)).current

  const [loaded, setLoaded] = useState(false)
  const [introductionEnd, setIntroductionEnd] = useState(false)
  const [dialogInEnd, setDialogInEnd] = useState(false)
  const [revealEnd, setRevealEnd] = useState(false)

  useEffect(() => {
    if (introductionEnd) {
      Animated.spring(dialogInOpacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start()
    }
  }, [dialogInOpacity, introductionEnd])

  useEffect(() => {
    if (dialogInEnd) {
      Animated.spring(revealOpacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start()
    }
  }, [revealOpacity, dialogInEnd])

  useEffect(() => {
    if (revealEnd) {
      Animated.spring(dialogOutOpacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start()
    }
  }, [dialogOutOpacity, revealEnd])

  return (
    <View style={styles.container}>
      <Fade color="black" initial={1} start={loaded} fadeIn={false} />
      <Video
        muted
        source={require('@/assets/videos/castle_video.mp4')}
        onReadyForDisplay={() => setLoaded(true)}
        onEnd={() => setIntroductionEnd(true)}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, styles.video]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.video,
          { opacity: dialogInOpacity },
        ]}
        pointerEvents={introductionEnd ? 'auto' : 'none'}>
        <BackgroundWithDialog
          hideOnEnd
          paused={!introductionEnd}
          name={t('agnes')}
          type="video"
          onEndAfterLoop={() => setDialogInEnd(true)}
          source={require('@/assets/videos/ghost_loop.mp4')}
          dialogs={subtitles.conclusion_in}
        />
      </Animated.View>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.video,
          { opacity: revealOpacity },
        ]}
        pointerEvents="none">
        <Video
          muted
          paused={!dialogInEnd}
          source={require('@/assets/videos/conclusion_reveal.mp4')}
          onEnd={() => setRevealEnd(true)}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, styles.video]}
        />
      </Animated.View>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.video,
          { opacity: dialogOutOpacity },
        ]}
        pointerEvents={revealEnd ? 'auto' : 'none'}>
        <BackgroundWithDialog
          paused={!revealEnd}
          name={t('agnes')}
          type="video"
          onEnd={() => navigation.navigate('Conclusion:Recap', {})}
          source={require('@/assets/videos/conclusion_loop.mp4')}
          dialogs={subtitles.conclusion_out}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
  },
})
