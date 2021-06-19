import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/core'

import { RootNavigationParamList } from '@/App/Router'

import Fade from '@/components/shared/Fade'
// import VideoWithDialog from '@/components/BackgroundWithDialog'

export interface ConclusionEndProps {}
type ConclusionEndPropsWithNavigation = ConclusionEndProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Conclusion:End'>
}

export default function ConclusionEnd({
  navigation,
}: ConclusionEndPropsWithNavigation) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Fade color="black" initial={1} start={loaded} fadeIn={false} />
      {/* <VideoWithDialog
        name="Agnès"
        onReadyForDisplay={() => setLoaded(true)}
        onEnd={() => navigation.navigate('Conclusion:Recap', {})}
        source={require('@/assets/tmp/storm.mp4')}
        dialogs={require('@/assets/tmp/videos/out.json')}
      /> */}
    </>
  )
}
