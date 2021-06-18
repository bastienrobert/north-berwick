import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import SelectorKeyboardItem, {
  SelectorKeyboardItemParams,
} from './SelectorKeyboardItem'

import useLayout from '@/hooks/useLayout'

import theme from '@/styles/theme'

export type SelectorKeyboardItems = SelectorKeyboardItemParams[]

export interface SelectorKeyboardProps {
  label: string
  onChoose: (name: string) => void
  items?: SelectorKeyboardItems
  size?: 'small' | 'medium' | 'large'
}

function getWrapperStyleByLength(length: number) {
  switch (length) {
    case 4:
      return styles.small
    case 6:
      return styles.medium
    case 8:
      return styles.large
    default:
      return null
  }
}

export default function SelectorKeyboard({
  label,
  onChoose,
  items,
  size,
}: SelectorKeyboardProps) {
  const transform = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const [innerItems, setInnerItems] = useState<SelectorKeyboardItems>()
  const [layout, onLayout] = useLayout()

  useEffect(() => {
    if (items?.length) {
      setInnerItems(items)
    }
    Animated.spring(transform, {
      useNativeDriver: false,
      toValue: {
        x: 0,
        y: items ? -layout.height : 0,
      },
      friction: 8,
      tension: 20,
    }).start()
  }, [items, layout])

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: transform.getTranslateTransform() },
      ]}
      onLayout={onLayout}>
      <Text style={styles.text}>{label}</Text>
      <View
        style={[
          styles.wrapper,
          size
            ? styles[size]
            : getWrapperStyleByLength(innerItems?.length ?? 0),
        ]}>
        {innerItems?.map(({ name, ...item }, i) => (
          <SelectorKeyboardItem
            key={i}
            name={name}
            onPress={onChoose}
            {...item}
          />
        ))}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '100%',
    left: '15%',
    width: '70%',
    alignItems: 'center',
    maxWidth: 320,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingTop: 17,
    paddingBottom: 28,
    backgroundColor: theme.colors.white,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'iAWriterQuattroS-Italic',
    letterSpacing: -0.21,
    fontSize: 20,
    lineHeight: 27,
    color: theme.colors.mineShaft,
    marginBottom: 18,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  small: {
    width: '60%',
  },
  medium: {
    width: '80%',
  },
  large: {
    width: '100%',
  },
})
