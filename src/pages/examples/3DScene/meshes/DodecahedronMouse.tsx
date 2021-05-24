import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { Mesh, Vector3 } from 'three'

const tmp_vec_3 = new Vector3()
const tmp_vec_32 = new Vector3()

function Dodecahedron() {
  const ref = useRef<Mesh>()
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0])

  useFrame(({ mouse, camera }) => {
    tmp_vec_3.set(mouse.x, mouse.y, 0.5)
    tmp_vec_3.unproject(camera)
    const dir = tmp_vec_3.sub(camera.position).normalize()
    const distance = -camera.position.z / dir.z

    setPosition(
      tmp_vec_32
        .copy(camera.position)
        .add(dir.multiplyScalar(distance))
        .toArray(),
    )

    // console.log(ref.current!.position.toArray())
  })

  return (
    <mesh ref={ref} position={position} castShadow>
      <dodecahedronBufferGeometry attach="geometry" />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

export default function DodecahedronMouse() {
  return <Dodecahedron />
}
