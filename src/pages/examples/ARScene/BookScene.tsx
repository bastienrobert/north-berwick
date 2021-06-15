import React, { useCallback, useEffect, useState } from 'react'
import {
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
} from '@viro-community/react-viro'

const targets = {
  map_castle: {
    source: require('@/assets/targets/map_castle.jpg'),
    type: 'map',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  map_church: {
    source: require('@/assets/targets/map_church.jpg'),
    type: 'map',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  map_geillis: {
    source: require('@/assets/targets/map_geillis.jpg'),
    type: 'map',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  map_port: {
    source: require('@/assets/targets/map_port.jpg'),
    type: 'map',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  portrait_agnes_sampson: {
    source: require('@/assets/targets/portrait_agnes_sampson.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_alanis_muir: {
    source: require('@/assets/targets/portrait_alanis_muir.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_euphame_maccalzean: {
    source: require('@/assets/targets/portrait_euphame_maccalzean.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_geillis_ducan: {
    source: require('@/assets/targets/portrait_geillis_ducan.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_john_cunningham: {
    source: require('@/assets/targets/portrait_john_cunningham.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_margaret_acheson: {
    source: require('@/assets/targets/portrait_margaret_acheson.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_robert_grierson: {
    source: require('@/assets/targets/portrait_robert_grierson.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_smith_du_pont_hallis: {
    source: require('@/assets/targets/portrait_smith_du_pont_hallis.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
}

ViroARTrackingTargets.createTargets(targets)

export default function BookScene() {
  const [current, setCurrent] = useState({
    id: undefined,
    name: undefined,
  })

  const onAnchorUpdated = useCallback((name) => {
    return (marker: any) => {
      if (marker.anchorId === current.id) return
      setCurrent({ id: marker.anchorId, name })
    }
  }, [])

  useEffect(() => {
    console.log('CURRENT IS', current)
  }, [current.id])

  return (
    <ViroARScene onHover={console.log}>
      {Object.keys(targets).map((name) => {
        return (
          <ViroARImageMarker
            target={name}
            key={name}
            onAnchorUpdated={onAnchorUpdated(name)}
          />
        )
      })}
    </ViroARScene>
  )
}
