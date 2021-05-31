import React, { useCallback, useEffect, useState } from 'react'
import { Animated, Dimensions, View } from 'react-native'
import {
  ViroARImageMarker,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
} from '@viro-community/react-viro'

import { useScan } from './ScanProvider'

const targets = {
  map_castle: {
    source: require('@/assets/book/map_castle.jpg'),
    type: 'map',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  map_church: {
    source: require('@/assets/book/map_church.jpg'),
    type: 'map',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  map_geillis: {
    source: require('@/assets/book/map_geillis.jpg'),
    type: 'map',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  map_port: {
    source: require('@/assets/book/map_port.jpg'),
    type: 'map',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  portrait_agnes_sampson: {
    source: require('@/assets/book/portraits/portrait_agnes-sampson.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_alanis_muir: {
    source: require('@/assets/book/portraits/portrait_alanis-muir.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_barbara_napier: {
    source: require('@/assets/book/portraits/portrait_barbara-napier.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_euphame_maccalzean: {
    source: require('@/assets/book/portraits/portrait_euphame-maccalzean.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_geillis_ducan: {
    source: require('@/assets/book/portraits/portrait_geillis-ducan.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_john_cunningham: {
    source: require('@/assets/book/portraits/portrait_john-cunningham.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_lennit_bandilandis: {
    source: require('@/assets/book/portraits/portrait_lennit-bandilandis.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_margaret_acheson: {
    source: require('@/assets/book/portraits/portrait_margaret-acheson.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_rebecca_seaton: {
    source: require('@/assets/book/portraits/portrait_rebecca-seaton.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_robert_grierson: {
    source: require('@/assets/book/portraits/portrait_robert-grierson.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_smith_du_pont_hallis: {
    source: require('@/assets/book/portraits/portrait_smith-du-pont-hallis.jpg'),
    type: 'portait',
    orientation: 'Up',
    physicalWidth: 0.045,
  },
}

ViroARTrackingTargets.createTargets(targets)

const { width } = Dimensions.get('window')

type TargetsName = keyof typeof targets
export type ScanCallbacks = Partial<Record<TargetsName, () => void>> & {
  default: (target?: TargetsName) => void
}

export interface ScanProps {
  callbacks: ScanCallbacks
}

interface CurrentScanState {
  id: number | null
  type: string | null
  name: TargetsName | null
}
function ScanScene({ callbacks }: ScanProps) {
  const [current, setCurrent] = useState<CurrentScanState>({
    id: null,
    type: null,
    name: null,
  })

  const onAnchorUpdated = useCallback(
    ({ name, type }: Omit<CurrentScanState, 'id'>) => {
      return (marker: any) => {
        if (marker.anchorId === current.id) return
        setCurrent({ id: marker.anchorId, type, name })
      }
    },
    [],
  )

  useEffect(() => {
    if (current.name) {
      const cb = callbacks[current.name]
      cb ? cb() : callbacks.default(current.name)
    }
  }, [current.id, callbacks])

  return (
    <ViroARScene>
      {Object.keys(targets).map((name) => {
        return (
          <ViroARImageMarker
            target={name}
            key={name}
            onAnchorUpdated={onAnchorUpdated({
              name: name as TargetsName,
              type: targets[name as TargetsName].type,
            })}
          />
        )
      })}
    </ViroARScene>
  )
}

export default function ScanView() {
  const { callbacks } = useScan()

  if (!callbacks) return null
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 900,
        width: '100%',
        height: '100%',
      }}>
      <ViroARSceneNavigator
        numberOfTrackedImages={1}
        initialScene={{ scene: ScanScene, passProps: { callbacks } }}
      />
    </Animated.View>
  )
}
