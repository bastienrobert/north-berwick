import React, { useEffect, useRef } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import {
  Viro360Image,
  Viro360ImageProps,
  ViroARScene,
  ViroARSceneNavigator,
} from '@viro-community/react-viro'

export type Image360Props = Viro360ImageProps & {
  style?: StyleProp<ViewStyle>
  onReadyForDisplay?: () => void
}

function MainScene(props: Image360Props) {
  return (
    <ViroARScene>
      <Viro360Image {...props} />
    </ViroARScene>
  )
}

export default function Image360({
  style,
  onReadyForDisplay,
  ...passProps
}: Image360Props) {
  const isBufferStart = useRef(false)
  useEffect(() => {
    if (!isBufferStart.current) {
      isBufferStart.current = true
      onReadyForDisplay?.()
    }
  }, [])

  return (
    <View style={[{ flex: 1 }, style]}>
      <ViroARSceneNavigator
        autofocus={true}
        style={{ flex: 1 }}
        initialScene={{
          passProps,
          scene: MainScene,
        }}
      />
    </View>
  )
}
