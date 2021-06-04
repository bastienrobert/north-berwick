import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { Button, SafeAreaView, Text, View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'
import ScanButton from '@/components/ScanButton'
import { useScan } from '@/App/Scan/ScanProvider'

export interface ChapterCastleProps {}
type ChapterCastlePropsWithNavigation = ChapterCastleProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Castle'>
}

const PORTRAITS = [
  {
    name: 'agnes',
    image: undefined,
  },
]

const TORTURES = [
  {
    name: 'bride',
    image: undefined,
  },
]

const CORRECT = {
  portraits: 'agnes',
  tortures: 'bride',
  poster: true,
}

export default function ChapterCastle({
  navigation,
}: ChapterCastlePropsWithNavigation) {
  const [answsers, setAnswers] = useState<
    Record<keyof typeof CORRECT, boolean | string | null>
  >({
    portraits: null,
    tortures: null,
    poster: true,
  })
  const { set, hide } = useScan()

  return (
    <SafeAreaView>
      <Text>Welcome to the castle!</Text>
      <View>
        <Text>Portrait: {answsers.portraits}</Text>
        <Button title="EDIT" onPress={() => null} />
      </View>
      <View>
        <Text>Object: {answsers.tortures}</Text>
        <Button title="EDIT" onPress={() => null} />
      </View>
      <View>
        <Text>Map: {answsers.poster ? 'DONE' : 'TODO'}</Text>
      </View>
      <ScanButton
        onPress={() =>
          set({
            default: () => null,
            portrait_agnes_sampson: () => {
              navigation.navigate('Chapter:Port', {})
              hide()
            },
          })
        }
      />
    </SafeAreaView>
  )
}
