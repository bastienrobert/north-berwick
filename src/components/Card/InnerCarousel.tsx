import useLayout from '@/hooks/useLayout'
import { clamp } from '@/utils/math'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import {
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import Carousel from '../shared/Carousel'
import LargeButton from '../shared/LargeButton'
import RoundedButton from '../shared/RoundedButton'

interface InnerCarouselProps {
  style?: StyleProp<ViewStyle>
  onSelectedChange?: (index: number | null) => void
  children: (layout: LayoutRectangle) => ReactNode
}

export default function InnerCarousel({
  children,
  style,
  onSelectedChange,
}: InnerCarouselProps) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [layout, onLayout] = useLayout()
  const hasSelectedValue = typeof selected === 'number'

  const onSubmit = useCallback(() => {
    setSelected(index)
  }, [index])

  const onEdit = useCallback(() => {
    setSelected(null)
  }, [])

  useEffect(() => {
    onSelectedChange?.(selected)
  }, [selected])

  return (
    <View style={[styles.container, style]}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <Carousel
          disabled
          axis="x"
          length={3}
          margins={{ left: 24, right: 0, top: 0, bottom: 0 }}
          targetIndex={index}
          onSlideIndexChange={setIndex}>
          {children(layout)}
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
    width: '80%',
  },
  controls: {
    flexDirection: 'row',
  },
  button: {
    margin: 'auto',
    marginHorizontal: 8.5,
  },
})
