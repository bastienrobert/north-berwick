import React, { ReactNode, useEffect, useRef } from 'react'

import { Provider } from './PortalHost'

interface ConsumerProps {
  children: ReactNode
  manager: Provider | null
}

export default function PortalConsumer({ children, manager }: ConsumerProps) {
  const key = useRef<string | undefined>(undefined)

  const checkManager = (): void => {
    if (!manager) {
      throw new Error('No portal manager defined')
    }
  }

  const handleInit = (): void => {
    checkManager()
    key.current = manager?.mount(children)
  }

  useEffect(() => {
    checkManager()
    manager?.update(key.current, children)
  }, [children, manager])

  useEffect(() => {
    handleInit()

    return (): void => {
      checkManager()
      manager?.unmount(key.current)
    }
  }, [])

  return null
}
