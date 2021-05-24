import { useAssets } from 'expo-asset'
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Canvas } from 'react-three-fiber'

import Jumbo from './meshes/Jumbo'
import Birds from './meshes/Birds'
import PhysicsBox from './meshes/PhysicsBox'
import DodecahedronMouse from './meshes/DodecahedronMouse'

export interface ThreeDSceneProps {}

export default function ThreeDScene() {
  const [assets] = useAssets([
    require('@/assets/birds/flamingo.glb'),
    require('@/assets/birds/parrot.glb'),
    require('@/assets/birds/stork.glb'),
  ])

  if (!assets) return <View />
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Canvas colorManagement camera={{ position: [0, -15, 0] }}>
        {/* <Canvas colorManagement camera={{ position: [0, 0, 100] }}> */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <PhysicsBox />
        {/* <DodecahedronMouse /> */}

        {/* <Suspense fallback="loading...">
          <Jumbo />
          <Birds url={assets[0].uri} />
          <Birds url={assets[1].uri} />
          <Birds url={assets[2].uri} />
        </Suspense> */}
      </Canvas>
    </View>
  )
}
