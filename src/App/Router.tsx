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

export type RootNavigationParamList = {
  Development: {}
  Examples: {}
  // APP
  'Home:Splash': HomeSplashProps
  'Home:Introduction': HomeIntroductionProps
  'Chapter:Castle': ChapterCastleProps
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
      </BasicNav.Navigator>
    </NavigationContainer>
  )
}
