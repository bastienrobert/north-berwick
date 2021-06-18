import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image } from 'react-native'
import { NavigationProp } from '@react-navigation/core'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'

import store, { ASSETS, CastleStore, CORRECTS } from '@/controllers/castle'

import Card from '@/components/Card'
import InnerCarousel, {
  InnerCarouselRef,
} from '@/components/Card/inner/InnerCarousel'
import InnerPoster from '@/components/Card/inner/InnerPoster'
import InnerImage from '@/components/Card/inner/InnerImage'
import Poster from '@/components/Poster'
import WebPImage from '@/components/shared/WebPImage'

import useChapterAnswers from '@/hooks/useChapterAnswers'

import ChapterLayout from '@/layouts/ChapterLayout'
import theme from '@/styles/theme'

export interface ChapterCastleProps {}
type ChapterCastlePropsWithNavigation = ChapterCastleProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Castle'>
}

function PortraitOverlay() {
  return (
    <Image
      style={{
        flex: 1,
        opacity: 0.4,
        width: '60%',
        maxWidth: 420,
      }}
      resizeMode="contain"
      source={require('@/assets/images/portraits/agnes_sampson.png')}
    />
  )
}

export default function ChapterCastle({
  navigation,
}: ChapterCastlePropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()

  const {
    answers,
    results,
    setAnswers,
    swapAnswers,
  } = useChapterAnswers<CastleStore>({
    store,
    corrects: CORRECTS,
    reset: {
      portrait: null,
      torture: null,
      poster: false,
    },
  })

  const [isCollapsed, setIsCollapsed] = useState(true)
  const [index, setIndex] = useState(0)
  const [showPoster, setShowPoster] = useState(false)

  const torturesCarouselRef = useRef<InnerCarouselRef | null>()
  const isPosterCompletedRef = useRef(false)

  const torture = ASSETS.tortures.find((t) => answers.torture === t.name)
  const portrait = ASSETS.portraits.find((t) => answers.portrait === t.name)

  const setPortrait = useCallback(
    (portrait) => {
      if (!setAnswers({ portrait })) {
        setIndex(0)
        setIsCollapsed(false)
      }
      hide()
    },
    [setAnswers, hide],
  )
  const portraits_callbacks = useMemo(() => {
    return {
      portrait_agnes_sampson: () => setPortrait('agnes_sampson'),
      portrait_alanis_muir: () => setPortrait('alanis_muir'),
      portrait_euphame_maccalzean: () => setPortrait('euphame_maccalzean'),
      portrait_geillis_ducan: () => setPortrait('geillis_ducan'),
      portrait_john_cunningham: () => setPortrait('john_cunningham'),
      portrait_margaret_acheson: () => setPortrait('margaret_acheson'),
      portrait_robert_grierson: () => setPortrait('robert_grierson'),
      portrait_smith_du_pont_hallis: () => setPortrait('smith_du_pont_hallis'),
    }
  }, [setPortrait])

  const poster_callback = useCallback(() => {
    if (!answers.portrait) return false
    setShowPoster(true)
    setIndex(2)
    return true
  }, [answers, setShowPoster])

  useEffect(() => {
    if (answers.torture === null) {
      torturesCarouselRef.current?.reset()
    }
  }, [answers, torturesCarouselRef])

  return (
    <ChapterLayout
      color="red"
      videoProps={{
        source: require('@/assets/tmp/storm.mp4'),
        name: t('agnes'),
        dialogs: require('@/assets/tmp/videos/out.json'),
      }}
      completed={results ? (results === true ? 'right' : 'wrong') : undefined}
      index={index}
      collapsed={isCollapsed}
      onIndexChange={setIndex}
      onCollapse={setIsCollapsed}
      onScanButtonPress={() => {
        if (answers.portrait) {
          set({
            callbacks: {
              default: () => false,
              poster_first: poster_callback,
              poster_second: poster_callback,
            },
          })
        } else {
          set({
            callbacks: {
              default: () => null,
              ...portraits_callbacks,
            },
            wrongPlaceLabel: t('not_portrait'),
            goToLabel: '',
            overlay: <PortraitOverlay />,
          })
        }
      }}
      successSummaryProps={{
        titleColor: theme.colors.brownPod,
        colors: ['#ffe5e3', '#fff0ef', '#ffffff'],
        button: t('next_place'),
        onPress: () =>
          set({
            callbacks: {
              default: () => false,
              map_port: () => {
                navigation.navigate('Chapter:Port', {})
                hide()
              },
            },
          }),
        contentLabelBackgroundColor: theme.colors.brownPod,
        content: [
          {
            text: t('castle_summary_1_text'),
            label: t('castle_summary_1_label'),
          },
          {
            text: t('castle_summary_2_text'),
            label: t('castle_summary_2_label'),
          },
          {
            text: t('castle_summary_3_text'),
            label: t('castle_summary_3_label'),
          },
          {
            text: t('castle_summary_4_text'),
            label: t('castle_summary_4_label'),
          },
        ],
      }}
      wrongButtonProps={{
        children: t('edit_cards'),
        onPress: () => {
          swapAnswers()
        },
      }}
      data={[
        {
          complete: !!portrait,
          front: (
            <Card
              number={1}
              color="red"
              title={
                portrait
                  ? portrait.multiline
                    ? [
                        t(`portrait_${portrait.name}_line_1`),
                        t(`portrait_${portrait.name}_line_2`),
                      ]
                    : [t(`portrait_${portrait.name}`)]
                  : undefined
              }
              text={portrait ? undefined : t('missing_informations')}
              forceBottom={!portrait}
              bottom={t('ghost_label')}
              inner={
                portrait ? (
                  <InnerImage
                    editLabel={t('edit')}
                    onEditClick={() =>
                      set({
                        callbacks: {
                          default: () => undefined,
                          ...portraits_callbacks,
                        },
                        wrongPlaceLabel: t('not_portrait'),
                        goToLabel: '',
                        overlay: <PortraitOverlay />,
                      })
                    }
                    image={portrait.image}
                  />
                ) : null
              }
            />
          ),
        },
        {
          complete: !!torture,
          front: (
            <Card
              number={1}
              color="red"
              forceBottom={false}
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
        {
          complete: answers.poster ?? false,
          front: (
            <Card
              number={1}
              color="red"
              title={answers.poster ? [t('conviction')] : undefined}
              text={answers.poster ? undefined : t('missing_informations')}
              forceBottom={!answers.poster}
              bottom={t('punishment')}
              inner={
                showPoster || answers.poster ? (
                  <InnerPoster
                    width="60%"
                    aspectRatio={0.68}
                    visible={showPoster}
                    onLayout={() => hide()}
                    onBack={() => {
                      console.log('BACK', isPosterCompletedRef.current)
                      if (isPosterCompletedRef.current) {
                        if (!setAnswers({ poster: true })) {
                          setIsCollapsed(false)
                        }
                      } else {
                        setShowPoster(false)
                      }
                    }}
                    placeholder={
                      <Image
                        source={require('@/assets/images/poster/completed_large.jpg')}
                        resizeMode="cover"
                        style={{ width: '100%', flex: 1 }}
                      />
                    }>
                    <Poster
                      completed={!!answers.poster}
                      onComplete={() => {
                        console.log('COMPLETED')
                        isPosterCompletedRef.current = true
                      }}
                    />
                  </InnerPoster>
                ) : null
              }
            />
          ),
        },
      ]}
    />
  )
}
