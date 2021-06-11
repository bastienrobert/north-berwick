import { clamp } from '@/utils/math'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import Carousel from '../shared/Carousel'
import LargeButton from '../shared/LargeButton'
import RoundedButton from '../shared/RoundedButton'

const Box = () => {
  return (
    <View style={styles.box}>
      <FastImage
        source={require('@/assets/tortures/bride.webp')}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  )
}

interface InnerCarouselProps {
  style?: StyleProp<ViewStyle>
  onSelectedChange?: (index: number | null) => void
}

export default function InnerCarousel({
  style,
  onSelectedChange,
}: InnerCarouselProps) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const onSubmit = useCallback(() => {
    setSelected(index)
  }, [index])

  const onEdit = useCallback(() => {
    setSelected(null)
  }, [])

  useEffect(() => {
    onSelectedChange?.(selected)
  }, [selected])

  const hasSelectedValue = typeof selected === 'number'

  return (
    <View style={[styles.container, style]}>
      <View style={styles.wrapper}>
        <Carousel
          disabled
          axis="x"
          length={3}
          margins={{ left: 24, right: 0, top: 0, bottom: 0 }}
          targetIndex={index}
          onSlideIndexChange={setIndex}>
          <Box />
          <Box />
          <Box />
        </Carousel>
      </View>
      <View style={styles.controls}>
        {hasSelectedValue ? (
          <LargeButton theme="secondary" style={styles.button} onPress={onEdit}>
            Modifier
          </LargeButton>
        ) : (
          <>
            <RoundedButton
              style={{ opacity: index <= 0 ? 0 : 1 }}
              disabled={index <= 0}
              onPress={() => setIndex((i) => i - 1)}>
              <ArrowLeftIcon />
            </RoundedButton>
            <LargeButton
              theme="secondary"
              style={styles.button}
              onPress={onSubmit}>
              Sélectionner
            </LargeButton>
            <RoundedButton
              style={{ opacity: index >= 3 - 1 ? 0 : 1 }}
              disabled={index >= 3 - 1}
              onPress={() => setIndex((i) => i + 1)}>
              <ArrowRightIcon />
            </RoundedButton>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 10,
    alignItems: 'center',
  },
  wrapper: {
    overflow: 'hidden',
    marginBottom: 70,
    width: 180,
  },
  controls: {
    flexDirection: 'row',
  },
  button: {
    margin: 'auto',
    marginHorizontal: 8.5,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#61dafb',
    width: 180,
    height: 272,
    borderRadius: 4,
    marginLeft: 24,
  },
})
