import React, {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
} from 'react'
import Sound from 'react-native-sound'

import useAudio, { UseAudioOptions } from '@/hooks/useAudio'
import useSound from '@/hooks/useSound'

interface SetMainSoundContext {
  source: Parameters<typeof useAudio>[0]
  options?: any
}

type UseAudioReturnType = ReturnType<typeof useAudio>
interface MainSoundContext {
  setParams: (params: SetMainSoundContext) => void
  // setPlay: UseAudioReturnType[0]
  // sound: UseAudioReturnType[2]
}
const Context = createContext<MainSoundContext>({} as MainSoundContext)

export default function MainSoundProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [params, setParams] = useState<SetMainSoundContext>()

  // const [setPlay, , sound] = useAudio(params?.source || null, params?.options)
  useSound(params?.source || null, params?.options)

  return (
    <Context.Provider
      children={children}
      value={{
        // sound,
        // setPlay,
        setParams,
      }}
    />
  )
}

export function useMainSound() {
  return useContext(Context)
}
