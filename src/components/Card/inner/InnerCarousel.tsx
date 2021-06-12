import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import {
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import Carousel from '@/components/shared/Carousel'
import LargeButton from '@/components/shared/LargeButton'
import RoundedButton from '@/components/shared/RoundedButton'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon'

import useLayout from '@/hooks/useLayout'

interface InnerCarouselProps {
  editLabel: string
  submitLabel: string
  style?: StyleProp<ViewStyle>
  onSelectedChange?: (index: number | null) => void
  children: (layout: LayoutRectangle) => ReactNode
}

export default function InnerCarousel({
  children,
  editLabel,
  submitLabel,
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
            {editLabel}
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
              {submitLabel}
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
