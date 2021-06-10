import React, {
  PropsWithChildren,
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react'
import {
  StyleProp,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
  StyleSheet,
  useWindowDimensions,
  GestureResponderEvent,
} from 'react-native'

import useLayout from '@/hooks/useLayout'

import { rubberbandIfOutOfBounds } from '@/utils/rubberband'

interface BottomCollapsibleProps {
  disabled?: boolean
  startOffset?: number
  endOffset?: number
  velocity?: number
  tolerance?: number
  spring?: Omit<Animated.SpringAnimationConfig, 'toValue' | 'useNativeDriver'>
  style?: StyleProp<ViewStyle>
  onChange?: (collapsed: boolean) => void
  onResponderStart?: (event: GestureResponderEvent) => void
  onResponderRelease?: (event: GestureResponderEvent) => void
}

export default function BottomCollapsible({
  children,
  style,
  disabled = false,
  startOffset = 0,
  endOffset = 0,
  onChange,
  tolerance = 2,
  onResponderStart,
  onResponderRelease,
  spring = {
    friction: 22,
    tension: 50,
  },
  velocity = 2.5,
}: PropsWithChildren<BottomCollapsibleProps>) {
  const [collapsed, _setCollapsed] = useState(true)
  const containerRef = useRef()
  const shouldListen = useRef(true)
  const isDragging = useRef(false)
  const { width, height } = useWindowDimensions()
  const [layout, onLayout] = useLayout()

  const final = useMemo(() => {
    return {
      x: 0,
      y: height - startOffset,
    }
  }, [startOffset, width, height])

  const values = useRef(new Animated.ValueXY({ ...final })).current
  const translations = useRef(new Animated.ValueXY({ ...final })).current
  const listened = useRef({ x: 0, y: 0 }).current

  const setCollapsed = useCallback(
    (payload) => {
      _setCollapsed(payload)
      Animated.spring(values, {
        ...spring,
        useNativeDriver: false,
        toValue: payload
          ? final
          : {
              x: 0,
              y: height - layout.height - endOffset,
            },
      }).start(() => (shouldListen.current = true))
      onChange?.(payload)
    },
    [layout, width, height, endOffset],
  )

  useEffect(() => {
    const id = values.addListener(({ x, y }) => {
      translations.setValue({
        x,
        y: rubberbandIfOutOfBounds(
          y,
          height - layout.height - endOffset,
          final.y,
          0.25,
        ),
      })
      listened.x = x
      listened.y = y
    })

    return () => {
      values.removeListener(id)
    }
  }, [values, height, endOffset, layout.height, final, listened])

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onPanResponderGrant: () => {
        values.extractOffset()
        values.setValue({ x: 0, y: 0 })
        isDragging.current = true
      },
      onMoveShouldSetPanResponder: (e, gesture) => {
        if (Math.abs(gesture?.dx) > Math.abs(gesture?.dy)) {
          return false
        }
        onResponderStart?.(e)
        return true
      },
      onPanResponderMove: (_, { dy, vy }) => {
        if (shouldListen.current) {
          values.setValue({ x: 0, y: dy })

          if (collapsed && vy < -velocity) {
            values.flattenOffset()
            shouldListen.current = false
            setCollapsed(false)
          }
          if (
            !collapsed &&
            vy > velocity &&
            listened.y > height - layout.height - endOffset
          ) {
            values.flattenOffset()
            shouldListen.current = false
            setCollapsed(true)
          }
        }
      },
      onPanResponderRelease: (e) => {
        values.flattenOffset()
        isDragging.current = false

        if (shouldListen.current) {
          setCollapsed(
            listened.y - (height - layout.height - endOffset) >=
              layout.height / 2,
          )
        }

        shouldListen.current = true
        onResponderRelease?.(e)
      },
    })
  }, [values, collapsed, velocity, endOffset, layout, width, height])

  return (
    <Animated.View
      ref={containerRef}
      onLayout={onLayout}
      style={[
        style,
        {
          transform: translations.getTranslateTransform(),
        },
      ]}
      {...(disabled ? {} : panResponder.panHandlers)}>
      {!disabled && (
        <TouchableWithoutFeedback
          onPress={() => {
            if (Math.abs(final.y - Math.round(listened.y)) < tolerance) {
              setCollapsed(false)
            }
          }}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                height: startOffset || '100%',
                width: '100%',
                zIndex: collapsed ? 2 : -1,
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}
      {children}
    </Animated.View>
  )
}
