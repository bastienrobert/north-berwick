import { useEffect, useState, useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import Sound from 'react-native-sound'

import useInterval from './useInterval'
import useIsMounted from './useIsMounted'

Sound.setCategory('Playback')

export interface SoundHookOptions {
  volume?: number
  timeRate?: number
  loop?: boolean
  autoPlay?: boolean
  delay?: number
  fadeIn?: boolean | number
  fadeOut?: boolean | number
}

export type PlayFunction = () => void
export type PauseFunction = () => void
export type StopFunction = () => void

export interface SoundData {
  sound: Sound | null
  seek: (seconds: number) => void
  isPlaying: boolean
  duration: number
}

const FADE_IN_DEFAULT = 250
const FADE_OUT_DEFAULT = 250

export default function useSound(
  url: string | null,
  {
    autoPlay = false,
    loop = false,
    volume = 1,
    timeRate = 200,
    fadeIn,
    fadeOut,
    delay = 200,
  }: SoundHookOptions = {},
): [PlayFunction, PauseFunction, StopFunction, SoundData] {
  // prettier-ignore
  const fadeInDuration = fadeIn === true ? FADE_IN_DEFAULT : fadeIn ? fadeIn : 0
  // prettier-ignore
  const fadeOutDuration = fadeOut === true ? FADE_OUT_DEFAULT : fadeOut ? fadeOut : 0

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [sound, setSound] = useState<Sound | null>(null)
  const [duration, setDuration] = useState<number>(0)
  const isMounted = useIsMounted()

  const isFadingIn = useRef(false)
  const isFadingOut = useRef(false)

  const animatedVolume = useRef(new Animated.Value(0)).current
  const durationRef = useRef<number>()
  durationRef.current = duration

  const handleSetSound = (_sound: Sound) => {
    setDuration(_sound.getDuration())
    setSound(_sound)
  }

  const loadSound = (url: string | null) => {
    if (url) {
      const _sound = new Sound(url, () => {
        if (isMounted.current) {
          handleSetSound(_sound)
        }
      })
    }
  }

  const fadeInVolume = () => {
    if (fadeInDuration) {
      isFadingIn.current = true
      animatedVolume.setValue(0)
      Animated.timing(animatedVolume, {
        useNativeDriver: false,
        duration: fadeInDuration,
        toValue: 1,
        delay,
      }).start(() => {
        isFadingIn.current = false
      })
    } else {
      animatedVolume.setValue(1)
    }
  }

  const fadeOutVolume = () => {
    return new Promise<void>((resolve) => {
      if (fadeOutDuration) {
        isFadingOut.current = true
        Animated.timing(animatedVolume, {
          useNativeDriver: false,
          duration: fadeOutDuration,
          toValue: 0,
        }).start(() => {
          isFadingOut.current = false
          stop()
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  const play: PlayFunction = useCallback(() => {
    fadeInVolume()
    sound?.play(() => {
      setIsPlaying(false)
    })
    setIsPlaying(true)
  }, [sound, fadeInVolume])

  const stop = useCallback(() => {
    sound?.stop(() => setIsPlaying(false))
  }, [sound])

  const pause = useCallback(() => {
    sound?.pause(() => {
      setIsPlaying(false)
    })
  }, [sound])

  const seek = useCallback(
    (sec) => {
      sound?.setCurrentTime(sec)
    },
    [sound],
  )

  useInterval(() => {
    if (sound?.isPlaying()) {
      sound.getCurrentTime((sec) => {
        if (!durationRef.current || loop) return
        if (
          !isFadingOut &&
          durationRef.current - fadeOutDuration / 1000 < sec
        ) {
          fadeOutVolume()
        }
      })
    }
  }, timeRate)

  /**
   * apply animated volume
   */
  useEffect(() => {
    const id = sound
      ? animatedVolume.addListener(({ value }) => {
          sound.setVolume(value)
        })
      : null

    return () => {
      if (id) {
        animatedVolume.removeListener(id)
      }
    }
  }, [sound])

  /**
   * on sound loaded
   */
  useEffect(() => {
    if (sound) {
      if (autoPlay) {
        play()
      }
      if (loop) {
        sound.setNumberOfLoops(-1)
      }
    }
  }, [sound])

  /**
   * on mount
   */
  useEffect(() => {
    loadSound(url)
  }, [])

  /**
   * on update
   */
  useEffect(() => {
    ;(async () => {
      await fadeOutVolume()

      if (sound) {
        stop()
        setSound(null)
      }

      loadSound(url)
    })()
  }, [url])

  /**
   * on volume change
   */
  useEffect(() => {
    if (sound && !isFadingIn.current && !isFadingOut.current) {
      sound.setVolume(volume)
    }
  }, [volume])

  return [
    play,
    pause,
    stop,
    {
      seek,
      sound,
      isPlaying,
      duration,
    },
  ]
}
