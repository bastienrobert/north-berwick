import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import LabelBox from '@/components/shared/LabelBox'

export interface SummaryParagraphProps {
  text: string
  label: string
  style?: StyleProp<ViewStyle>
}

export default function SummaryParagraph({
  label,
  text,
  style,
}: SummaryParagraphProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
      <LabelBox
        name={label}
        backgroundColor="#680E1C"
        textColor="#fff"
        style={styles.label}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: 'center',
    fontFamily: 'iAWriterQuattroS-Regular',
    letterSpacing: -0.21,
    fontSize: 16,
    color: '#2C2C2C',
  },
  label: {
    marginTop: 8,
  },
})
