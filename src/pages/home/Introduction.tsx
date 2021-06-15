import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { SafeAreaView } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'

import VideoWithDialog from '@/components/VideoWithDialog'
import Fade from '@/components/shared/Fade'

export interface HomeIntroductionProps {}
type HomePropsWithNavigation = HomeIntroductionProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Home:Introduction'>
}

export default function HomeIntroduction({
  navigation,
}: HomePropsWithNavigation) {
  return (
    <>
      <Fade color="black" start fadeIn={false} />
      <VideoWithDialog
        name="???"
        onEnd={() => navigation.navigate('Chapter:Castle', {})}
        source={require('@/assets/tmp/storm.mp4')}
        dialogs={require('@/assets/tmp/videos/out.json')}
      />
    </>
  )
}
