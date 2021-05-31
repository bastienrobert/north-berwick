import { Viro360Video, ViroARScene } from '@viro-community/react-viro'
import React from 'react'
import { StyleSheet } from 'react-native'

export interface HDRSceneProps {}

export default function HDRScene() {
  return (
    <ViroARScene>
      <Viro360Video source={require('@/assets/tmp/hdr.mp4')} />
    </ViroARScene>
  )
}
