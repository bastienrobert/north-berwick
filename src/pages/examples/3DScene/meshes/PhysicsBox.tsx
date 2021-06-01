import React, { forwardRef, useEffect, useRef, useState } from 'react'
import {
  Plane as CANNONPlane,
  Box as CANNONBox,
  Vec3 as CANNONVec3,
  Sphere as CANNONSphere,
  Body as CANNONBody,
  PointToPointConstraint,
} from 'cannon-es'

import { Physics, useBody, useWorld } from '@/hooks/useWorld'
import { Mesh, Object3D, PerspectiveCamera, Quaternion, Vector3 } from 'three'
import { MeshProps, useFrame, useThree } from 'react-three-fiber'

function Plane({ position, ...props }: MeshProps) {
  // Register plane as a physics body with zero mass
  const [ref] = useBody({ mass: 0 }, (body: any) => {
    body.addShape(new CANNONPlane())
    if (position) {
      const p = position instanceof Vector3 ? position.toArray() : position
      body.position.set(...p)
    }
  })
  return (
    <mesh ref={ref} receiveShadow {...props}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" color="#272727" />
    </mesh>
  )
}

const Box = forwardRef((props: MeshProps, innerRef: any) => {
  return (
    <mesh ref={innerRef} castShadow receiveShadow {...props}>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" />
    </mesh>
  )
})

const ClickMarker = forwardRef((props: MeshProps, innerRef: any) => {
  return (
    <mesh ref={innerRef} castShadow receiveShadow {...props}>
      <sphereBufferGeometry attach="geometry" args={[0.2, 8, 8]} />
      <meshStandardMaterial attach="material" color="#ff0000" />
    </mesh>
  )
})

const MovementPlane = forwardRef((props: MeshProps, innerRef: any) => {
  return (
    <mesh ref={innerRef} castShadow receiveShadow visible={false} {...props}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" color="#777777" />
    </mesh>
  )
})

const tmp_vec_3 = new Vector3()
const tmp_cvec_3 = new CANNONVec3()

function InnerPhysics() {
  const world = useWorld()
  const { camera } = useThree()
  const clickMarkerRef = useRef<Mesh>()
  const movementPlaneRef = useRef<Mesh>()

  const [current, setCurrent] = useState<{
    object: Object3D | undefined
    point: Vector3
  }>({
    object: undefined,
    point: new Vector3(),
  })

  const jointConstraintRef = useRef<PointToPointConstraint>()

  // Register box as a physics body with mass
  const [boxRef, body] = useBody({ mass: 50 }, (body) => {
    body.addShape(new CANNONBox(new CANNONVec3(1, 1, 1)))
    body.angularFactor.set(0, 1, 0)
  })
  const [staticRef, staticBody] = useBody({ mass: 0 }, (body) => {
    body.addShape(new CANNONBox(new CANNONVec3(1, 1, 1)))
    body.type = CANNONBody.STATIC
    body.position.set(2, 0, -9)
  })

  useEffect(() => {
    const cb = (e: any) => {
      if (e.body === staticBody) console.log('COLLIDING W/ STATIC')
    }

    body.addEventListener('collide', cb)

    return () => {
      body.removeEventListener('collide', cb)
    }
  }, [body])

  const [_, jointBody] = useBody({ mass: 0 }, (body) => {
    body.addShape(new CANNONSphere(0.1))
    body.collisionFilterGroup = 0
    body.collisionFilterMask = 0
  })

  const showClickMarker = () => {
    if (clickMarkerRef.current) {
      clickMarkerRef.current.visible = true
    }
  }

  function moveClickMarker(position: Vector3) {
    if (clickMarkerRef.current) {
      clickMarkerRef.current.position.copy(position)
    }
  }

  const hideClickMarker = () => {
    if (clickMarkerRef.current) {
      clickMarkerRef.current.visible = false
    }
  }

  const moveMovementPlane = (point: Vector3) => {
    if (movementPlaneRef.current) {
      // Center at mouse position
      movementPlaneRef.current.position.copy(point)
      // Make it face toward the camera
      movementPlaneRef.current.quaternion.copy(camera.quaternion)
    }
  }

  function addJointConstraint(
    position: CANNONVec3,
    constrainedBody: CANNONBody,
  ) {
    // Vector that goes from the body to the clicked point
    const vector = new CANNONVec3()
      .copy(position)
      .vsub(constrainedBody.position)

    // Apply anti-quaternion to vector to tranform it into the local body coordinate system
    const antiRotation = constrainedBody.quaternion.inverse()
    const pivot = antiRotation.vmult(vector) // pivot is not in local body coordinates

    body.angularFactor.set(0, 0, 0)

    // Move the cannon click marker body to the click position
    jointBody.position.copy(position)

    // Create a new constraint
    // The pivot for the jointBody is zero
    jointConstraintRef.current = new PointToPointConstraint(
      constrainedBody,
      pivot,
      jointBody,
      new CANNONVec3(0, 0, 0),
    )
    jointConstraintRef.current

    // Add the constraint to world
    world.addConstraint(jointConstraintRef.current)
  }

  function moveJoint(position: CANNONVec3) {
    jointBody.position.copy(position)
  }

  // Remove constraint from world
  function removeJointConstraint() {
    if (jointConstraintRef.current) {
      world.removeConstraint(jointConstraintRef.current)
      jointConstraintRef.current = undefined
      body.angularFactor.set(0, 1, 0)
    }
  }

  useEffect(() => {
    if (current.object) {
      showClickMarker()
      moveClickMarker(current.point)
      moveMovementPlane(current.point)
      addJointConstraint(
        tmp_cvec_3.set(current.point.x, current.point.y, current.point.z),
        body,
      )
    } else {
      hideClickMarker()
      removeJointConstraint()
    }
  }, [current, body])

  useFrame(() => {
    if (body && boxRef.current && current.object) {
      boxRef.current.lookAt(0, 0, -9)
      body.quaternion.copy(boxRef.current.quaternion as any)
      const euler = new CANNONVec3()
      body.quaternion.toEuler(euler)
      euler.y = 0
      euler.z = 0
      body.quaternion.setFromEuler(euler.x, euler.y, euler.z)
    }
  })

  return (
    <group
      onPointerOut={() => setCurrent((c) => ({ ...c, object: undefined }))}>
      <Plane position={[0, 0, -10]} />
      <ClickMarker ref={clickMarkerRef} />
      <MovementPlane
        ref={movementPlaneRef}
        onPointerMove={({ point }) => {
          moveClickMarker(point)
          moveJoint(tmp_cvec_3.set(point.x, point.y, point.z))
        }}
      />
      <Box
        ref={boxRef}
        onPointerDown={({ object, point }) => setCurrent({ object, point })}
        onPointerUp={() => setCurrent((c) => ({ ...c, object: undefined }))}
      />
      <Box ref={staticRef} />
    </group>
  )
}

export default function PhysicsBox() {
  return (
    <Physics options={{ quatNormalizeSkip: 0, quatNormalizeFast: false }}>
      <InnerPhysics />
    </Physics>
  )
}
