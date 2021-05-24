import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export type Handler = () => boolean

export default (handler: Handler) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => BackHandler.removeEventListener('hardwareBackPress', handler)
  }, [handler])
}
