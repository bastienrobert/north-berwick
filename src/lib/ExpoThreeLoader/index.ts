import { Loader } from 'three'
import { loadAsync } from 'expo-three'
import { ProgressCallback } from 'expo-three/build/loading.types'

export default class ExpoLoader<T> extends Loader {
  load(
    url: string,
    onLoad?: (result: T) => void,
    onProgress?: ProgressCallback,
    onError?: (event: ErrorEvent) => void,
  ): void {
    loadAsync(url, onProgress).then(onLoad).catch(onError)
  }
}
