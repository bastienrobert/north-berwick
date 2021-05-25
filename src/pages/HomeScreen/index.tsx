import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { SafeAreaView, Text } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'
import RoundedButton from '@/components/shared/RoundedButton'
import DeckIcon from '@/components/icons/DeckIcon'
import LargeButton from '@/components/shared/LargeButton'
import ScanButton from '@/components/shared/ScanButton'

export interface HomeScreenProps {}
type HomePropsWithNavigation = HomeScreenProps & {
  navigation: NavigationProp<RootNavigationParamList, 'HomeScreen'>
}

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Hello world!</Text>
      <RoundedButton onPress={() => null} large>
        <DeckIcon />
      </RoundedButton>
      <LargeButton onPress={() => null}>Hello</LargeButton>
      <ScanButton />
    </SafeAreaView>
  )
}
