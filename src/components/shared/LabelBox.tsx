import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import SmallSquare from '@/components/shared/SmallSquare'

export interface LabelBoxProps {
  name: string
  backgroundColor: string
  textColor: string
  style?: StyleProp<ViewStyle>
}

export default function LabelBox({
  name,
  backgroundColor,
  textColor,
  style,
}: LabelBoxProps) {
  return (
    <View style={[styles.person, style, { backgroundColor }]}>
      <SmallSquare />
      <Text style={[styles.name, { color: textColor }]}>{name}</Text>
      <SmallSquare />
    </View>
  )
}

const styles = StyleSheet.create({
  person: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 9,
  },
  name: {
    fontFamily: 'Avara-Bold',
    marginBottom: -5,
    fontSize: 15,
  },
})
