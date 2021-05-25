import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import theme from '@/styles/theme'

export default function BaseSubtitleBox({
  children,
}: PropsWithChildren<unknown>) {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingTop: 17,
    paddingBottom: 18,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
})
