import React, { useRef, useEffect, useCallback, ReactNode } from 'react'
import { Animated, PanResponder, StyleSheet, View } from 'react-native'

import { clamp, multipleOf } from '@/utils/math'

function rubberband(distance: number, dimension: number, constant: number) {
  if (dimension === 0 || Math.abs(dimension) === Infinity) {
    return Math.pow(distance, constant * 5)
  }
  return (distance * dimension * constant) / (dimension + constant * distance)
}

function rubberbandIfOutOfBounds(
  position: number,
  min: number,
  max: number,
  constant = 0.55,
) {
  if (position < min) {
    return -rubberband(min - position, max - min, constant) + min
  }
  if (position > max) {
    return +rubberband(position - max, max - min, constant) + max
  }
  return position
}

function getSlideIndexFromDragOffset(
  offset: number,
  size: number,
  length: number,
) {
  const preComputedIndex = Math.round((-offset / size) * length)

  const index = clamp(preComputedIndex, 0, length - 1)

  return size ? index : 0
}

function snapOffset(position: any, size: any, axis: 'x' | 'y') {
  return {
    x: axis === 'x' ? multipleOf(position.x, size.width) : position.x,
    y: axis === 'y' ? multipleOf(position.y, size.height) : position.y,
  }
}

export interface CarouselProps {
  axis?: 'x' | 'y'
  disable?: boolean
  targetIndex?: number
  onSlideIndexChange?: (index: number) => void
  margins?: {
    top: number
    right: number
    bottom: number
    left: number
  }
  children: ReactNode
  length: number
}

export default function Carousel({
  children,
  axis = 'x',
  targetIndex = 1,
  onSlideIndexChange,
  disable,
  margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  length,
}: CarouselProps) {
  const isPanning = useRef(false)
  const offset = useRef({ x: -margins.left, y: -margins.top }).current
  const pan = useRef(new Animated.ValueXY(offset)).current
  const positions = useRef(new Animated.ValueXY(offset)).current

  const containerDimensions = useRef({ width: 0, height: 0 }).current
  const wrapperDimensions = useRef({ width: 0, height: 0 }).current

  const animateToPosition = (v: typeof offset) => {
    Animated.spring(positions, {
      useNativeDriver: false,
      tension: 3,
      friction: 10,
      toValue: {
        x: clamp(
          v.x,
          -(
            wrapperDimensions.width -
            containerDimensions.width -
            margins.right
          ),
          -margins.left,
        ),
        y: clamp(
          v.y,
          -(
            wrapperDimensions.height -
            containerDimensions.height -
            margins.bottom
          ),
          -margins.top,
        ),
      },
    }).start()
  }

  const computeIndex = (index: number, animate = false) => {
    if (axis === 'x') {
      offset.x = -((wrapperDimensions.width / length) * index) - margins.left
    } else {
      offset.y = -((wrapperDimensions.height / length) * index) - margins.top
    }
    onSlideIndexChange?.(index)

    if (animate) {
      animateToPosition(offset)
    } else {
      pan.stopAnimation()
      positions.stopAnimation()

      pan.setValue({ x: offset.x, y: offset.y })
      positions.setValue({ x: offset.x, y: offset.y })
    }
  }

  useEffect(() => {
    computeIndex(targetIndex, true)
  }, [targetIndex])

  const onContainerLayout = useCallback((e) => {
    containerDimensions.width = e.nativeEvent.layout.width
    containerDimensions.height = e.nativeEvent.layout.height
    computeIndex(targetIndex)
  }, [])

  const onWrapperLayout = useCallback((e) => {
    wrapperDimensions.width = e.nativeEvent.layout.width
    wrapperDimensions.height = e.nativeEvent.layout.height
    computeIndex(targetIndex)
  }, [])

  const getSlideIndex = useCallback(
    (v) => {
      const o = axis === 'x' ? v.x + margins.left : v.y + margins.top
      const d =
        axis === 'x' ? wrapperDimensions.width : wrapperDimensions.height

      onSlideIndexChange?.(getSlideIndexFromDragOffset(o, d, length))
    },
    [axis, margins, wrapperDimensions, length, onSlideIndexChange],
  )

  pan.addListener(({ x, y }) => {
    if (isPanning.current) {
      offset.x = x
      offset.y = y
      getSlideIndex(offset)

      positions.setValue({
        x: -rubberbandIfOutOfBounds(
          -x,
          margins.left,
          wrapperDimensions.width - containerDimensions.width + margins.right,
          0.25,
        ),
        y: -rubberbandIfOutOfBounds(
          -y,
          margins.top,
          wrapperDimensions.height -
            containerDimensions.height +
            margins.bottom,
          0.25,
        ),
      })
    }
  })

  positions.addListener((v) => {
    if (!isPanning.current && !disable) {
      offset.x = v.x
      offset.y = v.y
      getSlideIndex(offset)

      pan.setValue(v)
    }
  })

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      isPanning.current = true
      pan.setOffset(offset)
      positions.stopAnimation()
    },
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      pan.setValue({
        x: axis === 'x' ? gesture.dx : 0,
        y: axis === 'y' ? gesture.dy : 0,
      })
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: () => {
      isPanning.current = false
      const next = snapOffset(
        offset,
        {
          width: wrapperDimensions.width / length + margins.left,
          height: wrapperDimensions.height / length + margins.top,
        },
        axis,
      )

      animateToPosition(next)
    },
  })

  return (
    <View style={styles.container} onLayout={onContainerLayout}>
      <Animated.View
        {...(disable ? {} : panResponder.panHandlers)}
        style={[
          { transform: positions.getTranslateTransform() },
          styles.wrapper,
        ]}
        onLayout={onWrapperLayout}>
        {children}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  wrapper: {
    flexDirection: 'row',
  },
})
