import React, { useMemo } from 'react'
import { GroupProps, useUpdate } from 'react-three-fiber'
import { Vector3, FontLoader, Uniform, Color } from 'three'

import vertex from '@/shaders/basic/shader.vert'
import fragment from '@/shaders/basic/shader.frag'

interface TextProps extends GroupProps {
  children: string
  vAlign?: string
  hAlign?: string
  size?: number
  color?: THREE.Color | string
}

export default function Text({
  children,
  vAlign = 'center',
  hAlign = 'center',
  size = 1,
  color = '#000000',
  ...props
}: TextProps) {
  const config = useMemo(
    () => ({
      font: new FontLoader().parse(require('@/assets/bold.json')),
      size: 40,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [],
  )
  const mesh = useUpdate<THREE.Mesh>(
    (self) => {
      const size = new Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox!.getSize(size)
      self.position.x =
        hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y =
        vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    },
    [children],
  )
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textBufferGeometry args={[children, config]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={{ uColor: new Uniform(new Color('#FF0')) }}
        />
      </mesh>
    </group>
  )
}
