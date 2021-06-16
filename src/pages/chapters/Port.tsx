import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Image } from 'react-native'
import { NavigationProp } from '@react-navigation/core'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'

import store, { ASSETS, PortStore, CORRECTS } from '@/controllers/port'

import SunkenShip from '@/assets/pictograms/sunken_ship.svg'

import Card from '@/components/Card'

import useChapterAnswers from '@/hooks/useChapterAnswers'
import ChapterLayout from '@/layouts/ChapterLayout'
import InnerSelectors from '@/components/Card/inner/InnerSelectors'

import { FlippableSide } from '@/hooks/useFlippable'

export interface ChapterPortProps {}
type ChapterPortPropsWithNavigation = ChapterPortProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Port'>
}

export default function ChapterPort({
  navigation,
}: ChapterPortPropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()

  const {
    answers,
    results,
    setAnswers,
    swapAnswers,
  } = useChapterAnswers<PortStore>({
    store,
    corrects: CORRECTS,
    isComplete: () => false,
    reset: {
      cat_king: [null, null],
      cat_revealed: [null, null],
      demons_king: [null, null],
      demons_revealed: [null, null],
    },
  })

  const [isCollapsed, setIsCollapsed] = useState(true)
  const [index, setIndex] = useState(0)
  const [boatFlip, setBoatFlip] = useState<FlippableSide>('front')

  const keyboard = ASSETS.icons.map(({ name, component: C }) => ({
    name,
    icon: <C />,
  }))

  return (
    <ChapterLayout
      color="blue"
      videoProps={{
        name: t('agnes'),
        source: require('@/assets/tmp/storm.mp4'),
        dialogs: require('@/assets/tmp/videos/out.json'),
      }}
      completed={results ? (results === true ? 'right' : 'wrong') : undefined}
      index={index}
      collapsed={isCollapsed}
      onIndexChange={setIndex}
      onCollapsed={setIsCollapsed}
      onScanButtonPress={() => {}}
      successSummaryProps={{
        titleColor: '#000848',
        colors: ['#ffe5e3', '#E0E9FF'],
        button: 'Explorer le lieu suivant',
        onPress: () => console.log('OPEN CAMERA'),
        content: [
          {
            text:
              "Selon le Roi, l'incident du Falcon of Leith aurait été dû à un sort provoquant",
            label: "L'Invocation de Démons",
          },
          {
            text: 'En réalité, ce bateau a failli couler à cause de',
            label: 'Marins Éméchés',
          },
          {
            text:
              'Selon le Roi, le James Royall aurait fait naufrage suite à un sort impliquant',
            label: 'Un Chat et des Os',
          },
          {
            text: "En réalité, ce navire chavira lors d'une",
            label: 'Forte Tempête',
          },
        ],
      }}
      wrongButtonProps={{
        children: 'Modifier mes cartes',
        onPress: () => swapAnswers(),
      }}
      data={[
        {
          complete: false,
          side: boatFlip,
          front: (
            <Card
              revert
              onFlipPress={() => setBoatFlip('back')}
              number={2}
              color="blue"
              title={["L'Histoire", 'Selon le Roi']}
              forceBottom={false}
              bottom={'James Royall'}
              inner={
                <InnerSelectors
                  type="equation"
                  keyboardLabel="Falcon of Leith"
                  plusColor="#A2BDFF"
                  equalColor="#C5D5FF"
                  result={<SunkenShip />}
                  items={[keyboard, keyboard]}
                />
              }
            />
          ),
          back: (
            <Card
              onFlipPress={() => setBoatFlip('front')}
              number={2}
              color="blue"
              title={["L'Histoire", 'Selon le Roi']}
              forceBottom={false}
              bottom={'James Royall'}
              inner={
                <InnerSelectors
                  type="equation"
                  keyboardLabel="Falcon of Leith"
                  plusColor="#C5D5FF"
                  equalColor="#C5D5FF"
                  result={<SunkenShip />}
                  items={[keyboard, keyboard]}
                />
              }
            />
          ),
        },
      ]}
    />
  )
}
