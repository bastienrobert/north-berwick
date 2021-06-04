import React, { useEffect, useRef, useState } from 'react'
import { PrimitiveProps, useFrame } from 'react-three-fiber'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { AnimationMixer, Mesh } from 'three'

const COUNT = 40

interface BirdsProps {
  url: string | null
}
export default function Birds({ url }: BirdsProps) {
  if (!url) return null

  return (
    <>
      {new Array(COUNT).fill(undefined).map((_, i) => {
        const x =
          (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1)
        const y = -10 + Math.random() * 20
        const z = -5 + Math.random() * 10
        let speed = 2
        let factor = 0.25 + Math.random()

        return (
          <Bird
            key={i}
            position={[x, y, z]}
            rotation={[0, x > 0 ? Math.PI : 0, 0]}
            speed={speed}
            factor={factor}
            url={url}
          />
        )
      })}
    </>
  )
}

interface BirdProps extends Omit<PrimitiveProps, 'object'> {
  speed: number
  factor: number
  url: string
}

export function Bird({ speed = 1, factor = 20, url, ...props }: BirdProps) {
  const [model, setModel] = useState<GLTF>()

  useEffect(() => {
    new GLTFLoader().load(url, (r) => {
      setModel(r)
      r.scene.traverse((e) => console.log((e as Mesh).geometry.attributes))
    })
  }, [])

  const group = useRef<THREE.Group>()
  const [mixer] = useState(() => new AnimationMixer(group.current!))

  useEffect(() => {
    if (model) {
      mixer.clipAction(model!.animations[0], group.current).play()
    }
  }, [model])

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y +=
        Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5
    }
    mixer.update(delta * speed)
  })

  if (!model) return <group />
  return (
    <group ref={group}>
      <primitive {...props} object={model.scene} />
    </group>
  )
}
