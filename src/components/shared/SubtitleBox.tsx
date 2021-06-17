import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text } from 'react-native'

import BaseSubtitleBox, {
  BaseSubtitleBoxProps,
} from '@/components/shared/BaseSubtitleBox'

export type SubtitleBoxProps = BaseSubtitleBoxProps & {
  content: string
}

export default function SubtitleBox({
  children,
  content,
  ...props
}: PropsWithChildren<SubtitleBoxProps>) {
  return (
    <BaseSubtitleBox under={children} {...props}>
      <Text style={styles.text}>{content}</Text>
    </BaseSubtitleBox>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'iAWriterQuattroS-Regular',
    fontSize: 16,
    letterSpacing: -0.21,
  },
})
