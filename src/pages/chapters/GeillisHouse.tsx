import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'

import store, {
  ASSETS,
  GeillisHouseStore,
  CORRECTS,
} from '@/controllers/geillis_house'

import DrugIcon from '@/assets/pictograms/drug.svg'

import Card from '@/components/Card'
import InnerSelectors, {
  InnerSelectorsRef,
} from '@/components/Card/inner/InnerSelectors'

import ChapterLayout from '@/layouts/ChapterLayout'

import useChapterAnswers from '@/hooks/useChapterAnswers'
import { FlippableSide } from '@/hooks/useFlippable'
import InnerCarousel, {
  InnerCarouselRef,
} from '@/components/Card/inner/InnerCarousel'
import WebPImage from '@/components/shared/WebPImage'

export interface ChapterGeillisHouseProps {}
type ChapterGeillisHousePropsWithNavigation = ChapterGeillisHouseProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:GeillisHouse'>
}

export default function ChapterGeillisHouse({
  navigation,
}: ChapterGeillisHousePropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()

  const caresCardSeatonSelectorRef = useRef<InnerSelectorsRef | null>()
  const caresCardRevealedSelectorRef = useRef<InnerSelectorsRef | null>()
  const activityCardSelectorRef = useRef<InnerSelectorsRef | null>()
  const torturesCarouselRef = useRef<InnerCarouselRef | null>()

  const isCompleted = useCallback(
    ({
      cares_seaton,
      cares_revealed,
      activity,
      torture,
    }: GeillisHouseStore) => {
      return {
        cares_seaton: cares_seaton[0] !== null && cares_seaton[1] !== null,
        cares_revealed:
          cares_revealed[0] !== null && cares_revealed[1] !== null,
        activity: activity !== null,
        torture: torture !== null,
      }
    },
    [],
  )

  const {
    answers,
    results,
    setAnswers,
    swapAnswers,
  } = useChapterAnswers<GeillisHouseStore>({
    store,
    corrects: CORRECTS,
    isComplete: (store) => {
      return Object.values(isCompleted(store)).every((s) => s === true)
    },
    reset: {
      cares_seaton: [null, null],
      cares_revealed: [null, null],
      activity: null,
      torture: null,
    },
  })

  const [isCollapsed, setIsCollapsed] = useState(true)
  const [index, setIndex] = useState(0)
  const [caresCardFlip, setCaresCardFlip] = useState<FlippableSide>('front')

  const keyboardCares = ASSETS.cares.map(({ name, component: C }) => ({
    name,
    icon: <C />,
  }))
  const keyboardActivities = ASSETS.activities.map(
    ({ name, component: C }) => ({
      name,
      icon: <C />,
    }),
  )

  const collapseSelectors = useCallback(() => {
    caresCardSeatonSelectorRef.current?.collapse()
    caresCardRevealedSelectorRef.current?.collapse()
    activityCardSelectorRef.current?.collapse()
  }, [
    caresCardSeatonSelectorRef,
    caresCardRevealedSelectorRef,
    activityCardSelectorRef,
  ])

  useEffect(() => {
    collapseSelectors()
  }, [index])

  useEffect(() => {
    if (answers.torture === null) {
      torturesCarouselRef.current?.reset()
    }
  }, [answers, torturesCarouselRef])

  const {
    cares_seaton: caresSeatonCompleted,
    cares_revealed: caresRevealedCompleted,
    activity: activityCompleted,
    torture: tortureCompleted,
  } = useMemo(() => {
    return isCompleted(answers)
  }, [answers])

  const torture = ASSETS.tortures.find((t) => answers.torture === t.name)

  return (
    <ChapterLayout
      color="pink"
      videoProps={{
        name: t('agnes'),
        source: require('@/assets/tmp/storm.mp4'),
        dialogs: require('@/assets/tmp/videos/out.json'),
      }}
      completed={results ? (results === true ? 'right' : 'wrong') : undefined}
      index={index}
      collapsed={isCollapsed}
      onIndexChange={setIndex}
      onCollapse={setIsCollapsed}
      onCollapseStart={() => {
        collapseSelectors()
      }}
      onScanButtonPress={() => {
        set({
          callbacks: {
            default: () => false,
          },
        })
      }}
      successSummaryProps={{
        titleColor: '#250048',
        colors: ['#E1D7FF', '#fff'],
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
          complete: [caresSeatonCompleted, caresRevealedCompleted],
          side: caresCardFlip,
          front: (
            <Card
              revert
              onFlipPress={() => setCaresCardFlip('back')}
              number={4}
              color="pink"
              title={['Les guérisons', 'Selon Mr Seaton']}
              forceBottom={false}
              bottom={'James Royall'}
              inner={
                <InnerSelectors
                  ref={(el) => (caresCardSeatonSelectorRef.current = el)}
                  type="equation"
                  keyboardLabel="Falcon of Leith"
                  onSelectedChange={(payload) => {
                    setAnswers({
                      cares_seaton: payload as GeillisHouseStore['cares_seaton'],
                    })
                    setCaresCardFlip('back')
                  }}
                  plusColor="#FFADA7"
                  equalColor="#FFDAD7"
                  result={<DrugIcon />}
                  items={[keyboardCares, keyboardCares]}
                />
              }
            />
          ),
          back: (
            <Card
              onFlipPress={() => setCaresCardFlip('front')}
              number={4}
              color="pink"
              title={['Les guérisons', 'Révélées']}
              forceBottom={false}
              bottom={'James Royall'}
              inner={
                <InnerSelectors
                  ref={(el) => (caresCardRevealedSelectorRef.current = el)}
                  type="equation"
                  keyboardLabel="Falcon of Leith"
                  onSelectedChange={(payload) => {
                    setAnswers({
                      cares_revealed: payload as GeillisHouseStore['cares_revealed'],
                    })
                    setCaresCardFlip('back')
                  }}
                  plusColor="#FFDAD7"
                  equalColor="#FFDAD7"
                  result={<DrugIcon />}
                  items={[keyboardCares, keyboardCares]}
                />
              }
            />
          ),
        },
        {
          complete: activityCompleted,
          front: (
            <Card
              number={4}
              color="pink"
              title={["L'activité Nocturne", 'de Geillis']}
              forceBottom={false}
              bottom={'Les liens'}
              inner={
                <InnerSelectors
                  ref={(el) => (activityCardSelectorRef.current = el)}
                  type="single"
                  keyboardLabel="Falcon of Leith"
                  onSelectedChange={(payload) => {
                    setAnswers({
                      activity: payload as GeillisHouseStore['activity'],
                    })
                  }}
                  items={keyboardActivities}
                />
              }
            />
          ),
        },
        {
          complete: tortureCompleted,
          front: (
            <Card
              number={4}
              color="pink"
              title={
                torture
                  ? torture.multiline
                    ? [
                        t(torture.name + '_line_1'),
                        t(torture.name + '_line_2', { _: '' }),
                      ]
                    : [t(torture.name)]
                  : undefined
              }
              forceBottom={false}
              bottom={t('the_torture')}
              inner={
                <InnerCarousel
                  ref={(el) => (torturesCarouselRef.current = el)}
                  editLabel={t('edit')}
                  submitLabel={t('select')}
                  length={ASSETS.tortures.length}
                  content={ASSETS.tortures.map(({ image }, i) => (
                    <WebPImage
                      source={image}
                      style={{
                        marginTop: 20,
                        width: '90%',
                        aspectRatio: 1,
                      }}
                    />
                  ))}
                  onSelectedChange={(i) => {
                    setAnswers({
                      torture:
                        typeof i === 'number' ? ASSETS.tortures[i].name : null,
                    })
                  }}
                />
              }
            />
          ),
        },
      ]}
    />
  )
}
