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
  portrait_agnes_sampson: {
    source: require('@/assets/book/portraits/portrait_agnes-sampson.jpg'),
    orientation: 'Up',
    physicalWidth: 0.035,
  },
})

export default function MainScene() {
  return (
    <ViroARScene>
      <ViroARImageMarker
        target="portrait_agnes_sampson"
        onAnchorFound={() => console.log('FOUND')}>
        <ViroAmbientLight color="#FFFFFF" />
        <Viro3DObject
          source={require('@/assets/tmp/tomb.glb')}
          scale={[0.01, 0.01, 0.01]}
          type="GLB"
          animation={{ name: 'animation_0', run: true, loop: true }}
        />
      </ViroARImageMarker>
    </ViroARScene>
  )
}
