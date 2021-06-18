import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, View } from 'react-native'
import { NavigationProp } from '@react-navigation/core'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'

import store, { ASSETS, PortStore, CORRECTS } from '@/controllers/port'

import SunkenShipIcon from '@/assets/pictograms/sunken_ship.svg'
import DeathIcon from '@/assets/pictograms/death.svg'

import Card from '@/components/Card'
import InnerSelectors, {
  InnerSelectorsRef,
} from '@/components/Card/inner/InnerSelectors'

import ChapterLayout from '@/layouts/ChapterLayout'

import useChapterAnswers from '@/hooks/useChapterAnswers'
import { FlippableSide } from '@/hooks/useFlippable'

import theme from '@/styles/theme'

export interface ChapterPortProps {}
type ChapterPortPropsWithNavigation = ChapterPortProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Port'>
}

export default function ChapterPort({
  navigation,
}: ChapterPortPropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()

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

  if (catInteraction) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="CLOSE CAT"
          onPress={() => {
            setCatInteraction(false)
            setIndex(1)
            setIsCollapsed(false)
          }}
        />
      </View>
    )
  }

  if (demonsInteraction) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="CLOSE DEMONS"
          onPress={() => {
            setDemonsInteraction(false)
            setIndex(0)
            setIsCollapsed(false)
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
            place_falcon_of_leith: () => {
              setDemonsInteraction(true)
              hide()
            },
            place_james_royall: () => {
              setCatInteraction(true)
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
                hide()
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
      wrongButtonProps={{
        children: t('edit_cards'),
        onPress: () => swapAnswers(),
      }}
      data={[
        {
          complete: [catCardKingComplete, catCardRevealedComplete],
          side: catCardFlip,
          front: (
            <Card
              revert
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
              bottom={t('james_royall_label')}
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
              onFlipPress={() => setCatCardFlip('front')}
              number={2}
              color="blue"
              title={
                catInteractionShowedRef.current
                  ? t('port_title_revealed')
                  : undefined
              }
              text={
                catInteractionShowedRef.current
                  ? undefined
                  : t('missing_informations')
              }
              forceBottom={!catInteractionShowedRef.current}
              bottom={t('james_royall_label')}
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
        {
          complete: [demonsCardKingComplete, demonsCardRevealedComplete],
          side: demonsCardFlip,
          front: (
            <Card
              revert
              onFlipPress={() => setDemonsCardFlip('back')}
              number={2}
              color="blue"
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
              bottom={t('falcon_of_leith_label')}
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
              title={
                demonsInteractionShowedRef.current
                  ? t('port_title_revealed')
                  : undefined
              }
              text={
                demonsInteractionShowedRef.current
                  ? undefined
                  : t('missing_informations')
              }
              forceBottom={!demonsInteractionShowedRef.current}
              bottom={t('falcon_of_leith_label')}
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
      ]}
    />
  )
}
