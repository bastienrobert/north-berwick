import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen, { HomeProps } from './components/HomeScreen'
import ARScene, { ARSceneProps } from './components/ARScene'
import ThreeDScene, { ThreeDSceneProps } from './components/3DScene'

export type RootStackParamList = {
  Home: HomeProps
  ARScene: ARSceneProps
  ThreeDScene: ThreeDSceneProps
}

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ARScene" component={ARScene} />
        <Stack.Screen name="ThreeDScene" component={ThreeDScene} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
