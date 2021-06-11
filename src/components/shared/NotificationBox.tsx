import React, { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import theme from '@/styles/theme'

interface NotificationBox {
  style?: StyleProp<ViewStyle>
}

export default function NotificationBox({
  style,
  children,
}: PropsWithChildren<NotificationBox>) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingTop: 17,
    paddingBottom: 18,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'iAWriterQuattroS-Regular',
    letterSpacing: -0.21,
    fontSize: 16,
  },
})
