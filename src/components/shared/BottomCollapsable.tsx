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

interface BottomCollapsableProps {
  disabled?: boolean
  startOffset?: number
  endOffset?: number
  velocity?: number
  collapsed?: boolean
  tolerance?: number
  spring?: Omit<Animated.SpringAnimationConfig, 'toValue' | 'useNativeDriver'>
  style?: StyleProp<ViewStyle>
  onChange?: (collapsed: boolean) => void
  onResponderStart?: (event: GestureResponderEvent) => void
  onResponderRelease?: (event: GestureResponderEvent) => void
}

export default function BottomCollapsable({
  children,
  style,
  collapsed = true,
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
}: PropsWithChildren<BottomCollapsableProps>) {
  const [isCollapsed, _setIsCollapsed] = useState(collapsed)
  const containerRef = useRef()
  const shouldListen = useRef(true)
  const isDragging = useRef(false)
  const isMountTrigger = useRef(false)
  const { width, height } = useWindowDimensions()
  const [layout, onLayout] = useLayout()

  const final = useMemo(() => {
    return {
      x: 0,
      y: height - startOffset,
    }
  }, [startOffset, width, height])

  const initial = collapsed ? { ...final } : { x: 0, y: 0 }
  const values = useRef(new Animated.ValueXY(initial)).current
  const translations = useRef(new Animated.ValueXY(initial)).current
  const listened = useRef(initial).current

  const setIsCollapsed = useCallback(
    (payload, animate = true) => {
      _setIsCollapsed(payload)
      const toValue = payload
        ? final
        : {
            x: 0,
            y: height - layout.height - endOffset,
          }

      if (animate) {
        Animated.spring(values, {
          ...spring,
          useNativeDriver: false,
          toValue,
        }).start(() => (shouldListen.current = true))
      } else {
        values.setValue(toValue)
        translations.setValue(toValue)
        listened.x = toValue.x
        listened.y = toValue.y
        shouldListen.current = true
      }
      onChange?.(payload)
    },
    [layout, width, height, endOffset],
  )

  useEffect(() => {
    if (!isDragging.current && layout.height) {
      setIsCollapsed(collapsed, isMountTrigger.current)
      isMountTrigger.current = true
    }
  }, [layout, collapsed])

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
        values.stopAnimation()
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

          if (isCollapsed && vy < -velocity) {
            values.flattenOffset()
            shouldListen.current = false
            setIsCollapsed(false)
          }
          if (
            !isCollapsed &&
            vy > velocity &&
            listened.y > height - layout.height - endOffset
          ) {
            values.flattenOffset()
            shouldListen.current = false
            setIsCollapsed(true)
          }
        }
      },
      onPanResponderRelease: (e) => {
        values.flattenOffset()
        isDragging.current = false

        if (shouldListen.current) {
          setIsCollapsed(
            listened.y - (height - layout.height - endOffset) >=
              layout.height / 2,
          )
        }

        shouldListen.current = true
        onResponderRelease?.(e)
      },
    })
  }, [values, isCollapsed, velocity, endOffset, layout, width, height])

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
              setIsCollapsed(false)
            }
          }}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                height: startOffset || '100%',
                width: '100%',
                zIndex: isCollapsed ? 2 : -1,
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}
      {children}
    </Animated.View>
  )
}
