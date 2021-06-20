import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { NavigationProp } from '@react-navigation/core'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'
import { useMainSound } from '@/App/MainSoundProvider'

import store, { ASSETS, PortStore, CORRECTS } from '@/controllers/port'

import SunkenShipIcon from '@/assets/pictograms/sunken_ship.svg'
import DeathIcon from '@/assets/pictograms/death.svg'

import Card from '@/components/Card'
import InnerSelectors, {
  InnerSelectorsRef,
} from '@/components/Card/inner/InnerSelectors'
import BoatDemons from '@/components/BoatDemons'
import BoatCat from '@/components/BoatCat'

import ChapterLayout from '@/layouts/ChapterLayout'

import useChapterAnswers from '@/hooks/useChapterAnswers'
import { FlippableSide } from '@/hooks/useFlippable'

import theme from '@/styles/theme'

import subtitles from '@/assets/videos/subtitles.json'

export interface ChapterPortProps {}
type ChapterPortPropsWithNavigation = ChapterPortProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Port'>
}

export default function ChapterPort({
  navigation,
}: ChapterPortPropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()
  const { setParams: setMainSound } = useMainSound()

  const introducedRef = useRef(false)
  const demonsInteractionShowedRef = useRef(false)
  const catInteractionShowedRef = useRef(false)
  const catCardKingSelectorRef = useRef<InnerSelectorsRef | null>()
  const catCardRevealedSelectorRef = useRef<InnerSelectorsRef | null>()
  const demonsCardKingSelectorRef = useRef<InnerSelectorsRef | null>()
  const demonsCardRevealedSelectorRef = useRef<InnerSelectorsRef | null>()

  const isCompleted = useCallback(
    ({ cat_revealed, cat_king, demons_revealed, demons_king }: PortStore) => {
      return {
        cat_revealed: cat_revealed[0] !== null && cat_revealed[1] !== null,
        cat_king: cat_king[0] !== null && cat_king[1] !== null,
        demons_revealed:
          demons_revealed[0] !== null && demons_revealed[1] !== null,
        demons_king: demons_king[0] !== null && demons_king[1] !== null,
      }
    },
    [],
  )

  const {
    answers,
    results,
    setAnswers,
    swapAnswers,
  } = useChapterAnswers<PortStore>({
    store,
    corrects: CORRECTS,
    isComplete: (store) => {
      return Object.values(isCompleted(store)).every((s) => s === true)
    },
    reset: {
      cat_king: [null, null],
      cat_revealed: [null, null],
      demons_king: [null, null],
      demons_revealed: [null, null],
    },
  })

  const [isCollapsed, setIsCollapsed] = useState(true)
  const [index, setIndex] = useState(0)
  const [demonsInteraction, setDemonsInteraction] = useState(false)
  const [catInteraction, setCatInteraction] = useState(false)
  const [catCardFlip, setCatCardFlip] = useState<FlippableSide>('front')
  const [demonsCardFlip, setDemonsCardFlip] = useState<FlippableSide>('front')

  const keyboard = ASSETS.icons.map(({ name, component: C }) => ({
    name,
    icon: <C />,
  }))

  const collapseSelectors = useCallback(() => {
    catCardKingSelectorRef.current?.collapse()
    catCardRevealedSelectorRef.current?.collapse()
    demonsCardKingSelectorRef.current?.collapse()
    demonsCardRevealedSelectorRef.current?.collapse()
  }, [
    catCardKingSelectorRef,
    catCardRevealedSelectorRef,
    demonsCardKingSelectorRef,
    demonsCardRevealedSelectorRef,
  ])

  useEffect(() => {
    if (!results) {
      setCatCardFlip('front')
      setDemonsCardFlip('front')
    }
  }, [results])

  useEffect(() => {
    collapseSelectors()
  }, [index])

  useEffect(() => {
    if (catInteraction) {
      catInteractionShowedRef.current = true
    }
  }, [catInteraction])

  useEffect(() => {
    if (demonsInteraction) {
      demonsInteractionShowedRef.current = true
    }
  }, [demonsInteraction])

  const {
    cat_revealed: catCardRevealedComplete,
    cat_king: catCardKingComplete,
    demons_revealed: demonsCardRevealedComplete,
    demons_king: demonsCardKingComplete,
  } = useMemo(() => {
    return isCompleted(answers)
  }, [answers])

  useEffect(() => {
    setMainSound({
      source: require('@/assets/musics/port_loop.mp3'),
      options: {
        autoPlay: true,
        fadeIn: 2000,
        fadeOut: 2000,
        loop: true,
      },
    })
  }, [])

  if (catInteraction) {
    return (
      <View style={{ flex: 1 }}>
        <BoatCat
          onEnd={() => {
            setIsCollapsed(false)
            setIndex(1)
            setCatInteraction(false)
          }}
        />
      </View>
    )
  }

  if (demonsInteraction) {
    return (
      <View style={{ flex: 1 }}>
        <BoatDemons
          onEnd={() => {
            setIsCollapsed(false)
            setIndex(0)
            setDemonsInteraction(false)
          }}
        />
      </View>
    )
  }

  return (
    <ChapterLayout
      color="blue"
      introduction={!introducedRef.current}
      onIntroductionEnd={() => (introducedRef.current = true)}
      video={require('@/assets/videos/port_video.mp4')}
      dialogProps={{
        source: require('@/assets/images/backgrounds/port.jpg'),
        name: t('agnes'),
        dialogs: subtitles.port,
        sound: require('@/assets/audios/port.mp3'),
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
            place_falcon_of_leith: () => {
              setCatInteraction(true)
              hide()
            },
            place_james_royall: () => {
              setDemonsInteraction(true)
              hide()
            },
          },
        })
      }}
      successSummaryProps={{
        titleColor: theme.colors.stratos,
        colors: ['#E0E9FF', '#fff'],
        button: t('next_place'),
        onPress: () =>
          set({
            callbacks: {
              default: () => false,
              map_church: () => {
                navigation.navigate('Chapter:Church', {})
                setTimeout(() => hide())
              },
            },
          }),
        contentLabelBackgroundColor: theme.colors.stratos,
        content: [
          {
            text: t('port_summary_1_text'),
            label: t('port_summary_1_label'),
          },
          {
            text: t('port_summary_2_text'),
            label: t('port_summary_2_label'),
          },
          {
            text: t('port_summary_3_text'),
            label: t('port_summary_3_label'),
          },
          {
            text: t('port_summary_4_text'),
            label: t('port_summary_4_label'),
          },
        ],
      }}
      wrongProps={{
        audio: require('@/assets/audios/port_failed.mp3'),
        button: {
          children: t('edit_cards'),
          onPress: () => swapAnswers(),
        },
      }}
      data={[
        {
          complete: [demonsCardKingComplete, demonsCardRevealedComplete],
          side: demonsCardFlip,
          front: (
            <Card
              revert
              onFlipPress={() => setDemonsCardFlip('back')}
              number={2}
              color="blue"
              onPress={() => demonsCardKingSelectorRef.current?.collapse()}
              title={
                demonsInteractionShowedRef.current
                  ? [t('port_title_king_line_1'), t('port_title_king_line_2')]
                  : undefined
              }
              text={
                demonsInteractionShowedRef.current
                  ? undefined
                  : t('missing_informations')
              }
              forceBottom={!demonsInteractionShowedRef.current}
              bottom={t('james_royall_label')}
              inner={
                demonsInteractionShowedRef.current ? (
                  <InnerSelectors
                    ref={(el) => (demonsCardKingSelectorRef.current = el)}
                    type="equation"
                    initial={answers.demons_king}
                    keyboardLabel="Falcon of Leith"
                    onSelectedChange={(payload) => {
                      setAnswers({
                        demons_king: payload as PortStore['demons_king'],
                      })
                      setDemonsCardFlip('back')
                    }}
                    plusColor={theme.colors.anakiwa}
                    equalColor={theme.colors.periwinkle}
                    result={<SunkenShipIcon />}
                    items={[keyboard, keyboard]}
                  />
                ) : null
              }
            />
          ),
          back: (
            <Card
              onFlipPress={() => setDemonsCardFlip('front')}
              number={2}
              color="blue"
              onPress={() => demonsCardRevealedSelectorRef.current?.collapse()}
              title={
                demonsInteractionShowedRef.current
                  ? [t('port_title_revealed')]
                  : undefined
              }
              text={
                demonsInteractionShowedRef.current
                  ? undefined
                  : t('missing_informations')
              }
              forceBottom={!demonsInteractionShowedRef.current}
              bottom={t('james_royall_label')}
              inner={
                demonsInteractionShowedRef.current ? (
                  <InnerSelectors
                    ref={(el) => (demonsCardRevealedSelectorRef.current = el)}
                    type="equation"
                    initial={answers.demons_revealed}
                    keyboardLabel="Falcon of Leith"
                    onSelectedChange={(payload) => {
                      setAnswers({
                        demons_revealed: payload as PortStore['demons_revealed'],
                      })
                      setDemonsCardFlip('front')
                    }}
                    plusColor={theme.colors.periwinkle}
                    equalColor={theme.colors.periwinkle}
                    result={<SunkenShipIcon />}
                    items={[keyboard, keyboard]}
                  />
                ) : null
              }
            />
          ),
        },
        {
          complete: [catCardKingComplete, catCardRevealedComplete],
          side: catCardFlip,
          front: (
            <Card
              revert
              onPress={() => catCardKingSelectorRef.current?.collapse()}
              onFlipPress={() => setCatCardFlip('back')}
              number={2}
              color="blue"
              title={
                catInteractionShowedRef.current
                  ? [t('port_title_king_line_1'), t('port_title_king_line_2')]
                  : undefined
              }
              text={
                catInteractionShowedRef.current
                  ? undefined
                  : t('missing_informations')
              }
              forceBottom={!catInteractionShowedRef.current}
              bottom={t('falcon_of_leith_label')}
              inner={
                catInteractionShowedRef.current ? (
                  <InnerSelectors
                    ref={(el) => (catCardKingSelectorRef.current = el)}
                    type="equation"
                    initial={answers.cat_king}
                    keyboardLabel="Falcon of Leith"
                    onSelectedChange={(payload) => {
                      setAnswers({ cat_king: payload as PortStore['cat_king'] })
                      setCatCardFlip('back')
                    }}
                    plusColor={theme.colors.anakiwa}
                    equalColor={theme.colors.periwinkle}
                    result={<DeathIcon />}
                    items={[keyboard, keyboard]}
                  />
                ) : null
              }
            />
          ),
          back: (
            <Card
              number={2}
              color="blue"
              onFlipPress={() => setCatCardFlip('front')}
              onPress={() => catCardRevealedSelectorRef.current?.collapse()}
              title={
                catInteractionShowedRef.current
                  ? [t('port_title_revealed')]
                  : undefined
              }
              text={
                catInteractionShowedRef.current
                  ? undefined
                  : t('missing_informations')
              }
              forceBottom={!catInteractionShowedRef.current}
              bottom={t('falcon_of_leith_label')}
              inner={
                catInteractionShowedRef.current ? (
                  <InnerSelectors
                    ref={(el) => (catCardRevealedSelectorRef.current = el)}
                    type="equation"
                    initial={answers.cat_revealed}
                    keyboardLabel="Falcon of Leith"
                    onSelectedChange={(payload) => {
                      setAnswers({
                        cat_revealed: payload as PortStore['cat_revealed'],
                      })
                      setCatCardFlip('front')
                    }}
                    plusColor={theme.colors.periwinkle}
                    equalColor={theme.colors.periwinkle}
                    result={<DeathIcon />}
                    items={[keyboard, keyboard]}
                  />
                ) : null
              }
            />
          ),
        },
      ]}
    />
  )
}
