import React, { useEffect, useRef, useState } from 'react'
import { Texture } from 'three'
import { useFrame } from 'react-three-fiber'

import Animated3DSprite from '@/lib/Animated3DSprite'
import ExpoLoader from '@/lib/ExpoThreeLoader'

export default function Sprite({ src, size = [1, 1] }: any) {
  const animator = useRef<Animated3DSprite>()
  const loader = useRef(new ExpoLoader())
  const [texture, setTexture] = useState(new Texture())

  useEffect(() => {
    loader.current.load(src, (t: any) => {
      animator.current = new Animated3DSprite(t, 3, 3, 5, 5)
      setTexture(animator.current.init())
    })
  }, [src])

  const onClick = () => {
    animator.current?.next()
  }

  return (
    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} onClick={onClick}>
      <planeBufferGeometry attach="geometry" args={size} />
      <meshStandardMaterial
        attach="material"
        map={texture}
        transparent={true}
      />
    </mesh>
  )
}
