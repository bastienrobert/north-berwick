import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import {
  View,
  useWindowDimensions,
  ViewStyle,
  StyleProp,
  SafeAreaView,
} from 'react-native'

import Card from '@/components/Card'
import BottomCollapsable from '@/components/shared/BottomCollapsable'

import Carousel from '@/components/shared/Carousel'
import WebPImage from '@/components/shared/WebPImage'
import ActiveCardIndicator from '@/components/ActiveCardIndicator'
import FlipWrapper from '@/components/Card/FlipWrapper'
import InnerCarousel from '@/components/Card/inner/InnerCarousel'
import InnerPoster from '@/components/Card/inner/InnerPoster'
import InnerImage from '@/components/Card/inner/InnerImage'
import InnerSelectors from '@/components/Card/inner/InnerSelectors'

import AlcoolIcon from '@/assets/pictograms/alcool.svg'

interface FlipCardData {
  front: ReactNode | (() => ReactNode)
  back?: ReactNode | (() => ReactNode)
}

const Box = ({ style, source }: any) => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          aspectRatio: 1,
          borderRadius: 4,
          marginLeft: 24,
        },
        style,
      ]}>
      <WebPImage source={source} style={{ width: '100%', height: '100%' }} />
    </View>
  )
}

const data: FlipCardData[] = [
  {
    front: (
      <Card
        number={1}
        color="purple"
        title={['Agnes Sampson']}
        forceBottom={false}
        bottom="Falcon of Leith"
        inner={
          <InnerSelectors
            type="single"
            items={{
              alcool: {
                icon: <AlcoolIcon />,
              },
              alcool2: {
                icon: <AlcoolIcon />,
              },
              alcool3: {
                icon: <AlcoolIcon />,
              },
              alcool4: {
                icon: <AlcoolIcon />,
              },
              alcool5: {
                icon: <AlcoolIcon />,
              },
              alcool6: {
                icon: <AlcoolIcon />,
              },
            }}
          />
        }
      />
    ),
  },
  {
    front: (
      <Card
        number={1}
        color="purple"
        title={['Agnes Sampson']}
        forceBottom={false}
        bottom="Falcon of Leith"
        inner={
          <InnerSelectors
            type="family"
            main="Agnès"
            items={{
              parent: { text: 'Charles', display: 'C' },
              children: [
                {
                  text: 'Mary',
                  display: 'M',
                },
                {
                  text: 'Edmond',
                  display: 'E',
                },
                {
                  text: 'Hughes',
                  display: 'H',
                },
              ],
            }}
          />
        }
      />
    ),
  },
  {
    front: (
      <Card
        number={1}
        color="pink"
        revert
        title={['Agnes Sampson']}
        forceBottom={false}
        bottom="Falcon of Leith"
        inner={
          <InnerSelectors
            type="equation"
            result={<AlcoolIcon />}
            items={[
              {
                alcool: {
                  icon: <AlcoolIcon />,
                },
                alcool2: {
                  icon: <AlcoolIcon />,
                },
                alcool3: {
                  icon: <AlcoolIcon />,
                },
                alcool4: {
                  icon: <AlcoolIcon />,
                },
                alcool5: {
                  icon: <AlcoolIcon />,
                },
                alcool6: {
                  icon: <AlcoolIcon />,
                },
              },
              {
                alcool: {
                  icon: <AlcoolIcon />,
                },
                alcool2: {
                  icon: <AlcoolIcon />,
                },
                alcool3: {
                  icon: <AlcoolIcon />,
                },
                alcool4: {
                  icon: <AlcoolIcon />,
                },
                alcool5: {
                  icon: <AlcoolIcon />,
                },
                alcool6: {
                  icon: <AlcoolIcon />,
                },
              },
              // {
              //   charles: {
              //     text: 'Charles',
              //   },
              //   mary: {
              //     text: 'Mary',
              //   },
              //   edmond: {
              //     text: 'Edmond',
              //   },
              //   hughes: {
              //     text: 'Hughes',
              //   },
              // },
            ]}
          />
        }
      />
    ),
  },
  {
    front: (
      <Card
        number={1}
        color="purple"
        title={['Agnes Sampson']}
        forceBottom={false}
        bottom="Falcon of Leith"
        inner={
          <InnerImage
            editLabel="Modifier"
            image={require('@/assets/tmp/agnes_sampson.png')}
          />
        }
      />
    ),
  },
  {
    front: (
      <Card
        number={1}
        color="purple"
        title={['La Condamnation']}
        forceBottom={false}
        bottom="Falcon of Leith"
      />
    ),
  },
  {
    front: (
      <Card
        number={1}
        color="purple"
        title={['La Condamnation']}
        forceBottom={false}
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
      <BottomCollapsable
        disabled={axis === 'x'}
        style={bottomCollapsableStyle}
        collapsed={isCollapsed}
        onChange={setIsCollapsed}
        onResponderStart={onBottomCollapsableResponderStart}
        onResponderRelease={onBottomCollapsableResponderRelease}
        startOffset={100}
        endOffset={40}>
        <View>
          <Carousel
            disabled={axis === 'y'}
            onResponderStart={onCarouselResponderStart}
            onResponderRelease={onCarouselResponderRelease}
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
      </BottomCollapsable>
    </View>
  )
}
