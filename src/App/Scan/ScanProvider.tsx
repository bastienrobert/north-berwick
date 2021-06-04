import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react'

import { ScanCallbacks } from './ScanView'

interface ScanContext {
  callbacks: ScanCallbacks | null
  set: (callbacks: ScanCallbacks) => void
  hide: () => void
}
const Context = createContext<ScanContext>({} as ScanContext)

export default function ScanProvider({ children }: PropsWithChildren<unknown>) {
  const [callbacks, setCallbacks] = useState<ScanCallbacks | null>(null)

  const hide = useCallback(() => {
    setCallbacks(null)
  }, [])

  return (
    <Context.Provider
      children={children}
      value={{
        callbacks,
        set: setCallbacks,
        hide,
      }}
    />
  )
}

export function useScan() {
  return useContext(Context)
}
