import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

type SharedCardProps = {
  active?: boolean
} & (
  | {
      half?: true
      complete?: 1 | 2 | false
    }
  | {
      half?: false | undefined
      complete?: boolean
    }
)

type SmallCardProps = SharedCardProps & {
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
  return half ? (
    <View style={[styles.card, active ? styles.active : undefined]}>
      <View style={styles.inner}>
        <View
          style={[
            styles.half,
            {
              backgroundColor: color,
              opacity: complete ? 1 : uncompleteOpacity,
            },
          ]}
        />
        <View
          style={[
            styles.half,
            {
              backgroundColor: color,
              opacity: complete === 2 ? 1 : uncompleteOpacity,
            },
          ]}
        />
      </View>
      {active && <View style={styles.dot} />}
    </View>
  ) : (
    <View style={[styles.card, active ? styles.active : undefined]}>
      <View
        style={[
          styles.inner,
          { backgroundColor: color, opacity: complete ? 1 : uncompleteOpacity },
        ]}
      />
      {active && <View style={styles.dot} />}
    </View>
  )
}

interface ActiveCardIndicatorProps extends ViewProps {
  color: string
  cards: SharedCardProps[]
}

export default function ActiveCardIndicator({
  style,
  cards,
  color = 'red',
  ...props
}: ActiveCardIndicatorProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      {cards.map((c, i) => (
        <SmallCard {...c} color={color} uncompleteOpacity={0.5} />
      ))}
    </View>
  )
}

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
