import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import SelectorKeyboardItem, {
  SelectorKeyboardItemParams,
} from './SelectorKeyboardItem'

import useLayout from '@/hooks/useLayout'

export type SelectorKeyboardItems = Record<string, SelectorKeyboardItemParams>

export interface SelectorKeyboardProps {
  items: SelectorKeyboardItems
  isOpen: boolean
  onChoose: (name: string) => void
}

export default function SelectorKeyboard({
  onChoose,
  items,
  isOpen,
}: SelectorKeyboardProps) {
  const transform = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const [layout, onLayout] = useLayout()

  useEffect(() => {
    Animated.spring(transform, {
      useNativeDriver: false,
      toValue: {
        x: 0,
        y: isOpen ? -layout.height : 0,
      },
      friction: 8,
      tension: 20,
    }).start()
  }, [isOpen, layout])

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: transform.getTranslateTransform() },
      ]}
      onLayout={onLayout}>
      <Text style={styles.text}>Le Savoir</Text>
      <View style={styles.wrapper}>
        {Object.entries(items).map(([name, item], i) => (
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
    width: '80%',
  },
})