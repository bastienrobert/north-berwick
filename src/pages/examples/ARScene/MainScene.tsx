import React, { useCallback, useState } from 'react'
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
  ViroSpotLight,
} from '@viro-community/react-viro'
import { Alert } from 'react-native'

ViroARTrackingTargets.createTargets({
  place_cemetery: {
    source: require('@/assets/targets/place_cemetery.jpg'),
    orientation: 'Up',
    physicalWidth: 0.15,
  },
})

export default function MainScene() {
  return (
    <ViroARScene>
      <ViroARImageMarker target="place_cemetery">
        <ViroAmbientLight color="#FFFFFF" />
        <Viro3DObject
          source={require('@/assets/objects/grave.gltf')}
          scale={[0.05, 0.05, 0.05]}
          type="GLTF"
          animation={{ name: 'animation_0', run: true, loop: false }}
        />
      </ViroARImageMarker>
    </ViroARScene>
  )
}
