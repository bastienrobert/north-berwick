import React, { useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Video, { VideoProperties } from 'react-native-video'

import VideoDialogBox, { VideoDialogBoxProps } from './VideoDialogBox'

interface Dialog {
  content: string[]
}

interface VideoWithDialogProps extends Omit<VideoProperties, 'style'> {
  name: VideoDialogBoxProps['name']
  dialogs: Dialog[]
  arrow?: boolean
  style?: ViewStyle
  onEnd?: () => void
}

/**
 * uses `srt-to-json` script to convert SRT to JSON
 */
export default function VideoWithDialog({
  name,
  dialogs,
  style,
  arrow,
  onEnd,
  ...props
}: VideoWithDialogProps) {
  const [dialogIndex, setDialogIndex] = useState(0)
  const dialog = dialogs[dialogIndex]

  return (
    <View style={[styles.container, style]}>
      <Video {...props} repeat resizeMode="cover" style={styles.video} />
      {dialog && (
        <VideoDialogBox
          name={name}
          arrow={arrow}
          onPress={() => {
            if (dialogIndex < dialogs.length - 1) {
              setDialogIndex((i) => i + 1)
            } else {
              onEnd?.()
            }
          }}
          activeOpacity={0.9}
          style={styles.subtitle}
          content={dialog.content.join(' ')}
        />
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
