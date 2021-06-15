import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/core'

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
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Fade color="black" initial={1} start={loaded} fadeIn={false} />
      <VideoWithDialog
        name="???"
        onReadyForDisplay={() => setLoaded(true)}
        onEnd={() => navigation.navigate('Chapter:Castle', {})}
        source={require('@/assets/tmp/storm.mp4')}
        dialogs={require('@/assets/tmp/videos/out.json')}
      />
    </>
  )
}
