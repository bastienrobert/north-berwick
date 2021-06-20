import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  ImageProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import Video, { VideoProperties } from 'react-native-video'

import DialogBox, { DialogBoxProps } from './DialogBox'

export interface Dialog {
  start?: string
  end?: string
  content: string[]
}

export type BackgroundWithDialogProps = {
  name: DialogBoxProps['name']
  dialogs: Dialog[]
  hideOnEnd?: boolean
  arrow?: boolean
  style?: ViewStyle
  onEnd?: () => void
  onEndAfterLoop?: () => void
  onReadyForDisplay?: () => void
} & (
  | ({ type: 'video' } & Omit<VideoProperties, 'style'>)
  | ({ type: 'image' } & Omit<ImageProps, 'style'>)
)

/**
 * @todo
 * should add audio track here
 */
export default function BackgroundWithDialog(
  params: BackgroundWithDialogProps,
) {
  const {
    name,
    type,
    hideOnEnd = false,
    dialogs,
    style,
    arrow,
    onEnd,
    onEndAfterLoop,
    onReadyForDisplay,
    ...props
  } = params

  const isStartedRef = useRef(false)
  const endRef = useRef(false)
  const [dialogIndex, setDialogIndex] = useState(0)
  const opacity = useRef(new Animated.Value(0)).current
  const dialog = dialogs[dialogIndex]

  useEffect(() => {
    if (!isStartedRef.current && dialog) {
      isStartedRef.current = true
      endRef.current = false
      Animated.spring(opacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start()
    }
  }, [dialog])

  const onInnerEnd = useCallback(() => {
    isStartedRef.current = false
    endRef.current = true
    if (hideOnEnd) {
      Animated.spring(opacity, {
        useNativeDriver: false,
        toValue: 0,
      }).start(onEnd)
    } else {
      onEnd?.()
    }
  }, [onEnd])

  const onVideoEnd = useCallback(() => {
    if (endRef.current) {
      onEndAfterLoop?.()
    }
  }, [onInnerEnd])

  return (
    <View style={[styles.container, style]}>
      {type === 'video' ? (
        <Video
          {...(props as VideoProperties)}
          muted
          repeat
          onEnd={onVideoEnd}
          onReadyForDisplay={onReadyForDisplay}
          resizeMode="cover"
          style={styles.background}
        />
      ) : (
        <Image
          {...(props as ImageProps)}
          onLoadEnd={onReadyForDisplay}
          resizeMode="cover"
          style={styles.background}
        />
      )}
      {dialog && (
        <Animated.View style={{ opacity }}>
          <DialogBox
            name={name}
            arrow={arrow}
            onPress={() => {
              if (dialogIndex < dialogs.length - 1) {
                setDialogIndex((i) => i + 1)
              } else {
                endRef.current = true
                onInnerEnd()
              }
            }}
            activeOpacity={0.9}
            style={styles.subtitle}
            content={dialog.content.join(' ')}
          />
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  background: {
    width: '100%',
    flex: 1,
  },
  subtitle: {
    position: 'absolute',
    paddingHorizontal: 30,
    bottom: 42,
    width: '100%',
  },
})
