import React, { useCallback, useEffect, useRef } from 'react'
import { View } from 'react-native'
import {
  Viro360Video,
  Viro360VideoProps,
  ViroARScene,
  ViroARSceneNavigator,
} from '@viro-community/react-viro'

export type Video360Props = Viro360VideoProps & {
  onReadyForDisplay: () => void
}

function MainScene({ onReadyForDisplay, ...props }: Video360Props) {
  const isBufferStart = useRef(false)
  useEffect(() => {
    if (!isBufferStart.current) {
      isBufferStart.current = true
      onReadyForDisplay()
    }
  }, [])

  return (
    <ViroARScene>
      <Viro360Video {...props} />
    </ViroARScene>
  )
}

export default function Video360(passProps: Video360Props) {
  return (
    <View style={{ flex: 1 }}>
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
