import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, ViewStyle, TextStyle, StyleSheet, Animated } from 'react-native'

interface RevealAnimatedTextProps {
  content: string
  style?: ViewStyle
  textStyle?: TextStyle
  reveal?: boolean
  duration?: number
  onFinish?: (isRevealed: boolean) => void
}

export default function RevealAnimatedText({
  style,
  textStyle,
  reveal,
  content = '',
  duration = 600,
  onFinish,
}: RevealAnimatedTextProps) {
  const [text, setText] = useState<string[]>([])
  const animatedValues = useRef<Animated.Value[]>([])
  const animations = useRef<Animated.CompositeAnimation[]>([])

  const animate = useCallback(
    (toValue: number) => {
      animations.current = text.map((_, i) => {
        return Animated.timing(animatedValues.current[i], {
          useNativeDriver: false,
          toValue,
          duration,
        })
      })
      Animated.stagger(
        duration / 5,
        toValue === 0 ? animations.current.reverse() : animations.current,
      ).start(() => {
        if (onFinish) onFinish(toValue === 1)
      })
    },
    [animations, animatedValues, text, duration, onFinish],
  )

  useEffect(() => {
    const t = content.trim().split(' ')
    animatedValues.current = t.map((_, i) => new Animated.Value(0))
    setText(t)
  }, [content])

  useEffect(() => {
    reveal ? animate(1) : animate(0)
  }, [reveal, text, animate])

  return (
    <View style={[style, styles.textWrapper]}>
      {text.map((v, i) => {
        return (
          <Animated.Text
            key={i}
            style={[
              textStyle,
              {
                opacity: animatedValues.current[i],
                transform: [
                  {
                    translateY: Animated.multiply(
                      animatedValues.current[i],
                      new Animated.Value(-2),
                    ),
                  },
                ],
              },
            ]}>
            {v}
            {i < text.length ? ' ' : ''}
          </Animated.Text>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
