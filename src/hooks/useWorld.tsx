import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  createContext,
  PropsWithChildren,
  MutableRefObject,
} from 'react'
import { World, Body, NaiveBroadphase } from 'cannon-es'
import { useFrame } from 'react-three-fiber'
import { Object3D } from 'three'

// Cannon-world context provider & avoid default value
const context = createContext<World>({} as World)

interface PhysicsProps {
  options?: ConstructorParameters<typeof World>[0]
}
export function Physics({
  children,
  options,
}: PropsWithChildren<PhysicsProps>) {
  // Set up physics
  const [world] = useState(() => new World(options))
  useEffect(() => {
    world.broadphase = new NaiveBroadphase()
    world.gravity.set(0, 0, -25)
  }, [world])

  // Run world stepper every frame
  useFrame(() => world.step(1 / 60))
  // Distribute world via context
  return <context.Provider value={world} children={children} />
}

export function useWorld() {
  return useContext(context)
}

// Custom hook to maintain a world physics body
export function useBody(
  { ...props },
  fn: (body: Body) => void,
  deps = [],
): [MutableRefObject<Object3D | undefined>, Body] {
  const ref = useRef<Object3D>()
  // Get cannon world object
  const world = useContext(context)
  // Instanciate a physics body
  const [body] = useState(() => new Body(props))
  useEffect(() => {
    // Call function so the user can add shapes
    fn(body)
    // Add body to world on mount
    world.addBody(body)
    // Remove body on unmount
    return () => world.removeBody(body)
  }, deps)

  useFrame(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      ref.current.position.copy(body.position as any)
      ref.current.quaternion.copy(body.quaternion as any)
    }
  })

  return [ref, body]
}
