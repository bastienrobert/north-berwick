import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ArrowRightIcon from '@/components/icons/ArrowRightIcon'
import BaseSubtitleBox, {
  BaseSubtitleBoxProps,
} from '@/components/shared/BaseSubtitleBox'

export type VideoDialogBoxProps = BaseSubtitleBoxProps & {
  content: string
  arrow?: boolean
}

export default function VideoDialogBox({
  content,
  arrow = true,
  children,
  ...props
}: PropsWithChildren<VideoDialogBoxProps>) {
  return (
    <BaseSubtitleBox under={children} {...props}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{content}</Text>
        {arrow && (
          <View style={styles.icon}>
            <ArrowRightIcon />
          </View>
        )}
      </View>
    </BaseSubtitleBox>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'iAWriterQuattroS-Regular',
    fontSize: 16,
    letterSpacing: -0.21,
  },
  icon: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
})
