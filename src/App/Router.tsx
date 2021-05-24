import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { createBasicNavigator } from '@/lib/CustomNavigator'

import useBackHandler from '@/hooks/useBackHandler'

import Development from '@/pages/Development'
import Examples from '@/pages/examples'
import HomeScreen, { HomeScreenProps } from '@/pages/HomeScreen'

export type RootNavigationParamList = {
  Development: {}
  Examples: {}
  HomeScreen: HomeScreenProps
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
        <BasicNav.Screen name="HomeScreen" component={HomeScreen} />
      </BasicNav.Navigator>
    </NavigationContainer>
  )
}
