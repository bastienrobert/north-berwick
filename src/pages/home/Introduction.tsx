import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import Video from 'react-native-video'
import { NavigationProp } from '@react-navigation/core'

import { RootNavigationParamList } from '@/App/Router'

import BackgroundWithDialog from '@/components/BackgroundWithDialog'
import Fade from '@/components/shared/Fade'

import subtitles from '@/assets/videos/subtitles.json'

export interface HomeIntroductionProps {}
type HomePropsWithNavigation = HomeIntroductionProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Home:Introduction'>
}

export default function HomeIntroduction({
  navigation,
}: HomePropsWithNavigation) {
  const touchOpacity = useRef(new Animated.Value(0)).current
  const dialogOpacity = useRef(new Animated.Value(0)).current

  const [loaded, setLoaded] = useState(false)
  const [introductionEnd, setIntroductionEnd] = useState(false)
  const [touchEnd, setTouchEnd] = useState(false)

  useEffect(() => {
    if (introductionEnd) {
      Animated.spring(touchOpacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start()
    }
  }, [touchOpacity, introductionEnd])

  useEffect(() => {
    if (touchEnd) {
      Animated.spring(dialogOpacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start()
    }
  }, [dialogOpacity, touchEnd])

  return (
    <View style={styles.container}>
      <Fade color="black" initial={1} start={loaded} fadeIn={false} />
      <Video
        source={require('@/assets/videos/castle_video.mp4')}
        onReadyForDisplay={() => setLoaded(true)}
        onEnd={() => setIntroductionEnd(true)}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, styles.video]}
      />
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: touchOpacity }]}>
        <TouchableWithoutFeedback onPress={() => setTouchEnd(true)}>
          <Video
            repeat
            source={require('@/assets/videos/introduction_cards.mp4')}
            resizeMode="cover"
            style={[StyleSheet.absoluteFill, styles.video]}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.video,
          { opacity: dialogOpacity },
        ]}
        pointerEvents={touchEnd ? 'auto' : 'none'}>
        <BackgroundWithDialog
          name="???"
          type="video"
          onEnd={() => navigation.navigate('Chapter:Castle', {})}
          source={require('@/assets/videos/ghost_loop.mp4')}
          dialogs={subtitles.introduction}
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
