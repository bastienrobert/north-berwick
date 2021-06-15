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

type FlipCardData =
  | {
      complete: CompleteIndicatorCard
      front: ReactNode | (() => ReactNode)
      back?: undefined
    }
  | {
      complete: CompleteHalfIndicatorCard
      front: ReactNode | (() => ReactNode)
      back: ReactNode | (() => ReactNode)
    }

type CardCarouselProps = {
  data: FlipCardData[]
  color: keyof typeof ActiveCardIndicator.COLORS
  style?: StyleProp<ViewStyle>
} & (
  | {
      collapsed?: undefined
      onCollapsed?: undefined
    }
  | {
      collapsed: boolean
      onCollapsed: (collapsed: boolean) => void
    }
) &
  (
    | {
        index?: undefined
        onIndexChange?: undefined
      }
    | {
        index: number
        onIndexChange: (index: number) => void
      }
  )

const margins = { left: 15, right: 0, top: 0, bottom: 0 }
function CardCarousel({
  children,
  data,
  index,
  onIndexChange,
  collapsed,
  onCollapsed,
  color,
  style,
}: PropsWithChildren<CardCarouselProps>) {
  const [innerIndex, setInnerIndex] = useState<number>(0)
  const [innerCollapsed, setInnerCollapsed] = useState(true)
  const [axis, setAxis] = useState<'x' | 'y' | null>(null)

  const _collapsed = collapsed ?? innerCollapsed
  const _onCollapsed = onCollapsed || setInnerCollapsed
  const _index = index ?? innerIndex
  const _onIndexChange = onIndexChange || setInnerIndex

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
      <SafeAreaView style={{ position: 'absolute', top: 65, right: 30 }}>
        <ActiveCardIndicator
          color={color}
          cards={data.map((d, i) => ({
            active: !_collapsed && _index === i,
            half: !!d.back,
            // already ensured than d.completed is correctly typed with d.back
            complete: d.complete as any,
          }))}
        />
      </SafeAreaView>
      <View style={{ flex: 1 }}>{children}</View>
      <BottomCollapsable
        disabled={axis === 'x'}
        style={bottomCollapsableStyle}
        collapsed={_collapsed}
        onChange={_onCollapsed}
        onResponderStart={onBottomCollapsableResponderStart}
        onResponderRelease={onBottomCollapsableResponderRelease}
        startOffset={CardCarousel.COLLAPSIBLE_START_OFFSET}
        endOffset={CardCarousel.COLLAPSIBLE_END_OFFSET}>
        <View>
          <Carousel
            disabled={axis === 'y'}
            onResponderStart={onCarouselResponderStart}
            onResponderRelease={onCarouselResponderRelease}
            targetIndex={_index}
            onSlideIndexChange={_onIndexChange}
            axis="x"
            length={data.length}
            margins={margins}>
            {data.map((d, i) =>
              d.back ? (
                <FlipWrapper
                  key={i}
                  style={cardStyle}
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

CardCarousel.COLLAPSIBLE_START_OFFSET = 100
CardCarousel.COLLAPSIBLE_END_OFFSET = 40

export default CardCarousel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
})
