import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { SafeAreaView, Text } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'
import ScanButton from '@/components/ScanButton'

export interface ChapterCastleProps {}
type ChapterCastlePropsWithNavigation = ChapterCastleProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Castle'>
}

export default function ChapterCastle({
  navigation,
}: ChapterCastlePropsWithNavigation) {
  return (
    <SafeAreaView>
      <Text>Welcome to the castle!</Text>
    </SafeAreaView>
  )
}
