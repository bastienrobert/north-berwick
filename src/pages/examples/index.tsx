import React from 'react'
import { Button, View } from 'react-native'

import { createBasicNavigator } from '@/lib/CustomNavigator'

import HomeScreen, { HomeProps } from './HomeScreen'
import ARScene, { ARSceneProps } from './ARScene'
import ThreeDScene, { ThreeDSceneProps } from './3DScene'
import FlipCard from './FlipCard'
import ScrollVideoScreen, { ScrollVideoScreenProps } from './ScrollVideoScreen'

export type ExampleNavigationParamList = {
  Home: HomeProps
  FlipCard: {}
  ScrollVideoScreen: ScrollVideoScreenProps
  ARScene: ARSceneProps
  ThreeDScene: ThreeDSceneProps
}

const BasicNav = createBasicNavigator<ExampleNavigationParamList>()

export default function Examples({ navigation }: any) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 30, left: 30, zIndex: 2 }}>
        <Button
          title="DEV"
          onPress={() => navigation.navigate('Development', {})}
        />
      </View>
      <BasicNav.Navigator>
        <BasicNav.Screen name="Home" component={HomeScreen} />
        <BasicNav.Screen name="ARScene" component={ARScene} />
        <BasicNav.Screen name="ThreeDScene" component={ThreeDScene} />
        <BasicNav.Screen name="FlipCard" component={FlipCard} />
        <BasicNav.Screen
          name="ScrollVideoScreen"
          component={ScrollVideoScreen}
        />
      </BasicNav.Navigator>
    </View>
  )
}
