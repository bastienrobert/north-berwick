import React, { PropsWithChildren, useCallback, useState } from 'react'
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'

export type TouchableOpacityOrViewProps = {
  large?: boolean
} & (
  | ({
      onPress: TouchableOpacityProps['onPress']
      onPressOut?: TouchableOpacityProps['onPressOut']
      pressedStyle?: StyleProp<ViewStyle>
    } & TouchableOpacityProps)
  | ({
      onPress?: undefined
      onPressOut?: undefined
      pressedStyle?: undefined
    } & ViewProps)
)

export default function RoundedButton({
  large = false,
  onPress,
  onPressOut,
  style,
  pressedStyle,
  children,
  ...rest
}: PropsWithChildren<TouchableOpacityOrViewProps>) {
  const [isPress, setIsPress] = useState(false)

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      setIsPress(true)
      // onPress exists if TouchableWithoutFeedback is created
      onPress!(event)
    },
    [onPress],
  )

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      setIsPress(false)
      onPressOut?.(event)
    },
    [onPressOut],
  )

  if (onPress) {
    return (
      <TouchableOpacity
        onPressIn={handlePress}
        onPressOut={handlePressOut}
        style={[style, isPress ? pressedStyle : false]}
        {...rest}>
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <View style={style} {...rest}>
      {children}
    </View>
  )
}
