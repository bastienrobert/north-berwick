import React, { PropsWithChildren, ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import SmallSquare from './SmallSquare'
import TouchableOpacityOrView, {
  TouchableOpacityOrViewProps,
} from './TouchableOpacityOrView'

import theme from '@/styles/theme'
import LabelBox from './LabelBox'

export type BaseSubtitleBoxProps = TouchableOpacityOrViewProps & {
  name?: string
  under?: ReactNode
}

export default function BaseSubtitleBox({
  style,
  under,
  children,
  name,
  ...props
}: PropsWithChildren<BaseSubtitleBoxProps>) {
  return (
    <TouchableOpacityOrView style={[styles.container, style]} {...props}>
      {name && (
        <LabelBox
          name={name}
          style={styles.name}
          backgroundColor={theme.colors.mineShaft}
          textColor={theme.colors.white}
        />
      )}
      <View style={styles.content}>{children}</View>
      {under}
    </TouchableOpacityOrView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  content: {
    backgroundColor: theme.colors.white,
    paddingTop: 17,
    paddingBottom: 18,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  name: {
    transform: [{ translateY: 13 }],
    zIndex: 2,
    alignSelf: 'center',
  },
})
