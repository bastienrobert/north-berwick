import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { Button, SafeAreaView, Text, View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'
import ScanButton from '@/components/ScanButton'
import { useScan } from '@/App/Scan/ScanProvider'

export interface ChapterPortProps {}
type ChapterPortPropsWithNavigation = ChapterPortProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Port'>
}

const CAT = [
  {
    name: 'waves',
    image: undefined,
  },
  {
    name: 'sailor_cap',
    image: undefined,
  },
  {
    name: 'demon',
    image: undefined,
  },
  {
    name: 'storm',
    image: undefined,
  },
  {
    name: 'bones',
    image: undefined,
  },
  {
    name: 'witch_hat',
    image: undefined,
  },
  {
    name: 'cat',
    image: undefined,
  },
  {
    name: 'alcool',
    image: undefined,
  },
]

const CORRECT = {
  cat_king: ['bones', 'bones'],
  cat_user: ['bones', 'bones'],
  demons_king: ['bones', 'bones'],
  demons_user: ['bones', 'bones'],
}

export default function ChapterPort({
  navigation,
}: ChapterPortPropsWithNavigation) {
  const [answsers, setAnswers] = useState<
    Record<keyof typeof CORRECT, [string | null, string | null]>
  >({
    cat_king: [null, null],
    cat_user: [null, null],
    demons_king: [null, null],
    demons_user: [null, null],
  })

  const { set, hide } = useScan()

  return (
    <SafeAreaView>
      <Text>Welcome to the port!</Text>
      <View>
        <Text>Cat</Text>
        <Text>King: </Text>
        <Button title="EDIT" onPress={() => null} />
        <Text>User: </Text>
        <Button title="EDIT" onPress={() => null} />
      </View>
      <View>
        <Text>Demons</Text>
        <Text>King: </Text>
        <Button title="EDIT" onPress={() => null} />
        <Text>User: </Text>
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
