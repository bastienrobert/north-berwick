import theme from '@/styles/theme'
import React, { PropsWithChildren, useMemo, useState } from 'react'
import { StyleSheet, Text } from 'react-native'

import TouchableOpacityOrView, {
  TouchableOpacityOrViewProps,
} from './TouchableOpacityOrView'

type LargeButtonProps = TouchableOpacityOrViewProps & {
  children: string
  theme?: keyof typeof themes
}

export default function LargeButton({
  theme = 'primary',
  style,
  children,
  ...rest
}: LargeButtonProps) {
  const t = useMemo(() => {
    return themes[theme]
  }, [theme])

  return (
    <TouchableOpacityOrView
      activeOpacity={1}
      pressedStyle={t.pressed}
      style={[style, styles.container, t.default]}
      {...rest}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacityOrView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 45,
    backgroundColor: theme.colors.white,
    paddingLeft: 29,
    paddingRight: 29,
  },
  text: {
    fontSize: 17,
  },
  primary: {
    shadowColor: theme.colors.romantic,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  primaryPressed: {
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

const themes = {
  primary: {
    default: styles.primary,
    pressed: styles.primaryPressed,
  },
  secondary: {
    default: undefined,
    pressed: undefined,
  },
}
