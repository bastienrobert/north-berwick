import theme from '@/styles/theme'
import React, { PropsWithChildren, useState } from 'react'
import { StyleSheet } from 'react-native'

import TouchableOpacityOrView, {
  TouchableOpacityOrViewProps,
} from './TouchableOpacityOrView'

type RoundedButtonProps = TouchableOpacityOrViewProps & {
  large?: boolean
}

export default function RoundedButton({
  large = false,
  style,
  children,
  ...rest
}: PropsWithChildren<RoundedButtonProps>) {
  return (
    <TouchableOpacityOrView
      activeOpacity={1}
      pressedStyle={styles.pressed}
      style={[style, styles.container, large ? styles.large : styles.small]}
      {...rest}>
      {children}
    </TouchableOpacityOrView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.romantic,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  large: {
    width: 59,
    height: 59,
  },
  small: {
    width: 45,
    height: 45,
  },
  pressed: {
    shadowColor: theme.colors.romantic,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
