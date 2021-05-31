import React, { useCallback, useEffect, useState } from 'react'
import {
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
} from '@viro-community/react-viro'

const targets = {
  map_castle: {
    source: require('@/assets/book/map_castle.jpg'),
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  map_church: {
    source: require('@/assets/book/map_church.jpg'),
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  map_geillis: {
    source: require('@/assets/book/map_geillis.jpg'),
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  map_port: {
    source: require('@/assets/book/map_port.jpg'),
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  portrait_agnes_sampson: {
    source: require('@/assets/book/portraits/portrait_agnes-sampson.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_alanis_muir: {
    source: require('@/assets/book/portraits/portrait_alanis-muir.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_barbara_napier: {
    source: require('@/assets/book/portraits/portrait_barbara-napier.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_euphame_maccalzean: {
    source: require('@/assets/book/portraits/portrait_euphame-maccalzean.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_geillis_ducan: {
    source: require('@/assets/book/portraits/portrait_geillis-ducan.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_john_cunningham: {
    source: require('@/assets/book/portraits/portrait_john-cunningham.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_lennit_bandilandis: {
    source: require('@/assets/book/portraits/portrait_lennit-bandilandis.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_margaret_acheson: {
    source: require('@/assets/book/portraits/portrait_margaret-acheson.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_rebecca_seaton: {
    source: require('@/assets/book/portraits/portrait_rebecca-seaton.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_robert_grierson: {
    source: require('@/assets/book/portraits/portrait_robert-grierson.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  portrait_smith_du_pont_hallis: {
    source: require('@/assets/book/portraits/portrait_smith-du-pont-hallis.jpg'),
    orientation: 'Up',
    physicalWidth: 0.045,
  },
  chap_1_1: {
    source: require('@/assets/book/chap_1_1.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_1_2: {
    source: require('@/assets/book/chap_1_2.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_1_3: {
    source: require('@/assets/book/chap_1_3.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_1_6: {
    source: require('@/assets/book/chap_1_6.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_2_1: {
    source: require('@/assets/book/chap_2_1.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_2_2: {
    source: require('@/assets/book/chap_2_2.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_2_3: {
    source: require('@/assets/book/chap_2_3.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_2_4: {
    source: require('@/assets/book/chap_2_4.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_2_5: {
    source: require('@/assets/book/chap_2_5.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_2_6: {
    source: require('@/assets/book/chap_2_6.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_2_7: {
    source: require('@/assets/book/chap_2_7.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_1: {
    source: require('@/assets/book/chap_3_1.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_10: {
    source: require('@/assets/book/chap_3_10.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_11: {
    source: require('@/assets/book/chap_3_11.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_12: {
    source: require('@/assets/book/chap_3_12.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_13: {
    source: require('@/assets/book/chap_3_13.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_2: {
    source: require('@/assets/book/chap_3_2.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_3: {
    source: require('@/assets/book/chap_3_3.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_4: {
    source: require('@/assets/book/chap_3_4.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_5: {
    source: require('@/assets/book/chap_3_5.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_6: {
    source: require('@/assets/book/chap_3_6.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_7: {
    source: require('@/assets/book/chap_3_7.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_8: {
    source: require('@/assets/book/chap_3_8.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_3_9: {
    source: require('@/assets/book/chap_3_9.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_4_1: {
    source: require('@/assets/book/chap_4_1.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_4_2: {
    source: require('@/assets/book/chap_4_2.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
  },
  chap_4_3: {
    source: require('@/assets/book/chap_4_3.jpg'),
    orientation: 'Up',
    physicalWidth: 0.2,
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
