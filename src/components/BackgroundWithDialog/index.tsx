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

import useSound from '@/hooks/useSound'

import { srtToSeconds } from '@/utils/srt'

export interface Dialog {
  start: string
  end: string
  content: string[]
}

export type BackgroundWithDialogCommonProps = {
  name: DialogBoxProps['name']
  dialogs: Dialog[]
  play?: boolean
  sound: string
  hideOnEnd?: boolean
  arrow?: boolean
  style?: ViewStyle
  onEnd?: () => void
  onEndAfterLoop?: () => void
  onReadyForDisplay?: () => void
}

export type BackgroundWithDialogProps = BackgroundWithDialogCommonProps &
  (
    | ({ type: 'video' } & Omit<VideoProperties, 'style'>)
    | ({ type: 'image' } & Omit<ImageProps, 'style'>)
  )

export default function BackgroundWithDialog(
  params: BackgroundWithDialogProps,
) {
  const {
    name,
    type,
    play = true,
    sound,
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

  const dialog = play ? dialogs[dialogIndex] : undefined

  const [soundPlay, soundPause, soundStop, { seek }] = useSound(sound, {
    onCurrentTime: (s) => {
      if (dialog && s > srtToSeconds(dialog.end)) {
        soundPause()
      }
    },
  })

  useEffect(() => {
    if (play) {
      soundPlay()
    }
  }, [play])

  useEffect(() => {
    if (!isStartedRef.current && dialog && play) {
      isStartedRef.current = true
      endRef.current = false
      Animated.spring(opacity, {
        useNativeDriver: false,
        toValue: 1,
      }).start()
    }
    if (dialog && play && !endRef.current) {
      seek(srtToSeconds(dialog.start))
      soundPlay()
    }
  }, [dialogIndex, play])

  const onInnerEndCallback = useCallback(() => {
    soundStop()
    onEnd?.()
  }, [onEnd, soundStop])

  const onInnerEnd = useCallback(() => {
    isStartedRef.current = false
    endRef.current = true
    if (hideOnEnd) {
      Animated.spring(opacity, {
        useNativeDriver: false,
        toValue: 0,
      }).start(onInnerEndCallback)
    } else {
      onInnerEndCallback()
    }
  }, [onInnerEndCallback])

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
                setDialogIndex(dialogIndex + 1)
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
