import React, { useCallback, useRef, useState } from 'react'
import { Animated, StyleSheet, View, ViewStyle } from 'react-native'
import Video, { VideoProperties } from 'react-native-video'

import VideoDialogBox, { VideoDialogBoxProps } from './VideoDialogBox'

interface Dialog {
  content: string[]
}

export interface VideoWithDialogProps extends Omit<VideoProperties, 'style'> {
  name: VideoDialogBoxProps['name']
  dialogs: Dialog[]
  hideOnEnd?: boolean
  arrow?: boolean
  style?: ViewStyle
  onEnd?: () => void
}

/**
 * uses `srt-to-json` script to convert SRT to JSON
 */
export default function VideoWithDialog({
  name,
  hideOnEnd = false,
  dialogs,
  style,
  arrow,
  onEnd,
  ...props
}: VideoWithDialogProps) {
  const [dialogIndex, setDialogIndex] = useState(0)
  const opacity = useRef(new Animated.Value(1)).current
  const dialog = dialogs[dialogIndex]

  const onInnerEnd = useCallback(() => {
    if (hideOnEnd) {
      Animated.spring(opacity, {
        useNativeDriver: false,
        toValue: 0,
      }).start(onEnd)
    } else {
      onEnd?.()
    }
  }, [onEnd])

  return (
    <View style={[styles.container, style]}>
      <Video {...props} repeat resizeMode="cover" style={styles.video} />
      {dialog && (
        <Animated.View style={{ opacity }}>
          <VideoDialogBox
            name={name}
            arrow={arrow}
            onPress={() => {
              if (dialogIndex < dialogs.length - 1) {
                setDialogIndex((i) => i + 1)
              } else {
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
    flex: 1,
  },
  video: {
    flex: 1,
  },
  subtitle: {
    position: 'absolute',
    paddingHorizontal: 30,
    bottom: 42,
    width: '100%',
  },
})
