import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import Sound from 'react-native-sound'

Sound.setCategory('Playback')

export interface UseAudioProps {
  source: string
  play?: boolean
  looping?: boolean
  volume?: number
  fadeIn?: number
  fadeOut?: number
}

export default function useAudio({
  source,
  play,
  looping,
  volume: toValue = 1,
  fadeIn,
  fadeOut,
}: UseAudioProps) {
  const audio = useRef(new Sound(source)).current
  const volume = useRef(new Animated.Value(fadeIn === undefined ? 0 : 1))
    .current

  useEffect(() => {
    return () => audio.stop()
  }, [])

  useEffect(() => {
    if (looping) audio.setNumberOfLoops(-1)
  }, [looping])

  useEffect(() => {
    const id = volume.addListener(({ value }) => {
      audio.setVolume(value)
    })

    return () => {
      volume.removeListener(id)
    }
  }, [volume])

  useEffect(() => {
    if (fadeOut) {
      Animated.timing(volume, {
        useNativeDriver: false,
        duration: fadeOut,
        toValue: 0,
      })
    }
  }, [fadeOut])

  useEffect(() => {
    if (play) {
      audio.play(() => console.log('PLAY'))
      if (fadeIn) {
        Animated.timing(volume, {
          useNativeDriver: false,
          duration: fadeIn,
          toValue: toValue,
        })
      }
    }
  }, [play, volume, toValue, fadeIn])
}
