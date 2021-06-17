import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'

import store, { ASSETS, ChurchStore, CORRECTS } from '@/controllers/church'

import Card from '@/components/Card'

import useChapterAnswers from '@/hooks/useChapterAnswers'
import ChapterLayout from '@/layouts/ChapterLayout'
import InnerSelectors, {
  InnerSelectorsRef,
} from '@/components/Card/inner/InnerSelectors'
import { FamilyItems } from '@/components/Card/inner/InnerSelectors/FamilySelector'

export interface ChapterChurchProps {}
type ChapterChurchPropsWithNavigation = ChapterChurchProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Church'>
}

export default function ChapterChurch({
  navigation,
}: ChapterChurchPropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()

  const introducedRef = useRef(false)
  const familyInteractionShowedRef = useRef(false)
  const familyCardSelectorRef = useRef<InnerSelectorsRef | null>()
  const jobCardSelectorRef = useRef<InnerSelectorsRef | null>()

  const isCompleted = useCallback(({ job, parent, children }: ChurchStore) => {
    return {
      job: job !== null,
      family: !!(parent && children[0] && children[1] && children[2]),
    }
  }, [])

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

  const keyboardJob = ASSETS.icons.map(({ name, component: C }) => ({
    name,
    icon: <C />,
  }))

  const collapseSelectors = useCallback(() => {
    familyCardSelectorRef.current?.collapse()
    jobCardSelectorRef.current?.collapse()
  }, [familyCardSelectorRef, jobCardSelectorRef])

  useEffect(() => {
    collapseSelectors()
  }, [index])

  const { job: jobComplete, family: familyComplete } = useMemo(() => {
    return isCompleted(answers)
  }, [answers])

  return (
    <ChapterLayout
      color="purple"
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
          complete: familyComplete,
          front: (
            <Card
              number={3}
              color="purple"
              title={
                familyInteractionShowedRef.current
                  ? ["L'Histoire", 'Selon le Roi']
                  : undefined
              }
              text={
                familyInteractionShowedRef.current
                  ? undefined
                  : t('missing_informations')
              }
              forceBottom={!familyInteractionShowedRef.current}
              bottom={'James Royall'}
              inner={
                familyInteractionShowedRef.current ? (
                  <InnerSelectors
                    ref={(el) => (familyCardSelectorRef.current = el)}
                    type="family"
                    main="Agnès"
                    initial={answers}
                    keyboardLabel="Falcon of Leith"
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
        {
          complete: jobComplete,
          front: (
            <Card
              number={3}
              color="purple"
              title={['Le métier réel', "d'Agnès"]}
              forceBottom={false}
              bottom={'Les liens'}
              inner={
                <InnerSelectors
                  ref={(el) => (jobCardSelectorRef.current = el)}
                  type="single"
                  keyboardLabel="Falcon of Leith"
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
      ]}
    />
  )
}
