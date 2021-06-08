import React, { PropsWithChildren, ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import SmallSquare from './SmallSquare'
import TouchableOpacityOrView, {
  TouchableOpacityOrViewProps,
} from './TouchableOpacityOrView'

import theme from '@/styles/theme'

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
        <View style={styles.person}>
          <SmallSquare />
          <Text style={styles.name}>{name}</Text>
          <SmallSquare />
        </View>
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
  person: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 7,
    backgroundColor: theme.colors.mineShaft,
    transform: [{ translateY: 13 }],
    zIndex: 2,
  },
  name: {
    color: theme.colors.white,
    fontFamily: 'Avara-Bold',
    marginBottom: -5,
    fontSize: 15,
  },
  content: {
    backgroundColor: theme.colors.white,
    paddingTop: 17,
    paddingBottom: 18,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
})
