import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { Button, SafeAreaView, Text, View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'
import ScanButton from '@/components/ScanButton'
import { useScan } from '@/App/Scan/ScanProvider'

export interface ChapterGeillisHouseProps {}
type ChapterGeillisHousePropsWithNavigation = ChapterGeillisHouseProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:GeillisHouse'>
}

const TORTURES = [
  {
    name: 'bride',
    image: undefined,
  },
]

const CARE = [
  {
    name: 'bones',
    image: undefined,
  },
]

const ACTIVITY = [
  {
    name: 'healer',
    image: undefined,
  },
]

const CORRECT = {
  tortures: 'bride',
  care: 'bones',
  activity: 'healer',
}

export default function ChapterGeillisHouse({
  navigation,
}: ChapterGeillisHousePropsWithNavigation) {
  const [answsers, setAnswers] = useState<
    Record<keyof typeof CORRECT, string | null>
  >({
    tortures: null,
    care: null,
    activity: null,
  })

  const { set, hide } = useScan()

  return (
    <SafeAreaView>
      <Text>Welcome to the port!</Text>
      <View>
        <Text>Heal: </Text>
        <Button title="EDIT" onPress={() => null} />
      </View>
      <View>
        <Text>Torture: </Text>
        <Button title="EDIT" onPress={() => null} />
      </View>
      <View>
        <Text>Activity: </Text>
        <Button title="EDIT" onPress={() => null} />
      </View>

      <ScanButton
        onPress={() =>
          set({
            callbacks: {
              default: () => null,
              portrait_agnes_sampson: () => {
                navigation.navigate('Chapter:Castle', {})
                hide()
              },
            },
          })
        }
      />
    </SafeAreaView>
  )
}
