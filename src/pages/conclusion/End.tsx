import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { SafeAreaView, Text } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'

export interface ConclusionEndProps {}
type ConclusionEndPropsWithNavigation = ConclusionEndProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Conclusion:End'>
}

export default function ConclusionEnd({
  navigation,
}: ConclusionEndPropsWithNavigation) {
  return (
    <SafeAreaView>
      <Text>End!</Text>
    </SafeAreaView>
  )
}
