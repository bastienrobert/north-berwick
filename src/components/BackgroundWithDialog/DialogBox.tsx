import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { GestureResponderEvent, StyleSheet, View } from 'react-native'

import ArrowRightIcon from '@/components/icons/ArrowRightIcon'
import BaseSubtitleBox, {
  BaseSubtitleBoxProps,
} from '@/components/shared/BaseSubtitleBox'
import RevealAnimatedText from '@/components/shared/RevealAnimatedText'

export type DialogBoxProps = BaseSubtitleBoxProps & {
  content: string
  arrow?: boolean
}

export default function DialogBox({
  content,
  arrow = true,
  children,
  onPress,
  ...props
}: PropsWithChildren<DialogBoxProps>) {
  const [force, setForce] = useState<undefined | 1>()
  const finished = useRef(false)

  useEffect(() => {
    finished.current = false
  }, [content])

  const onInnerPress = useCallback(
    (e: GestureResponderEvent) => {
      if (!finished.current) {
        setForce(1)
      } else {
        setForce(undefined)
        onPress?.(e)
      }
    },
    [onPress],
  )

  const onFinish = useCallback(() => {
    finished.current = true
  }, [])

  return (
    <BaseSubtitleBox under={children} {...props} onPress={onInnerPress}>
      <View style={styles.wrapper}>
        <RevealAnimatedText
          reveal
          force={force}
          style={styles.text}
          textStyle={styles.innerText}
          content={content}
          onFinish={onFinish}
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
