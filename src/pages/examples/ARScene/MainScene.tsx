import {
  Viro3DObject,
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
  ViroBox,
  ViroSpotLight,
} from '@viro-community/react-viro'
import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'

ViroARTrackingTargets.createTargets({
  logo: {
    source: require('@/assets/targets/tmp/logo.png'),
    orientation: 'Up',
    physicalWidth: 0.025,
  },
  chap_1_1: {
    source: require('@/assets/book/chap_1_1.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
})

export default function MainScene() {
  const [current, setCurrent] = useState<number>()

  const onLogoAnchorUpdated = useCallback((marker) => {
    if (marker.anchorId === current) return

    setCurrent(marker.anchorId)
    Alert.alert('LOGO FOUND', '', [
      {
        text: 'CANCEL',
        onPress: () => setCurrent(undefined),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => console.log('VALIDATE LOGO'),
      },
    ])
  }, [])

  const onCarAnchorUpdated = useCallback((marker) => {
    if (marker.anchorId === current) return

    setCurrent(marker.anchorId)
    Alert.alert('CAR FOUND', '', [
      {
        text: 'CANCEL',
        onPress: () => setCurrent(undefined),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => console.log('VALIDATE CAR'),
      },
    ])
  }, [])

  return (
    <ViroARScene>
      {/* <ViroARImageMarker target="logo" onAnchorUpdated={onLogoAnchorUpdated} />
      <ViroARImageMarker target="car" onAnchorUpdated={onCarAnchorUpdated} /> */}
      <ViroARImageMarker target="logo">
        <Viro3DObject
          source={require('@/assets/tmp/box.glb')}
          type="GLB"
          scale={[0.03, 0.03, 0.03]}
        />
      </ViroARImageMarker>
      <ViroARImageMarker
        target="chap_1_1"
        onHover={(isHovering: boolean) =>
          console.log('CAR', isHovering)
        }></ViroARImageMarker>
      <ViroSpotLight
        innerAngle={5}
        outerAngle={25}
        direction={[0, -1, 0]}
        position={[0, 5, 1]}
        color="#ffffff"
        castsShadow={true}
        shadowMapSize={2048}
        shadowNearZ={2}
        shadowFarZ={7}
        shadowOpacity={0.7}
      />
    </ViroARScene>
  )
}
