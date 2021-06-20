import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import {
  useWindowDimensions,
  View,
  ViewStyle,
  StyleProp,
  SafeAreaView,
  StyleSheet,
} from 'react-native'

import Card from '@/components/Card'
import FlipWrapper from '@/components/Card/FlipWrapper'
import BottomCollapsable from '@/components/shared/BottomCollapsable'
import Carousel from '@/components/shared/Carousel'
import RoundedButton from '@/components/shared/RoundedButton'
import CrossIcon from '@/components/icons/CrossIcon'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'

import { FlippableSide } from '@/hooks/useFlippable'

type FlipCardData =
  | {
      front: ReactNode | (() => ReactNode)
      back?: undefined
      side?: undefined
    }
  | {
      front: ReactNode | (() => ReactNode)
      back: ReactNode | (() => ReactNode)
      side: FlippableSide
    }

type FlippableCarouselProps = {
  data: FlipCardData[][]
  onClosePress: () => void
  style?: StyleProp<ViewStyle>
}

const ROTATION_PATTERNS = [
  ['2deg', '0deg', '-3deg'],
  ['-1deg', '0deg', '1deg'],
  ['2deg', '0deg', '-3deg'],
  ['2deg', '0deg', '-3deg'],
]

const margins = { left: 24, right: 0, top: 0, bottom: 0 }
function FlippableCarousel({
  onClosePress,
  data,
  style,
}: PropsWithChildren<FlippableCarouselProps>) {
  const [index, setIndex] = useState<number>(0)
  const [axis, setAxis] = useState<'x' | 'y' | null>(null)

  const { width } = useWindowDimensions()

  const onBottomCollapsableResponderStart = useCallback(() => {
    setAxis('y')
  }, [])
  const onBottomCollapsableResponderRelease = useCallback(() => {
    setAxis(null)
  }, [])
  const onCarouselResponderStart = useCallback(() => {
    setAxis('x')
  }, [])
  const onCarouselResponderRelease = useCallback(() => {
    setAxis(null)
  }, [])

  const cardStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return { width: (width / 100) * 85 }
  }, [width])
  const bottomCollapsableStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return {
      marginLeft: margins.left,
      width: (width / 100) * 85,
      height:
        (((width / 100) * 85) / Card.DIMENSIONS.width) * Card.DIMENSIONS.height,
    }
  }, [width])

  return (
    <View style={[styles.container, style]}>
      <SafeAreaView style={styles.controls}>
        <RoundedButton onPress={onClosePress}>
          <CrossIcon />
        </RoundedButton>

        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <RoundedButton
            onPress={() => setIndex((i) => i - 1)}
            style={[styles.leftRightButtons, { opacity: index <= 0 ? 0 : 1 }]}
            disabled={index <= 0}>
            <ArrowLeftIcon />
          </RoundedButton>
          <RoundedButton
            onPress={() => setIndex((i) => i + 1)}
            style={[
              styles.leftRightButtons,
              { opacity: index >= data.length - 1 ? 0 : 1 },
            ]}
            disabled={index >= data.length - 1}>
            <ArrowRightIcon />
          </RoundedButton>
        </View>
      </SafeAreaView>
      <Carousel
        disabled={axis === 'y'}
        onResponderStart={onCarouselResponderStart}
        onResponderRelease={onCarouselResponderRelease}
        targetIndex={index}
        onSlideIndexChange={setIndex}
        axis="x"
        length={data.length}
        margins={margins}>
        {data.map((group, i) => {
          const rotations = ROTATION_PATTERNS[i]

          return (
            <View key={i} style={bottomCollapsableStyle}>
              {group.map((g, j) => (
                <BottomCollapsable
                  key={j}
                  disabled={group.length - j - 1 === 0 || axis === 'x'}
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      zIndex: -j,
                    },
                  ]}
                  collapsed={false}
                  onResponderStart={onBottomCollapsableResponderStart}
                  onResponderRelease={onBottomCollapsableResponderRelease}
                  startOffset={
                    FlippableCarousel.COLLAPSIBLE_START_OFFSET + 40 * j
                  }
                  endOffset={FlippableCarousel.COLLAPSIBLE_END_OFFSET + 40 * j}>
                  {g.back ? (
                    <FlipWrapper
                      style={[
                        cardStyle,
                        { transform: [{ rotate: rotations[j] }] },
                      ]}
                      front={g.front}
                      back={g.back}
                      side={g.side}
                    />
                  ) : (
                    <View
                      style={[
                        cardStyle,
                        { transform: [{ rotate: rotations[j] }] },
                      ]}>
                      {typeof g.front === 'function' ? g.front() : g.front}
                    </View>
                  )}
                </BottomCollapsable>
              ))}
            </View>
          )
        })}
      </Carousel>
    </View>
  )
}

FlippableCarousel.COLLAPSIBLE_START_OFFSET = 100
FlippableCarousel.COLLAPSIBLE_END_OFFSET = 40

export default FlippableCarousel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    top: 65,
    left: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  leftRightButtons: {
    marginHorizontal: 5,
  },
})
