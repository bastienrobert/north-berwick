import React, { ReactNode, useCallback, useState } from 'react'
import { Animated, SafeAreaView, StyleSheet, View } from 'react-native'
import { useTranslate } from 'react-polyglot'
import {
  ViroARImageMarker,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
} from '@viro-community/react-viro'

import { useScan } from './ScanProvider'
import LargeButton from '@/components/shared/LargeButton'
import RoundedButton from '@/components/shared/RoundedButton'
import CrossIcon from '@/components/icons/CrossIcon'
import NotificationBox from '@/components/shared/NotificationBox'

import { capitalizeFirstLetter } from '@/utils/text'

const targets = {
  cover: {
    source: require('@/assets/targets/cover.jpg'),
    type: 'misc',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
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
  poster_first: {
    source: require('@/assets/targets/poster_first.jpg'),
    type: 'poster',
    orientation: 'Up',
    physicalWidth: 0.15,
  },
  poster_second: {
    source: require('@/assets/targets/poster_second.jpg'),
    type: 'poster',
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

type TargetsName = keyof typeof targets
export type ScanCallbacks = Partial<Record<TargetsName, () => void>> & {
  default: (target?: TargetsName) => void | null | false
}
export type ScanParams = {
  wrongPlaceLabel?: string
  goToLabel?: string
  overlay?: ReactNode
  callbacks: ScanCallbacks
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
  const { params, hide } = useScan()
  const [current, setCurrent] = useState<CurrentScanState>({
    id: null,
    type: null,
    name: null,
  })
  const [isWrong, setIsWrong] = useState<string>()

  const setSafeCurrent = useCallback(
    (payload: CurrentScanState) => {
      if (params && payload.name && params.callbacks[payload.name]) {
        setCurrent(payload)
      }
    },
    [params],
  )

  const reset = useCallback(() => {
    setIsWrong(undefined)
    setCurrent({
      id: null,
      type: null,
      name: null,
    })
  }, [])

  const onSubmit = useCallback(() => {
    if (!params || !current.name) return
    const cb = params.callbacks[current.name]
    const res = cb ? cb() : params.callbacks.default(current.name)
    res === false ? setIsWrong(params.wrongPlaceLabel) : reset()
  }, [current.id, params, reset])

  const onClosePress = useCallback(() => {
    hide()
    reset()
  }, [hide, reset])

  if (!params) return null
  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'black' }]} />
      <SafeAreaView style={[StyleSheet.absoluteFill, styles.safeView]}>
        <RoundedButton style={styles.close} onPress={onClosePress}>
          <CrossIcon />
        </RoundedButton>
        {isWrong && (
          <NotificationBox style={styles.notification}>
            Mh, je crois que ce n’était pas ce lieu que je voulais voir
          </NotificationBox>
        )}
        {current.name && !isWrong && (
          <LargeButton
            theme="secondary"
            style={styles.button}
            onPress={onSubmit}>
            {params.goToLabel
              ? params.goToLabel + ' ' + t(current.name)
              : capitalizeFirstLetter(t(current.name))}
          </LargeButton>
        )}
        {isWrong && (
          <LargeButton theme="secondary" style={styles.button} onPress={reset}>
            {capitalizeFirstLetter(t('scan_again'))}
          </LargeButton>
        )}
      </SafeAreaView>
      {params.overlay && (
        <View style={[StyleSheet.absoluteFill, styles.overlay]}>
          {params.overlay}
        </View>
      )}
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
    zIndex: 900,
    width: '100%',
    height: '100%',
  },
  safeView: {
    zIndex: 2,
    justifyContent: 'space-between',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
