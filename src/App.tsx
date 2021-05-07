import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen, { HomeProps } from './components/HomeScreen'
import ARScene, { ARSceneProps } from './components/ARScene'
import ThreeDScene, { ThreeDSceneProps } from './components/3DScene'

export type RootStackParamList = {
  Home: HomeProps
  ARScene: ARSceneProps
  ThreeDScene: ThreeDSceneProps
}

const Tab = createBottomTabNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="ARScene"
          component={ARScene}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="ThreeDScene"
          component={ThreeDScene}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
