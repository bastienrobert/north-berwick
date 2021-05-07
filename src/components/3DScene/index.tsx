import { useAssets } from 'expo-asset'
import React, { Suspense, useEffect, useRef } from 'react'
import { View } from 'react-native'
import {
  Canvas,
  PerspectiveCameraProps,
  useFrame,
  useThree,
} from 'react-three-fiber'

import Jumbo from './meshes/Jumbo'
import Birds from './meshes/Birds'

function Camera(props: PerspectiveCameraProps) {
  const ref = useRef<THREE.PerspectiveCamera>()
  const { setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(ref.current!), [])
  useFrame(() => ref.current!.updateMatrixWorld())

  return <perspectiveCamera ref={ref} {...props} />
}

export interface ThreeDSceneProps {}

export default function ThreeDScene() {
  const [assets] = useAssets([
    require('@/assets/birds/flamingo.glb'),
    require('@/assets/birds/parrot.glb'),
    require('@/assets/birds/stork.glb'),
  ])

  console.log(assets)

  if (!assets) return <View />
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Canvas colorManagement>
        <Camera position={[0, 0, 100]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Suspense fallback="loading...">
          <Jumbo />
          <Birds url={assets[0].uri} />
          <Birds url={assets[1].uri} />
          <Birds url={assets[2].uri} />
        </Suspense>
      </Canvas>
    </View>
  )
}
