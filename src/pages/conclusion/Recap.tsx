import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'

import FlippableCarousel from '@/components/FlippableCarousel'

import port from '@/controllers/port'
import castle from '@/controllers/castle'
import church from '@/controllers/church'
import geillis_house from '@/controllers/geillis_house'
import { atom, useAtom } from 'jotai'

export interface ConclusionRecapProps {}
type ConclusionRecapPropsWithNavigation = ConclusionRecapProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Conclusion:Recap'>
}

const results = atom((get) => ({
  ...get(port),
  ...get(castle),
  ...get(church),
  ...get(geillis_house),
}))

export default function ConclusionRecap({
  navigation,
}: ConclusionRecapPropsWithNavigation) {
  const [all] = useAtom(results)
  console.log(all)

  return (
    <View style={{ flex: 1 }}>
      {/* <FlippableCarousel onClosePress={() => null} data={[]} /> */}
    </View>
  )
}
