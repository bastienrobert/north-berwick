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
import ActiveCardIndicator, {
  CompleteIndicatorCard,
  CompleteHalfIndicatorCard,
} from '@/components/ActiveCardIndicator'
import FlipWrapper from '@/components/Card/FlipWrapper'
import BottomCollapsable from '@/components/shared/BottomCollapsable'
import Carousel from '@/components/shared/Carousel'

import { FlippableSide } from '@/hooks/useFlippable'

type FlipCardData =
  | {
      complete: CompleteIndicatorCard
      front: ReactNode | (() => ReactNode)
      back?: undefined
      side?: undefined
    }
  | {
      complete: CompleteHalfIndicatorCard
      front: ReactNode | (() => ReactNode)
      back: ReactNode | (() => ReactNode)
      side: FlippableSide
    }

export interface ChapterCarouselProps {
  data: FlipCardData[]
  color: keyof typeof ActiveCardIndicator.COLORS
  index: number
  collapsed: boolean
  onIndexChange: (index: number) => void
  onCollapse: (collapsed: boolean) => void
  onCollapseStart?: () => void
  style?: StyleProp<ViewStyle>
}

const margins = { left: 15, right: 0, top: 0, bottom: 0 }
function ChapterCarousel({
  children,
  data,
  index,
  onIndexChange,
  collapsed,
  onCollapse,
  onCollapseStart,
  color,
  style,
}: PropsWithChildren<ChapterCarouselProps>) {
  const [axis, setAxis] = useState<'x' | 'y' | null>(null)

  const { width } = useWindowDimensions()

  const onBottomCollapsableResponderStart = useCallback(() => {
    setAxis('y')
    onCollapseStart?.()
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
    return { width: (width / 100) * 85, marginLeft: 15 }
  }, [width])
  const bottomCollapsableStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return {
      position: 'absolute',
      width: (width / 100) * 85,
      height:
        (((width / 100) * 85) / Card.DIMENSIONS.width) * Card.DIMENSIONS.height,
    }
  }, [width])

  return (
    <View style={[styles.container, style]}>
      <SafeAreaView style={styles.indicator}>
        <ActiveCardIndicator
          color={color}
          cards={data.map((d, i) => ({
            active: !collapsed && index === i,
            half: !!d.back,
            // already ensured than d.completed is correctly typed with d.back
            complete: d.complete as any,
          }))}
        />
      </SafeAreaView>
      <View style={styles.children}>{children}</View>
      <BottomCollapsable
        disabled={axis === 'x'}
        style={bottomCollapsableStyle}
        collapsed={collapsed}
        onChange={onCollapse}
        onResponderStart={onBottomCollapsableResponderStart}
        onResponderRelease={onBottomCollapsableResponderRelease}
        startOffset={ChapterCarousel.COLLAPSIBLE_START_OFFSET}
        endOffset={ChapterCarousel.COLLAPSIBLE_END_OFFSET}>
        <View>
          <Carousel
            disabled={axis === 'y'}
            onResponderStart={onCarouselResponderStart}
            onResponderRelease={onCarouselResponderRelease}
            targetIndex={index}
            onSlideIndexChange={onIndexChange}
            axis="x"
            length={data.length}
            margins={margins}>
            {data.map((d, i) =>
              d.back ? (
                <FlipWrapper
                  key={i}
                  style={cardStyle}
                  side={d.side}
                  front={d.front}
                  back={d.back}
                />
              ) : (
                <View key={i} style={cardStyle}>
                  {typeof d.front === 'function' ? d.front() : d.front}
                </View>
              ),
            )}
          </Carousel>
        </View>
      </BottomCollapsable>
    </View>
  )
}

ChapterCarousel.COLLAPSIBLE_START_OFFSET = 100
ChapterCarousel.COLLAPSIBLE_END_OFFSET = 40

export default ChapterCarousel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 65,
    right: 30,
  },
  children: {
    flex: 1,
  },
})
