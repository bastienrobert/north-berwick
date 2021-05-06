import {
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
} from '@viro-community/react-viro'
import React, { useCallback, useState } from 'react'
import { Alert } from 'react-native'

ViroARTrackingTargets.createTargets({
  logo: {
    source: require('@/assets/targets/logo.png'),
    orientation: 'Up',
    physicalWidth: 0.05,
  },
  car: {
    source: require('@/assets/targets/car.png'),
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
      <ViroARImageMarker target="logo" onAnchorUpdated={onLogoAnchorUpdated} />
      <ViroARImageMarker target="car" onAnchorUpdated={onCarAnchorUpdated} />
    </ViroARScene>
  )
}
