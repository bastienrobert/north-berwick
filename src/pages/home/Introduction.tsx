import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { Button, SafeAreaView, Text } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'

export interface HomeIntroductionProps {}
type HomePropsWithNavigation = HomeIntroductionProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Home:Introduction'>
}

export default function HomeIntroduction({
  navigation,
}: HomePropsWithNavigation) {
  return (
    <SafeAreaView>
      <Text>VIDEO!</Text>
      <Button
        title="NEXT"
        onPress={() => navigation.navigate('Chapter:Castle', {})}
      />
    </SafeAreaView>
  )
}
