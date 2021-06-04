import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { createBasicNavigator } from '@/lib/CustomNavigator'

import useBackHandler from '@/hooks/useBackHandler'

import Development from '@/pages/Development'
import Examples from '@/pages/examples'

import HomeSplash, { HomeSplashProps } from '@/pages/home/Splash'
import HomeIntroduction, {
  HomeIntroductionProps,
} from '@/pages/home/Introduction'
import ChapterCastle, { ChapterCastleProps } from '@/pages/chapters/Castle'
import ChapterChurch, { ChapterChurchProps } from '@/pages/chapters/Church'
import ChapterGeillisHouse, {
  ChapterGeillisHouseProps,
} from '@/pages/chapters/GeillisHouse'
import ChapterPort, { ChapterPortProps } from '@/pages/chapters/Port'
import ConclusionEnd, { ConclusionEndProps } from '@/pages/conclusion/End'
import ConclusionSummary, {
  ConclusionSummaryProps,
} from '@/pages/conclusion/Summary'

export type RootNavigationParamList = {
  Development: {}
  Examples: {}
  // APP
  'Home:Splash': HomeSplashProps
  'Home:Introduction': HomeIntroductionProps
  'Chapter:Castle': ChapterCastleProps
  'Chapter:Church': ChapterChurchProps
  'Chapter:GeillisHouse': ChapterGeillisHouseProps
  'Chapter:Port': ChapterPortProps
  'Conclusion:End': ConclusionEndProps
  'Conclusion:Summary': ConclusionSummaryProps
}

const BasicNav = createBasicNavigator<RootNavigationParamList>()

export default function Router() {
  /**
   * prevent "back" hardware button on Android
   */
  useBackHandler(() => {
    return true
  })

  return (
    <NavigationContainer>
      <BasicNav.Navigator initialRouteName="Development">
        <BasicNav.Screen name="Development" component={Development} />
        <BasicNav.Screen name="Examples" component={Examples} />
        {/* APP */}
        <BasicNav.Screen
          name="Home:Introduction"
          component={HomeIntroduction}
        />
        <BasicNav.Screen name="Home:Splash" component={HomeSplash} />
        <BasicNav.Screen name="Chapter:Castle" component={ChapterCastle} />
        <BasicNav.Screen name="Chapter:Church" component={ChapterChurch} />
        <BasicNav.Screen
          name="Chapter:GeillisHouse"
          component={ChapterGeillisHouse}
        />
        <BasicNav.Screen name="Chapter:Port" component={ChapterPort} />
        <BasicNav.Screen name="Conclusion:End" component={ConclusionEnd} />
        <BasicNav.Screen
          name="Conclusion:Summary"
          component={ConclusionSummary}
        />
      </BasicNav.Navigator>
    </NavigationContainer>
  )
}
