import React from 'react'
import { View } from 'react-native'
import { ViroARSceneNavigator } from '@viro-community/react-viro'

import MainScene from './MainScene'
import BookScene from './BookScene'
import HDRScene from './HDRScene'

export interface ARSceneProps {}

export default function ARScene() {
  // style={{ backgroundColor: 'rgba(255, 87, 51, .2)' }}
  return (
    <View style={{ flex: 1 }}>
      {/* <View
        style={{
          flex: 1,
          backgroundColor: '#3336ff',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 2,
          opacity: 0.2,
        }}
      /> */}
      <ViroARSceneNavigator
        autofocus={true}
        style={{ flex: 1 }}
        initialScene={{
          // scene: HDRScene,
          scene: MainScene,
          // scene: BookScene,
        }}
      />
    </View>
  )
}
