import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
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
  length: number
  content: ReactNode[]
  editLabel?: string
  submitLabel?: string
  controls?: boolean
  style?: StyleProp<ViewStyle>
  onSelectedChange?: (index: number | null) => void
}

export interface InnerCarouselRef {
  reset: () => void
}

const margins = { left: 24, right: 0, top: 0, bottom: 0 }
function InnerCarousel(
  {
    content,
    editLabel,
    submitLabel,
    length,
    controls = true,
    style,
    onSelectedChange,
  }: InnerCarouselProps,
  ref: ForwardedRef<InnerCarouselRef>,
) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [layout, onLayout] = useLayout()
  const hasSelectedValue = typeof selected === 'number'

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelected(null)
    },
  }))

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
          length={length}
          margins={margins}
          targetIndex={index}
          onSlideIndexChange={setIndex}>
          {content.map((c, i) => (
            <View key={i} style={[styles.content, { width: layout.width }]}>
              {c}
            </View>
          ))}
        </Carousel>
      </View>
      {controls && (
        <View style={styles.controls}>
          {hasSelectedValue ? (
            <LargeButton theme="edit" style={styles.button} onPress={onEdit}>
              {editLabel ?? ''}
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
                {submitLabel ?? ''}
              </LargeButton>
              <RoundedButton
                style={{ opacity: index >= length - 1 ? 0 : 1 }}
                disabled={index >= length - 1}
                onPress={() => setIndex((i) => i + 1)}>
                <ArrowRightIcon />
              </RoundedButton>
            </>
          )}
        </View>
      )}
    </View>
  )
}

export default forwardRef(InnerCarousel)

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
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 4,
    marginLeft: 24,
  },
  controls: {
    flexDirection: 'row',
  },
  button: {
    margin: 'auto',
    marginHorizontal: 8.5,
  },
})
