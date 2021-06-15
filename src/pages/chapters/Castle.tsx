import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { NavigationProp } from '@react-navigation/core'
import { useAtom } from 'jotai'
import Video from 'react-native-video'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'

import store, { ASSETS, CORRECTS } from '@/controllers/castle'

import Card from '@/components/Card'
import InnerCarousel from '@/components/Card/inner/InnerCarousel'
import InnerPoster from '@/components/Card/inner/InnerPoster'
import InnerImage from '@/components/Card/inner/InnerImage'
import Poster from '@/components/Poster'
import ScanButton from '@/components/ScanButton'
import CardCarousel from '@/components/CardCarousel'
import Summary from '@/components/Summary'
import VideoSubtitleBox from '@/components/VideoWithSubtitles/VideoSubtitleBox'
import Fade from '@/components/shared/Fade'
import WebPImage from '@/components/shared/WebPImage'
import LargeButton from '@/components/shared/LargeButton'

import { Portal } from '@/lib/Portal'

import getResults from '@/utils/get-results'

export interface ChapterCastleProps {}
type ChapterCastlePropsWithNavigation = ChapterCastleProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Chapter:Castle'>
}

export default function ChapterCastle({
  navigation,
}: ChapterCastlePropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()
  const [answers, setAnswers] = useAtom(store)

  const [results, setResults] = useState<typeof answers | true>()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [index, setIndex] = useState(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showPoster, setShowPoster] = useState(false)

  const isPosterCompletedRef = useRef(false)
  const mainOpacity = useRef(new Animated.Value(1)).current
  const resultsOpacity = useRef(new Animated.Value(0)).current

  const torture = ASSETS.tortures.find((t) => answers.torture === t.name)
  const portrait = ASSETS.portraits.find((t) => answers.portrait === t.name)

  const setPortrait = useCallback((portrait) => {
    setAnswers((t) => ({ ...t, portrait }))
    setIndex(0)
    setIsCollapsed(false)
    hide()
  }, [])
  const portraits_callbacks = useMemo(() => {
    return {
      cover: () => setPortrait('agnes_sampson'),
      map_castle: () => setPortrait('agnes_sampson'),
      portrait_alanis_muir: () => setPortrait('alanis_muir'),
      portrait_euphame_maccalzean: () => setPortrait('euphame_maccalzean'),
      portrait_geillis_ducan: () => setPortrait('geillis_ducan'),
      portrait_john_cunningham: () => setPortrait('john_cunningham'),
      portrait_margaret_acheson: () => setPortrait('margaret_acheson'),
      portrait_robert_grierson: () => setPortrait('robert_grierson'),
      portrait_smith_du_pont_hallis: () => setPortrait('smith_du_pont_hallis'),
    }
  }, [setPortrait])

  useEffect(() => {
    if (answers.portrait && answers.torture && answers.poster) {
      const { next, errors } = getResults({
        answers,
        corrects: CORRECTS,
        reset: {
          portrait: null,
          torture: null,
          poster: false,
        },
      })

      setResults(errors > 0 ? next : true)
    }
  }, [answers])

  useEffect(() => {
    Animated.spring(mainOpacity, {
      useNativeDriver: false,
      toValue: results === undefined ? 1 : 0,
    }).start(() => {
      Animated.spring(resultsOpacity, {
        useNativeDriver: false,
        toValue: results !== undefined ? 1 : 0,
      }).start()
    })
  }, [results, mainOpacity, resultsOpacity])

  return (
    <View style={styles.container}>
      <Fade color="black" start={isVideoLoaded} initial={1} fadeIn={false} />
      <Video
        repeat
        style={styles.video}
        source={require('@/assets/tmp/storm.mp4')}
        resizeMode="cover"
        onReadyForDisplay={() => setIsVideoLoaded(true)}
      />

      {results &&
        (results === true ? (
          <Portal>
            <Animated.View style={{ flex: 1, opacity: resultsOpacity }}>
              <Summary
                title={t('summary')}
                titleColor="#480D00"
                colors={['#ffe5e3', '#fff0ef', '#ffffff']}
                button="Explorer le lieu suivant"
                onPress={() => {
                  // OPEN SET
                  // GOTO NEXT CHAPTER
                }}
                content={[
                  {
                    text:
                      'Selon Mr Seaton, Geillis aurait eu des pouvoirs de guérison grâce à',
                    label: 'La Sorcellerie',
                  },
                  {
                    text:
                      "Afin de la faire avouer, Mr Seaton la fit torturer à l'aide de",
                    label: 'Brodequins',
                  },
                  {
                    text:
                      'En réalité, Geillis était capable de prodiguer des soins car elle était ',
                    label: 'Guérisseuse',
                  },
                  {
                    text: "Geillis s'échappait la nuit afin de pratiquer",
                    label: 'La Médecine',
                  },
                ]}
              />
            </Animated.View>
          </Portal>
        ) : (
          <Animated.View
            style={[StyleSheet.absoluteFill, { opacity: resultsOpacity }]}>
            <SafeAreaView
              style={{
                position: 'absolute',
                bottom: 42,
                width: '100%',
              }}>
              <VideoSubtitleBox
                style={{
                  paddingHorizontal: 30,
                  width: '100%',
                }}
                under={
                  <LargeButton
                    style={{ marginTop: 15, alignSelf: 'center' }}
                    onPress={() => {
                      setAnswers(results as typeof answers)
                      setResults(undefined)
                    }}>
                    Modifier mes cartes
                  </LargeButton>
                }
                name={t('agnes')}
                content={t('wrong_results')}
              />
            </SafeAreaView>
          </Animated.View>
        ))}
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: mainOpacity }]}
        pointerEvents={results === undefined ? 'auto' : 'none'}>
        <CardCarousel
          color="red"
          index={index}
          onIndexChange={setIndex}
          collapsed={isCollapsed}
          onCollapsed={setIsCollapsed}
          data={[
            {
              complete: !!portrait,
              front: (
                <Card
                  number={1}
                  color="red"
                  title={
                    portrait ? [t(`portrait_${portrait.name}`)] : undefined
                  }
                  text={portrait ? undefined : t('missing_informations')}
                  forceBottom={!portrait}
                  bottom={t('the_ghost')}
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
                  bottom={t('the_torture')}
                  inner={
                    <InnerCarousel
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
                        setAnswers((t) => ({
                          ...t,
                          torture:
                            typeof i === 'number'
                              ? ASSETS.tortures[i].name
                              : null,
                        }))
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
                        onBack={() => {
                          setIsCollapsed(false)
                          if (isPosterCompletedRef.current) {
                            setAnswers((t) => ({ ...t, poster: true }))
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
                          onComplete={() =>
                            (isPosterCompletedRef.current = true)
                          }
                        />
                      </InnerPoster>
                    ) : null
                  }
                />
              ),
            },
          ]}>
          <ScanButton
            style={styles.button}
            onPress={() =>
              set({
                callbacks: {
                  default: () => undefined,
                  map_port: () => {
                    setShowPoster(true)
                    setIndex(2)
                    hide()
                  },
                  ...portraits_callbacks,
                },
              })
            }
          />
        </CardCarousel>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: CardCarousel.COLLAPSIBLE_START_OFFSET + 11,
  },
  video: {
    flex: 1,
  },
})
