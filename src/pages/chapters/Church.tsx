import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { Button, SafeAreaView, Text, View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'
import ScanButton from '@/components/ScanButton'
import { useScan } from '@/App/Scan/ScanProvider'

export interface ChapterChurchProps {}
type ChapterChurchPropsWithNavigation = ChapterChurchProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Church'>
}

const CORRECT = {
  ingredient: 'bones',
  family: {
    husband: 'X',
    children: ['A', 'B', 'C'],
  },
}

export default function ChapterChurch({
  navigation,
}: ChapterChurchPropsWithNavigation) {
  const [answsers, setAnswers] = useState<{
    ingredient: string | null
    family: {
      husband: string | null
      children: [string | null, string | null, string | null]
    }
  }>({
    ingredient: null,
    family: {
      husband: null,
      children: [null, null, null],
    },
  })

  const { set, hide } = useScan()

  return (
    <SafeAreaView>
      <Text>Welcome to the church!</Text>
      <View>
        <Text>Ingredient: </Text>
        <Button title="EDIT" onPress={() => null} />
      </View>
      <View>
        <Text>Family: </Text>
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
