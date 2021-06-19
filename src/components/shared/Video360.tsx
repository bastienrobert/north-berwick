import React, { useEffect, useRef } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import {
  Viro360Video,
  Viro360VideoProps,
  ViroARScene,
  ViroARSceneNavigator,
} from '@viro-community/react-viro'

export type Video360Props = Viro360VideoProps & {
  style?: StyleProp<ViewStyle>
  onReadyForDisplay?: () => void
}

function MainScene(props: Video360Props) {
  return (
    <ViroARScene>
      <Viro360Video {...props} />
    </ViroARScene>
  )
}

export default function Video360({
  style,
  onReadyForDisplay,
  ...passProps
}: Video360Props) {
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
