import useLayout from '@/hooks/useLayout'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

function SelectorKeyboardItem() {
  return <View style={styles.item}></View>
}

interface SelectorKeyboardProps {
  isOpen: boolean
}

export default function SelectorKeyboard({ isOpen }: SelectorKeyboardProps) {
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
        <SelectorKeyboardItem />
        <SelectorKeyboardItem />
        <SelectorKeyboardItem />
        <SelectorKeyboardItem />
        <SelectorKeyboardItem />
        <SelectorKeyboardItem />
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
  item: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    margin: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 27,
  },
  itemInner: {
    width: 46,
    height: 46,
  },
})
