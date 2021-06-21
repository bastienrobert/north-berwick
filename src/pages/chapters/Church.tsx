import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, View } from 'react-native'
import { NavigationProp } from '@react-navigation/core'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'
import { useMainSound } from '@/App/MainSoundProvider'

import store, {
  isCompleted,
  ASSETS,
  ChurchStore,
  CORRECTS,
} from '@/controllers/church'

import Card from '@/components/Card'
import InnerSelectors, {
  InnerSelectorsRef,
} from '@/components/Card/inner/InnerSelectors'
import { FamilyItems } from '@/components/Card/inner/InnerSelectors/FamilySelector'
// import VideoDialogBox from '@/components/BackgroundWithDialog/DialogBox'

import ChapterLayout from '@/layouts/ChapterLayout'

import useChapterAnswers from '@/hooks/useChapterAnswers'

import theme from '@/styles/theme'

import subtitles from '@/assets/videos/subtitles.json'

export interface ChapterChurchProps {}
type ChapterChurchPropsWithNavigation = ChapterChurchProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Church'>
}

export default function ChapterChurch({
  navigation,
}: ChapterChurchPropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()
  const { setParams: setMainSound } = useMainSound()

  const introducedRef = useRef(false)
  const mortarInteractionShowedRef = useRef(false)
  const familyCardSelectorRef = useRef<InnerSelectorsRef | null>()
  const jobCardSelectorRef = useRef<InnerSelectorsRef | null>()

  const {
    answers,
    results,
    setAnswers,
    swapAnswers,
  } = useChapterAnswers<ChurchStore>({
    store,
    corrects: CORRECTS,
    isComplete: (store) => {
      return Object.values(isCompleted(store)).every((s) => s === true)
    },
    reset: {
      job: null,
      parent: null,
      children: [null, null, null],
    },
  })

  const [isCollapsed, setIsCollapsed] = useState(true)
  const [index, setIndex] = useState(0)
  const [familyInteractionShowed, setFamilyInteractionShowed] = useState(false)
  const [introductionEnd, setIntroductionEnd] = useState(false)
  const [mortarInteraction, setMortarInteraction] = useState(false)

  const keyboardJob = ASSETS.icons.map(({ name, component: C }) => ({
    name,
    icon: <C />,
  }))

  useEffect(() => {
    setMainSound({
      source: require('@/assets/musics/church_loop.mp3'),
      options: {
        autoPlay: true,
        fadeIn: 1000,
        delay: 200,
        fadeOut: 500,
        loop: true,
      },
    })
  }, [])

  const collapseSelectors = useCallback(() => {
    familyCardSelectorRef.current?.collapse()
    jobCardSelectorRef.current?.collapse()
  }, [familyCardSelectorRef, jobCardSelectorRef])

  useEffect(() => {
    collapseSelectors()
  }, [index])

  useEffect(() => {
    if (mortarInteraction) {
      mortarInteractionShowedRef.current = true
    }
  }, [mortarInteraction])

  useEffect(() => {
    if (familyInteractionShowed) {
      setIndex(1)
      setIsCollapsed(false)
    }
  }, [familyInteractionShowed])

  const { job: jobComplete, family: familyComplete } = useMemo(() => {
    return isCompleted(answers)
  }, [answers])

  const showDialog = introductionEnd && !mortarInteractionShowedRef.current

  // if (mortarInteraction) {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Button
  //         title="CLOSE MORTAR"
  //         onPress={() => {
  //           setMortarInteraction(false)
  //           setIndex(0)
  //           setIsCollapsed(false)
  //         }}
  //       />
  //     </View>
  //   )
  // }

  return (
    <View style={{ flex: 1 }}>
      {/* {showDialog && (
        <VideoDialogBox
          name={t('agnes')}
          activeOpacity={0.9}
          style={{
            position: 'absolute',
            paddingHorizontal: 30,
            bottom: 42,
            width: '100%',
            zIndex: 2,
          }}
          content="OPEN MORTAR"
          onPress={() => setMortarInteraction(true)}
        />
      )} */}
      <ChapterLayout
        color="purple"
        pointerEvents={showDialog ? 'none' : 'auto'}
        // reveal={mortarInteractionShowedRef.current}
        introduction={!introducedRef.current}
        onIntroductionEnd={() => {
          introducedRef.current = true
          setTimeout(() => setIntroductionEnd(true), 1000)
        }}
        video={require('@/assets/videos/church_video.mp4')}
        dialogProps={{
          source: require('@/assets/images/backgrounds/church.jpg'),
          name: t('agnes'),
          dialogs: subtitles.church,
          sound: require('@/assets/audios/church.mp3'),
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
            forceLabel: t('church_scan_label'),
            callbacks: {
              default: () => false,
              place_cemetery: () => {
                setFamilyInteractionShowed(true)
                hide()
              },
            },
          })
        }}
        successSummaryProps={{
          titleColor: theme.colors.tolopoea,
          colors: ['#E1D7FF', '#fff'],
          button: t('next_place'),
          onPress: () =>
            set({
              callbacks: {
                default: () => false,
                map_geillis: () => {
                  navigation.navigate('Chapter:GeillisHouse', {})
                  setTimeout(() => hide())
                },
              },
            }),
          contentLabelBackgroundColor: theme.colors.tolopoea,
          content: [
            {
              text: t('church_summary_1_text'),
              label: t('church_summary_1_label'),
            },
            {
              text: t('church_summary_2_text'),
              label: t('church_summary_2_label'),
            },
          ],
        }}
        wrongProps={{
          audio: require('@/assets/audios/church_failed.mp3'),
          button: {
            children: t('edit_cards'),
            onPress: () => swapAnswers(),
          },
        }}
        data={[
          {
            complete: jobComplete,
            front: (
              <Card
                number={3}
                color="purple"
                onPress={() => jobCardSelectorRef.current?.collapse()}
                title={[t('job_title_line_1'), t('job_title_line_2')]}
                forceBottom={false}
                bottom={t('job_label')}
                inner={
                  <InnerSelectors
                    ref={(el) => (jobCardSelectorRef.current = el)}
                    type="single"
                    initial={answers.job}
                    keyboardLabel={t('job_label')}
                    onSelectedChange={(payload) => {
                      setAnswers({
                        job: payload as ChurchStore['job'],
                      })
                    }}
                    items={keyboardJob}
                  />
                }
              />
            ),
          },
          {
            complete: familyComplete,
            front: (
              <Card
                number={3}
                color="purple"
                onPress={() => familyCardSelectorRef.current?.collapse()}
                title={
                  familyInteractionShowed
                    ? [t('family_title_line_1'), t('family_title_line_2')]
                    : undefined
                }
                text={
                  familyInteractionShowed
                    ? undefined
                    : t('missing_informations')
                }
                forceBottom={!familyInteractionShowed}
                bottom={t('family_label')}
                inner={
                  familyInteractionShowed ? (
                    <InnerSelectors
                      ref={(el) => (familyCardSelectorRef.current = el)}
                      type="family"
                      main={t('agnes')}
                      initial={answers}
                      keyboardLabel={t('family_label')}
                      onSelectedChange={(payload) => {
                        setAnswers({
                          parent: payload.parent as ChurchStore['parent'],
                          children: payload.children as ChurchStore['children'],
                        })
                      }}
                      items={ASSETS.families as FamilyItems}
                    />
                  ) : null
                }
              />
            ),
          },
        ]}
      />
    </View>
  )
}
