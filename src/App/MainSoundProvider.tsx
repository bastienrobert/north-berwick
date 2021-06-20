import React, {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
} from 'react'

import useSound, {
  PlayFunction,
  SoundData,
  StopFunction,
} from '@/hooks/useSound'

interface SetMainSoundContext {
  source: Parameters<typeof useSound>[0]
  options?: any
}

interface MainSoundContext {
  setParams: (params: SetMainSoundContext) => void
  play: PlayFunction
  stop: StopFunction
  data: SoundData
}
const Context = createContext<MainSoundContext>({} as MainSoundContext)

export default function MainSoundProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [params, setParams] = useState<SetMainSoundContext>()

  const [play, , stop, data] = useSound(params?.source || null, params?.options)

  return (
    <Context.Provider
      children={children}
      value={{
        play,
        stop,
        data,
        setParams,
      }}
    />
  )
}

export function useMainSound() {
  return useContext(Context)
}
