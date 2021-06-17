import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View, ViewProps } from 'react-native'

export type CompleteIndicatorCard = boolean | undefined
export type CompleteHalfIndicatorCard = [boolean, boolean] | undefined

type SharedIndicatorCardProps = {
  active?: boolean
} & (
  | {
      half: true
      complete: CompleteHalfIndicatorCard
    }
  | {
      half?: false | undefined
      complete: CompleteIndicatorCard
    }
)

type SmallCardProps = SharedIndicatorCardProps & {
  color: string
  uncompleteOpacity?: number
}

function SmallCard({
  half = false,
  complete = false,
  active = false,
  color,
  uncompleteOpacity = 1,
}: SmallCardProps) {
  const opacity = useRef(new Animated.Value(uncompleteOpacity)).current
  const opacitySecondHalf = useRef(new Animated.Value(uncompleteOpacity))
    .current
  const translation = useRef(new Animated.ValueXY()).current

  useEffect(() => {
    Animated.spring(translation, {
      useNativeDriver: false,
      toValue: {
        x: 0,
        y: active ? -10 : 0,
      },
    }).start()
  }, [active])

  useEffect(() => {
    if (half) {
      Animated.spring(opacity, {
        useNativeDriver: false,
        toValue: (complete as CompleteHalfIndicatorCard)?.[0]
          ? 1
          : uncompleteOpacity,
      }).start()
      Animated.spring(opacitySecondHalf, {
        useNativeDriver: false,
        toValue: (complete as CompleteHalfIndicatorCard)?.[1]
          ? 1
          : uncompleteOpacity,
      }).start()
    } else {
      Animated.spring(opacity, {
        useNativeDriver: false,
        toValue: complete ? 1 : uncompleteOpacity,
      }).start()
    }
  }, [complete])

  return half ? (
    <Animated.View
      style={[styles.card, { transform: translation.getTranslateTransform() }]}>
      <View style={styles.inner}>
        <Animated.View
          style={[
            styles.half,
            {
              backgroundColor: color,
              opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.half,
            {
              backgroundColor: color,
              opacity: opacitySecondHalf,
            },
          ]}
        />
      </View>
      {active && <View style={styles.dot} />}
    </Animated.View>
  ) : (
    <Animated.View
      style={[styles.card, { transform: translation.getTranslateTransform() }]}>
      <Animated.View
        style={[styles.inner, { backgroundColor: color, opacity }]}
      />
      {active && <View style={styles.dot} />}
    </Animated.View>
  )
}

type ActivityCardIndicatorColor = 'red' | 'blue' | 'pink' | 'purple'

interface ActiveCardIndicatorProps extends ViewProps {
  color: ActivityCardIndicatorColor
  cards: SharedIndicatorCardProps[]
}

function ActiveCardIndicator({
  style,
  cards,
  color,
  ...props
}: ActiveCardIndicatorProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      {cards.map((c, i) => (
        <SmallCard
          {...c}
          key={i}
          color={ActiveCardIndicator.COLORS[color]}
          uncompleteOpacity={0.5}
        />
      ))}
    </View>
  )
}

ActiveCardIndicator.COLORS = {
  red: '#FFDAC5',
  blue: '#C5D5FF',
  pink: '#FFDAD7',
  purple: '#D9CCFF',
}

export default ActiveCardIndicator

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  card: {
    width: 22,
    height: 35,
    marginRight: 5,
  },
  inner: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  active: {
    transform: [
      {
        translateY: -10,
      },
    ],
  },
  dot: {
    position: 'absolute',
    bottom: -10,
    left: 22 / 2 - 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  half: {
    width: 10,
    height: '100%',
  },
})
