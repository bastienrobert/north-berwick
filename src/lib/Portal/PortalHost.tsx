import React, { useRef, createContext, ReactNode, useEffect } from 'react'
import { View, ViewStyle } from 'react-native'

import PortalManager, { ManagerHandles } from './PortalManager'

import { uuidv4 } from '@/utils/uuid'

interface HostProps {
  children: ReactNode
  style?: ViewStyle
}

export interface Provider {
  mount(children: ReactNode): string
  update(key?: string, children?: ReactNode): void
  unmount(key?: string): void
}

export const Context = createContext<Provider | null>(null)

export default function PortalHost({ children, style }: HostProps) {
  const managerRef = useRef<ManagerHandles>(null)
  const queue: {
    type: 'mount' | 'update' | 'unmount'
    key: string
    children?: ReactNode
  }[] = []

  useEffect(() => {
    while (queue.length && managerRef.current) {
      const action = queue.pop()

      if (action) {
        switch (action.type) {
          case 'mount':
            managerRef.current?.mount(action.key, action.children)
            break
          case 'update':
            managerRef.current?.update(action.key, action.children)
            break
          case 'unmount':
            managerRef.current?.unmount(action.key)
            break
        }
      }
    }
  }, [])

  const mount = (children: ReactNode): string => {
    const key = uuidv4()

    if (managerRef.current) {
      managerRef.current.mount(key, children)
    } else {
      queue.push({ type: 'mount', key, children })
    }

    return key
  }

  const update = (key: string, children: ReactNode): void => {
    if (managerRef.current) {
      managerRef.current.update(key, children)
    } else {
      const op = { type: 'mount' as 'mount', key, children }
      const index = queue.findIndex(
        (o) => o.type === 'mount' || (o.type === 'update' && o.key === key),
      )

      if (index > -1) {
        queue[index] = op
      } else {
        queue.push(op)
      }
    }
  }

  const unmount = (key: string): void => {
    if (managerRef.current) {
      managerRef.current.unmount(key)
    } else {
      queue.push({ type: 'unmount', key })
    }
  }

  return (
    <Context.Provider value={{ mount, update, unmount }}>
      <View
        style={[{ flex: 1 }, style]}
        collapsable={false}
        pointerEvents="box-none">
        {children}
      </View>

      <PortalManager ref={managerRef} />
    </Context.Provider>
  )
}
