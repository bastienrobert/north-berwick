import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { SafeAreaView, Text } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'

export interface ConclusionSummaryProps {}
type ConclusionSummaryPropsWithNavigation = ConclusionSummaryProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Conclusion:Summary'>
}

export default function ConclusionSummary({
  navigation,
}: ConclusionSummaryPropsWithNavigation) {
  return (
    <SafeAreaView>
      <Text>Summary!</Text>
    </SafeAreaView>
  )
}
