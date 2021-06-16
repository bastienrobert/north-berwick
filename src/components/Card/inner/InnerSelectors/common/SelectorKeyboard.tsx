import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import SelectorKeyboardItem, {
  SelectorKeyboardItemParams,
} from './SelectorKeyboardItem'

import useLayout from '@/hooks/useLayout'

export type SelectorKeyboardItems = SelectorKeyboardItemParams[]

export interface SelectorKeyboardProps {
  label: string
  onChoose: (name: string) => void
  items?: SelectorKeyboardItems
}

function getWrapperStyleByLength(length: number) {
  switch (length) {
    case 4:
      return styles.wrapper4
    case 6:
      return styles.wrapper6
    case 8:
      return styles.wrapper8
    default:
      return null
  }
}

export default function SelectorKeyboard({
  label,
  onChoose,
  items,
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
          getWrapperStyleByLength(innerItems?.length ?? 0),
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
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'iAWriterQuattroS-Italic',
    letterSpacing: -0.21,
    fontSize: 20,
    lineHeight: 27,
    color: '#2C2C2C',
    marginBottom: 18,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  wrapper4: {
    width: '60%',
  },
  wrapper6: {
    width: '80%',
  },
  wrapper8: {
    width: '100%',
  },
})
