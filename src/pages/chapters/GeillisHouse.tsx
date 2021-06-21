import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'
import { useMainSound } from '@/App/MainSoundProvider'

import store, {
  isCompleted,
  ASSETS,
  GeillisHouseStore,
  CORRECTS,
} from '@/controllers/geillis_house'

import DrugIcon from '@/assets/pictograms/drug.svg'

import Card from '@/components/Card'
import InnerSelectors, {
  InnerSelectorsRef,
} from '@/components/Card/inner/InnerSelectors'
import InnerCarousel, {
  InnerCarouselRef,
} from '@/components/Card/inner/InnerCarousel'
import WebPImage from '@/components/shared/WebPImage'

import ChapterLayout from '@/layouts/ChapterLayout'

import useChapterAnswers from '@/hooks/useChapterAnswers'
import { FlippableSide } from '@/hooks/useFlippable'

import theme from '@/styles/theme'

import subtitles from '@/assets/videos/subtitles.json'

export interface ChapterGeillisHouseProps {}
type ChapterGeillisHousePropsWithNavigation = ChapterGeillisHouseProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:GeillisHouse'>
}

export default function ChapterGeillisHouse({
  navigation,
}: ChapterGeillisHousePropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()
  const { setParams: setMainSound } = useMainSound()

  const caresCardSeatonSelectorRef = useRef<InnerSelectorsRef | null>()
  const caresCardRevealedSelectorRef = useRef<InnerSelectorsRef | null>()
  const activityCardSelectorRef = useRef<InnerSelectorsRef | null>()
  const torturesCarouselRef = useRef<InnerCarouselRef | null>()

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

  useEffect(() => {
    setMainSound({
      source: require('@/assets/musics/geillis_house_loop.mp3'),
      options: {
        autoPlay: true,
        fadeIn: 1000,
        delay: 200,
        fadeOut: 500,
        loop: true,
      },
    })
  }, [])

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
      hdr={require('@/assets/images/hdr-4k.png')}
      video={require('@/assets/videos/geillis_house_video.mp4')}
      dialogProps={{
        source: require('@/assets/images/backgrounds/geillis_house.jpg'),
        name: t('agnes'),
        dialogs: subtitles.geillis_house,
        sound: require('@/assets/audios/geillis_house.mp3'),
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
        titleColor: theme.colors.darkTan,
        colors: ['#FFE5E3', '#FFF0EF', '#fff'],
        button: t('geillis_summary_summary_success'),
        onPress: () => {
          navigation.navigate('Conclusion:End', {})
          setTimeout(() => hide())
        },
        contentLabelBackgroundColor: theme.colors.darkTan,
        content: [
          {
            text: t('geillis_summary_1_text'),
            label: t('geillis_summary_1_label'),
          },
          {
            text: t('geillis_summary_2_text'),
            label: t('geillis_summary_2_label'),
          },
          {
            text: t('geillis_summary_3_text'),
            label: t('geillis_summary_3_label'),
          },
          {
            text: t('geillis_summary_4_text'),
            label: t('geillis_summary_4_label'),
          },
        ],
      }}
      wrongProps={{
        audio: require('@/assets/audios/geillis_house_failed.mp3'),
        button: {
          children: t('edit_cards'),
          onPress: () => swapAnswers(),
        },
      }}
      data={[
        {
          complete: [caresSeatonCompleted, caresRevealedCompleted],
          side: caresCardFlip,
          front: (
            <Card
              revert
              onPress={() => caresCardSeatonSelectorRef.current?.collapse()}
              onFlipPress={() => setCaresCardFlip('back')}
              number={4}
              color="pink"
              title={[
                t('cares_seaton_title_line_1'),
                t('cares_seaton_title_line_2'),
              ]}
              forceBottom={false}
              bottom={t('cares_label')}
              inner={
                <InnerSelectors
                  ref={(el) => (caresCardSeatonSelectorRef.current = el)}
                  type="equation"
                  keyboardLabel={t('cares_label')}
                  onSelectedChange={(payload) => {
                    setAnswers({
                      cares_seaton: payload as GeillisHouseStore['cares_seaton'],
                    })
                    setCaresCardFlip('back')
                  }}
                  initial={answers.cares_seaton}
                  plusColor={theme.colors.cornflowerLilac}
                  equalColor={theme.colors.peachSchnapps}
                  result={<DrugIcon />}
                  items={[keyboardCares, keyboardCares]}
                />
              }
            />
          ),
          back: (
            <Card
              onPress={() => caresCardRevealedSelectorRef.current?.collapse()}
              onFlipPress={() => setCaresCardFlip('front')}
              number={4}
              color="pink"
              title={[
                t('cares_revealed_title_line_1'),
                t('cares_revealed_title_line_2'),
              ]}
              forceBottom={false}
              bottom={t('cares_label')}
              inner={
                <InnerSelectors
                  ref={(el) => (caresCardRevealedSelectorRef.current = el)}
                  type="equation"
                  keyboardLabel={t('cares_label')}
                  onSelectedChange={(payload) => {
                    setAnswers({
                      cares_revealed: payload as GeillisHouseStore['cares_revealed'],
                    })
                    setCaresCardFlip('front')
                  }}
                  initial={answers.cares_revealed}
                  plusColor={theme.colors.peachSchnapps}
                  equalColor={theme.colors.peachSchnapps}
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
              onPress={() => activityCardSelectorRef.current?.collapse()}
              title={[t('activity_title_line_1'), t('activity_title_line_2')]}
              forceBottom={false}
              bottom={t('activity_label')}
              inner={
                <InnerSelectors
                  ref={(el) => (activityCardSelectorRef.current = el)}
                  type="single"
                  keyboardLabel={t('activity_label')}
                  onSelectedChange={(payload) => {
                    setAnswers({
                      activity: payload as GeillisHouseStore['activity'],
                    })
                  }}
                  initial={answers.torture}
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
              bottom={t('torture_label')}
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
