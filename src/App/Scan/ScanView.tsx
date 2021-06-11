import React, { useCallback, useEffect, useState } from 'react'
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import { useTranslate } from 'react-polyglot'
import {
  ViroARImageMarker,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
} from '@viro-community/react-viro'

import { useScan } from './ScanProvider'
import LargeButton from '@/components/shared/LargeButton'
import { capitalizeFirstLetter } from '@/utils/text'
import RoundedButton from '@/components/shared/RoundedButton'
import CrossIcon from '@/components/icons/CrossIcon'
import NotificationBox from '@/components/shared/NotificationBox'

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
  default: (target?: TargetsName) => void | false
}

interface CurrentScanState {
  id: number | null
  type: string | null
  name: TargetsName | null
}

export interface ScanProps {
  current: CurrentScanState
  setCurrent: (current: CurrentScanState) => void
}
function ScanScene({ current, setCurrent }: ScanProps) {
  const onAnchorUpdated = useCallback(
    ({ name, type }: Omit<CurrentScanState, 'id'>) => {
      return (marker: any) => {
        if (marker.anchorId === current.id) return
        setCurrent({ id: marker.anchorId, type, name })
      }
    },
    [],
  )

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
  const t = useTranslate()
  const { callbacks, hide } = useScan()
  const [current, setCurrent] = useState<CurrentScanState>({
    id: null,
    type: null,
    name: null,
  })
  const [isWrong, setIsWrong] = useState<string>()

  const setSafeCurrent = useCallback(
    (payload: CurrentScanState) => {
      if (callbacks && payload.name && callbacks[payload.name]) {
        setCurrent(payload)
      }
    },
    [callbacks],
  )

  const submit = useCallback(() => {
    if (!callbacks || !current.name) return
    const cb = callbacks[current.name]
    const res = cb ? cb() : callbacks.default(current.name)
    res === false ? setIsWrong(t('not_good_place')) : reset()
  }, [current.id, callbacks])

  const reset = useCallback(() => {
    setIsWrong(undefined)
    setCurrent({
      id: null,
      type: null,
      name: null,
    })
  }, [])

  useEffect(() => {
    if (current.name) {
    }
  }, [current.id, callbacks])

  if (!callbacks) return null
  return (
    <Animated.View style={styles.container}>
      <SafeAreaView style={styles.safeView}>
        <RoundedButton style={styles.close} onPress={hide}>
          <CrossIcon />
        </RoundedButton>
        {isWrong && (
          <NotificationBox style={styles.notification}>
            Mh, je crois que ce n’était pas ce lieu que je voulais voir
          </NotificationBox>
        )}
        {current.name && !isWrong && (
          <LargeButton theme="secondary" style={styles.button} onPress={submit}>
            {capitalizeFirstLetter(t('go_to')) +
              ' ' +
              capitalizeFirstLetter(t(current.name))}
          </LargeButton>
        )}
        {isWrong && (
          <LargeButton theme="secondary" style={styles.button} onPress={reset}>
            {capitalizeFirstLetter(t('scan_again'))}
          </LargeButton>
        )}
      </SafeAreaView>
      <ViroARSceneNavigator
        numberOfTrackedImages={1}
        initialScene={{
          scene: ScanScene,
          passProps: { current, setCurrent: setSafeCurrent },
        }}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 900,
    width: '100%',
    height: '100%',
  },
  safeView: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
    bottom: 0,
    zIndex: 2,
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  notification: {
    width: '85%',
    maxWidth: 370,
    alignSelf: 'center',
  },
  close: {
    marginTop: 15,
    marginLeft: 15,
  },
  button: {
    marginBottom: 27,
    alignSelf: 'center',
  },
})
