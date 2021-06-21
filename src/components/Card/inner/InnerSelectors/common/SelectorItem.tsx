import theme from '@/styles/theme'
import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import TouchableOpacityOrView, {
  TouchableOpacityOrViewProps,
} from '@/components/shared/TouchableOpacityOrView'

type SelectorItemProps = TouchableOpacityOrViewProps & {
  selected?: boolean
  theme?: keyof typeof themes
  placeHolderText?: string
}

export default function SelectorItem({
  placeHolderText = '?',
  theme = 'small',
  style,
  children,
  selected,
  ...rest
}: PropsWithChildren<SelectorItemProps>) {
  const transform = useRef(new Animated.ValueXY()).current

  const t = useMemo(() => {
    return themes[theme]
  }, [theme])

  useEffect(() => {
    Animated.spring(transform, {
      useNativeDriver: false,
      toValue: {
        x: 0,
        y: selected ? -13 : 0,
      },
      friction: 8,
      tension: 20,
    }).start()
  }, [selected])

  return (
    <View style={style}>
      <Animated.View style={{ transform: transform.getTranslateTransform() }}>
        <TouchableOpacityOrView
          activeOpacity={1}
          style={[
            styles.container,
            rest.onPress ? styles.touchable : undefined,
            t.container,
          ]}
          {...rest}>
          <View style={[styles.inner, t.inner]}>
            {children || (
              <Text style={styles.placeHolderText}>{placeHolderText}</Text>
            )}
          </View>
        </TouchableOpacityOrView>
      </Animated.View>
      <View style={styles.indicator} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    shadowColor: theme.colors.mineShaft,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 6,
    elevation: 8,
  },
  placeHolderText: {
    fontSize: 17,
    fontFamily: 'Avara-Bold',
    letterSpacing: 1.06,
    textAlign: 'center',
    marginLeft: 2.5,
    marginTop: 3,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.white,
    alignSelf: 'center',
    marginTop: -7,
  },
  small: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  smallInner: {
    width: 59,
    height: 59,
  },
  big: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  bigInner: {
    width: 114,
    height: 114,
  },
  large: {
    width: 195,
    height: 75,
    borderRadius: 97.5,
  },
  largeInner: {
    width: 67,
    height: 67,
  },
})

const themes = {
  small: {
    container: styles.small,
    inner: styles.smallInner,
  },
  big: {
    container: styles.big,
    inner: styles.bigInner,
  },
  large: {
    container: styles.large,
    inner: styles.largeInner,
  },
}
