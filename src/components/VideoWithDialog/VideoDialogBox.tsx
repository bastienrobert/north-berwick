import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

import ArrowRightIcon from '@/components/icons/ArrowRightIcon'
import BaseSubtitleBox, {
  BaseSubtitleBoxProps,
} from '@/components/shared/BaseSubtitleBox'
import RevealAnimatedText from '@/components/shared/RevealAnimatedText'

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
        <RevealAnimatedText
          reveal
          style={styles.text}
          textStyle={styles.innerText}
          content={content}
        />
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
    flex: 1,
  },
  innerText: {
    fontFamily: 'iAWriterQuattroS-Regular',
    textAlign: 'left',
    fontSize: 16,
    letterSpacing: -0.21,
  },
  icon: {
    width: 45,
    height: 45,
    alignSelf: 'center',
  },
})
