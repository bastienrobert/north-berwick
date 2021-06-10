import React, {
  PropsWithChildren,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  memo,
} from 'react'
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  View,
} from 'react-native'

import { clamp, multipleOf } from '@/utils/math'
import { rubberbandIfOutOfBounds } from '@/utils/rubberband'

function getSlideIndexFromDragOffset(
  offset: number,
  size: number,
  length: number,
) {
  const preComputedIndex = Math.round((-offset / size) * length)
  const index = clamp(preComputedIndex, 0, length - 1)
  return size ? index : 0
}

function snapOffset(
  position: { x: number; y: number },
  size: { width: number; height: number },
  axis: 'x' | 'y',
) {
  return {
    x: axis === 'x' ? multipleOf(position.x, size.width) : position.x,
    y: axis === 'y' ? multipleOf(position.y, size.height) : position.y,
  }
}

export interface CarouselMargins {
  top: number
  right: number
  bottom: number
  left: number
}

export interface CarouselProps {
  axis?: 'x' | 'y'
  disabled?: boolean
  targetIndex?: number
  forceSnap?: boolean
  onSlideIndexChange?: (index: number) => void
  onResponderStart?: (event: GestureResponderEvent) => void
  onResponderRelease?: (event: GestureResponderEvent) => void
  margins?: CarouselMargins
  length: number
}

export default function Carousel({
  children,
  axis = 'x',
  targetIndex = 0,
  onSlideIndexChange,
  onResponderStart,
  onResponderRelease,
  disabled,
  margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  length,
}: PropsWithChildren<CarouselProps>) {
  const isPanning = useRef(false)
  const slideIndex = useRef(targetIndex)
  const offset = useRef({ x: -margins.left, y: -margins.top }).current
  const pan = useRef(new Animated.ValueXY(offset)).current
  const positions = useRef(new Animated.ValueXY(offset)).current
  const animation = useRef<Animated.CompositeAnimation>()

  const containerDimensions = useRef({ width: 0, height: 0 }).current
  const wrapperDimensions = useRef({ width: 0, height: 0 }).current

  const animateToPosition = (v: typeof offset) => {
    if (animation.current) animation.current.stop()
    animation.current = Animated.spring(positions, {
      useNativeDriver: false,
      tension: 40,
      friction: 15,
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
    })
    animation.current.start()
  }

  const computeIndex = (index: number, animate = false) => {
    if (axis === 'x') {
      offset.x = -((wrapperDimensions.width / length) * index) - margins.left
    } else {
      offset.y = -((wrapperDimensions.height / length) * index) - margins.top
    }

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
    if (!isPanning.current && slideIndex.current !== targetIndex) {
      computeIndex(targetIndex, true)
      slideIndex.current = targetIndex
    }
  }, [isPanning, targetIndex])

  const onContainerLayout = useCallback(
    (e) => {
      containerDimensions.width = e.nativeEvent.layout.width
      containerDimensions.height = e.nativeEvent.layout.height
      computeIndex(targetIndex)
    },
    [computeIndex],
  )

  const onWrapperLayout = useCallback(
    (e) => {
      wrapperDimensions.width = e.nativeEvent.layout.width
      wrapperDimensions.height = e.nativeEvent.layout.height
      computeIndex(targetIndex)
    },
    [computeIndex],
  )

  const getSlideIndex = useCallback(
    (v) => {
      const currentSlideIndex = getSlideIndexFromDragOffset(
        axis === 'x' ? v.x + margins.left : v.y + margins.top,
        axis === 'x' ? wrapperDimensions.width : wrapperDimensions.height,
        length,
      )
      if (currentSlideIndex !== slideIndex.current) {
        slideIndex.current = currentSlideIndex
        if (onSlideIndexChange) onSlideIndexChange(currentSlideIndex)
      }
    },
    [axis, margins, wrapperDimensions, length, onSlideIndexChange],
  )

  useEffect(() => {
    const id = pan.addListener(({ x, y }) => {
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

    return () => {
      pan.removeListener(id)
    }
  }, [pan, isPanning, positions, wrapperDimensions, containerDimensions])

  useEffect(() => {
    const id = positions.addListener((v) => {
      if (!isPanning.current && !disabled) {
        offset.x = v.x
        offset.y = v.y

        getSlideIndex(offset)

        pan.setValue(v)
      }
    })

    return () => {
      positions.removeListener(id)
    }
  }, [positions, isPanning, disabled, pan])

  const panResponder = useMemo(() => {
    return PanResponder.create({
      // onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        isPanning.current = true
        pan.setOffset(offset)

        positions.stopAnimation()
        pan.stopAnimation()
      },
      onMoveShouldSetPanResponder: (e, gesture) => {
        if (axis === 'x' && Math.abs(gesture?.dx) < Math.abs(gesture?.dy)) {
          return false
        } else if (
          axis === 'y' &&
          Math.abs(gesture?.dy) < Math.abs(gesture?.dx)
        ) {
          return false
        }
        onResponderStart?.(e)
        return true
      },
      onPanResponderMove: (_, gesture) => {
        pan.setValue({
          x: axis === 'x' ? gesture.dx : 0,
          y: axis === 'y' ? gesture.dy : 0,
        })
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (e, { vx, vy }) => {
        isPanning.current = false
        offset.x += clamp(vx * 120, -180, 180)
        offset.y += clamp(vy * 120, -180, 180)
        const next = snapOffset(
          offset,
          {
            width: wrapperDimensions.width / length + margins.left,
            height: wrapperDimensions.height / length + margins.top,
          },
          axis,
        )

        animateToPosition(next)
        onResponderRelease?.(e)
      },
    })
  }, [axis, length, positions, pan, offset, wrapperDimensions])

  return (
    <View
      style={{
        flexDirection: axis === 'x' ? 'row' : 'column',
        width: '100%',
      }}
      onLayout={onContainerLayout}>
      <Animated.View
        {...(disabled ? {} : panResponder.panHandlers)}
        style={[
          {
            flexDirection: axis === 'x' ? 'row' : 'column',
            borderWidth: 1,
            borderColor: 'red',
            borderStyle: 'solid',
          },
          { transform: positions.getTranslateTransform() },
        ]}
        onLayout={onWrapperLayout}>
        {children}
      </Animated.View>
    </View>
  )
}

export const MemoizedCarousel = memo(Carousel)
