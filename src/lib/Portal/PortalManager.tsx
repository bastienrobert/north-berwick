import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  ReactNode,
  ForwardedRef,
} from 'react'
import { View, StyleSheet } from 'react-native'

export interface ManagerHandles {
  mount(key: string, children: ReactNode): void
  update(key?: string, children?: ReactNode): void
  unmount(key?: string): void
}

export interface Portal {
  key: string
  children: ReactNode
}

interface PortalManagerProps {
  innerRef: ForwardedRef<ManagerHandles>
}

function PortalManager({ innerRef }: PortalManagerProps) {
  const [portals, setPortals] = useState<Portal[]>([])

  useImperativeHandle(
    innerRef,
    (): ManagerHandles => ({
      mount(key: string, children: ReactNode): void {
        setPortals((prev) => [...prev, { key, children }])
      },

      update(key: string, children: ReactNode): void {
        setPortals((prev) =>
          prev.map((item) => {
            if (item.key === key) {
              return { ...item, children }
            }

            return item
          }),
        )
      },

      unmount(key: string): void {
        setPortals((prev) => prev.filter((item) => item.key !== key))
      },
    }),
  )

  return (
    <>
      {portals.map(({ key, children }, index: number) => (
        <View
          key={`${key}-${index}`}
          collapsable={false}
          pointerEvents="box-none"
          style={StyleSheet.absoluteFill}>
          {children}
        </View>
      ))}
    </>
  )
}

export default forwardRef<ManagerHandles>((_, ref) => (
  <PortalManager innerRef={ref} />
))
