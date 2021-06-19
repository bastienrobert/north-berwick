import React, { useEffect, useRef } from 'react'
import { Animated, SafeAreaView, StyleSheet } from 'react-native'
import { useTranslate } from 'react-polyglot'

import Summary, { SummaryProps } from '@/components/Summary'
import LargeButton, { LargeButtonProps } from '@/components/shared/LargeButton'
import SubtitleBox from '@/components/shared/SubtitleBox'

import { Portal } from '@/lib/Portal'

export interface ChapterCompletedParams {
  successSummaryProps: Omit<SummaryProps, 'title'>
  wrongButtonProps: LargeButtonProps
  completed?: 'right' | 'wrong'
}

export interface ChapterCompletedProps extends ChapterCompletedParams {
  opacity: number
}

export default function ChapterCompleted({
  opacity: toValue,
  completed,
  successSummaryProps,
  wrongButtonProps,
}: ChapterCompletedProps) {
  const t = useTranslate()
  const opacity = useRef(new Animated.Value(toValue)).current

  useEffect(() => {
    Animated.spring(opacity, {
      useNativeDriver: false,
      toValue,
    }).start()
  }, [opacity, toValue])

  if (completed === 'right') {
    return (
      <Portal>
        <Animated.View
          style={[styles.summary, { opacity }]}
          pointerEvents={toValue ? 'auto' : 'none'}>
          <Summary title={t('summary')} {...successSummaryProps} />
        </Animated.View>
      </Portal>
    )
  }

  if (completed === 'wrong') {
    return (
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity }]}
        pointerEvents={toValue ? 'auto' : 'none'}>
        <SafeAreaView
          style={{
            position: 'absolute',
            bottom: 42,
            width: '100%',
          }}>
          <SubtitleBox
            style={styles.subtitle}
            under={
              <LargeButton
                style={styles.subtitleButton}
                {...wrongButtonProps}
              />
            }
            name={t('agnes')}
            content={t('wrong_results')}
          />
        </SafeAreaView>
      </Animated.View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  summary: {
    flex: 1,
  },
  subtitle: {
    paddingHorizontal: 30,
    width: '100%',
  },
  subtitleButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
})
