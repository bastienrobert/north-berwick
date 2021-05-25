import theme from '@/styles/theme'
import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import BaseSubtitleBox from './shared/BaseSubtitleBox'

interface VideoSubtitleBoxProps {
  name: string
}

export default function VideoSubtitleBox({
  name,
  children,
}: PropsWithChildren<VideoSubtitleBoxProps>) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.square} />
        <Text style={styles.name}>{name}</Text>
        <View style={styles.square} />
      </View>
      <BaseSubtitleBox>
        <Text>{children}</Text>
      </BaseSubtitleBox>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  wrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12.5,
    paddingVertical: 6,
    backgroundColor: theme.colors.mineShaft,
    transform: [{ translateY: 13 }],
    zIndex: 2,
  },
  name: {
    color: theme.colors.white,
    fontSize: 15,
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
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
  },
})
