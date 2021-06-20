import { useState, useCallback } from 'react'
import { LayoutRectangle, NativeSyntheticEvent } from 'react-native'

export default function useLayout(): [
  LayoutRectangle,
  (e: NativeSyntheticEvent<{ layout: LayoutRectangle }>) => void,
] {
  const [layout, setLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const onLayout = useCallback((e) => setLayout(e.nativeEvent.layout), [])

  return [layout, onLayout]
}
