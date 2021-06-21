import theme from '@/styles/theme'
import React, { useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'

import TouchableOpacityOrView, {
  TouchableOpacityOrViewProps,
} from './TouchableOpacityOrView'

export type LargeButtonProps = TouchableOpacityOrViewProps & {
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
      style={[styles.container, style, t.default]}
      {...rest}>
      <Text style={[styles.text, t.text]}>{children}</Text>
    </TouchableOpacityOrView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: theme.colors.white,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Avara-Bold',
    paddingBottom: 13,
    paddingTop: 16,
    paddingHorizontal: 30,
    letterSpacing: 1.06,
  },
  primary: {
    shadowColor: theme.colors.mineShaft,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 6,
    elevation: 8,
  },
  primaryPressed: {
    shadowColor: theme.colors.mineShaft,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editText: {
    color: theme.colors.gray,
  },
})

const themes = {
  primary: {
    default: styles.primary,
    pressed: styles.primaryPressed,
    text: undefined,
  },
  secondary: {
    default: undefined,
    pressed: undefined,
    text: undefined,
  },
  edit: {
    default: undefined,
    pressed: undefined,
    text: styles.editText,
  },
}
