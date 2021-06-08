import React from 'react'
import { StyleSheet, View } from 'react-native'

import theme from '@/styles/theme'

export default function SmallSquare() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.square} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 8,
  },
  square: {
    width: 4,
    height: 4,
    transform: [
      { translateY: -2 },
      { rotate: '45deg' },
      { translateX: 2 },
      { translateY: 2 },
    ],
    backgroundColor: theme.colors.white,
  },
})
