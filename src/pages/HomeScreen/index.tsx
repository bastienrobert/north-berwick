import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { SafeAreaView, Text } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'

export interface HomeScreenProps {}
type HomePropsWithNavigation = HomeScreenProps & {
  navigation: NavigationProp<RootNavigationParamList, 'HomeScreen'>
}

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Hello world!</Text>
    </SafeAreaView>
  )
}
