import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import {
  View,
  useWindowDimensions,
  ViewStyle,
  StyleProp,
  SafeAreaView,
} from 'react-native'

import Card from '@/components/Card'
import BottomCollapsible from '@/components/shared/BottomCollapsible'

import Carousel from '@/components/shared/Carousel'
import ActiveCardIndicator from '@/components/ActiveCardIndicator'
import FlipWrapper from '@/components/Card/FlipWrapper'
import InnerCarousel from '@/components/Card/InnerCarousel'

interface FlipCardData {
  front: ReactNode | (() => ReactNode)
  back?: ReactNode | (() => ReactNode)
}

const data: FlipCardData[] = [
  {
    front: () => {
      const [title, setTitle] = useState<
        undefined | [string] | [string, string]
      >(undefined)

      return (
        <Card
          number={1}
          color="red"
          forceBottom={false}
          title={title}
          // text="Tu n'as pas encore assez d'informations pour remplir cette carte"
          bottom="Falcon of Leith"
          inner={
            <InnerCarousel
              onSelectedChange={(i) =>
                setTitle(
                  typeof i === 'number' ? ['bride de', 'la mégère'] : undefined,
                )
              }
            />
          }
        />
      )
    },
  },
  {
    front: (
      <Card
        number={1}
        color="purple"
        title={['Hello', 'World']}
        bottom="Falcon of Leith"
      />
    ),
    back: (
      <Card
        revert
        number={2}
        color="blue"
        text="Tu n'as pas encore assez d'informations pour remplir cette carte"
        bottom="Falcon of Leith"
      />
    ),
  },
]

const margins = { left: 15, right: 0, top: 0, bottom: 0 }

export default function FlipCardCarousel() {
  const [index, setIndex] = useState<number>(0)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [axis, setAxis] = useState<'x' | 'y' | null>(null)

  const { width } = useWindowDimensions()

  const onBottomCollapsibleResponderStart = useCallback(() => {
    setAxis('y')
  }, [])
  const onBottomCollapsibleResponderRelease = useCallback(() => {
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
  const bottomCollapsibleStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return {
      position: 'absolute',
      width: (width / 100) * 85,
      height:
        (((width / 100) * 85) / Card.DIMENSIONS.width) * Card.DIMENSIONS.height,
    }
  }, [width])

  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
        alignItems: 'center',
      }}>
      <SafeAreaView style={{ position: 'absolute', top: 65, right: 30 }}>
        <ActiveCardIndicator
          color="white"
          cards={[
            {
              complete: true,
              active: !isCollapsed && index === 0,
            },
            {
              complete: 1,
              active: !isCollapsed && index === 1,
              half: true,
            },
          ]}
        />
      </SafeAreaView>
      <BottomCollapsible
        disabled={axis === 'x'}
        style={bottomCollapsibleStyle}
        collapsed={isCollapsed}
        onChange={setIsCollapsed}
        onResponderStart={onBottomCollapsibleResponderStart}
        onResponderRelease={onBottomCollapsibleResponderRelease}
        startOffset={100}
        endOffset={40}>
        <View>
          <Carousel
            disabled={axis === 'y'}
            onResponderStart={onCarouselResponderStart}
            onResponderRelease={onCarouselResponderRelease}
            // targetIndex={index}
            onSlideIndexChange={setIndex}
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
      </BottomCollapsible>
    </View>
  )
}
