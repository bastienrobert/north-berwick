import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import LabelBox from '@/components/shared/LabelBox'

import theme from '@/styles/theme'

export interface SummaryParagraphParams {
  text: string
  label: string
}

interface SummaryParagraphProps extends SummaryParagraphParams {
  labelBackgroundColor: string
  style?: StyleProp<ViewStyle>
}

export default function SummaryParagraph({
  label,
  text,
  labelBackgroundColor,
  style,
}: SummaryParagraphProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
      <LabelBox
        name={label}
        backgroundColor={labelBackgroundColor}
        textColor={theme.colors.white}
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
    color: theme.colors.mineShaft,
  },
  label: {
    marginTop: 8,
  },
})
