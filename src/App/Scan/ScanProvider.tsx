import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react'
import { useTranslate } from 'react-polyglot'

import { ScanParams } from './ScanView'

import { capitalizeFirstLetter } from '@/utils/text'

interface ScanContext {
  params: ScanParams | null
  set: (params: ScanParams) => void
  hide: () => void
}
const Context = createContext<ScanContext>({} as ScanContext)

export default function ScanProvider({ children }: PropsWithChildren<unknown>) {
  const t = useTranslate()
  const [params, setParams] = useState<ScanParams | null>(null)

  const setSafeParams = useCallback((payload) => {
    setParams(
      Object.assign(
        {},
        {
          wrongPlaceLabel: capitalizeFirstLetter(t('not_good_place')),
          goToLabel: capitalizeFirstLetter(t('go_to')),
        },
        payload,
      ),
    )
  }, [])

  const hide = useCallback(() => {
    setParams(null)
  }, [])

  return (
    <Context.Provider
      children={children}
      value={{
        params,
        set: setSafeParams,
        hide,
      }}
    />
  )
}

export function useScan() {
  return useContext(Context)
}
