import React from 'react'
import { ViroARSceneNavigator } from '@viro-community/react-viro'

import MainScene from './MainScene'

export interface ARSceneProps {}

export default function ARScene() {
  return (
    <ViroARSceneNavigator
      viroAppProps={{
        hello: 'world',
      }}
      initialScene={{
        scene: MainScene,
      }}
      style={{ flex: 1 }}
    />
  )
}
