import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'

import Text from './Text'

export default function Jumbo() {
  const ref = useRef<THREE.Group>()
  useFrame(({ clock }) => {
    ref.current!.rotation.x = ref.current!.rotation.y = ref.current!.rotation.z =
      Math.sin(clock.getElapsedTime()) * 0.3
  })

  return (
    <group ref={ref}>
      <Text hAlign="left" position={[0, 4.2, 0]} children="REACT" />
      <Text hAlign="left" position={[0, 0, 0]} children="THREE" />
      <Text hAlign="left" position={[0, -4.2, 0]} children="FIBER" />
      <Text hAlign="left" position={[12, 0, 0]} children="5" size={3} />
      <Text hAlign="left" position={[16.5, -4.2, 0]} children="X" />
    </group>
  )
}
