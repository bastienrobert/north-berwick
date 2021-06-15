import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Video, { VideoProperties, OnProgressData } from 'react-native-video'

import VideoDialogBox from './VideoDialogBox'
import VideoSubtitleBox from './VideoSubtitleBox'

interface Subtitle {
  id: string
  start: string
  end: string
  content: string[]
}

interface VideoWithSubtitlesProps extends Omit<VideoProperties, 'style'> {
  dialog?: boolean
  subtitles?: Subtitle[]
  style?: ViewStyle
}

function parseTimeStringToDeciSecond(str: string) {
  const splitByComma = str.split(',')
  const splitByColon = splitByComma[0].split(':')

  let result = 0.0
  result = Math.round(parseInt(splitByComma[1]) / 100.0) / 10.0
  for (let i = 0; i < 3; i++) {
    result += parseFloat(splitByColon[i]) * Math.pow(60, 2 - i)
  }
  return Number((Math.floor(result * 10) / 10.0).toFixed(1))
}

/**
 * uses `srt-to-json` script to convert SRT to JSON
 */
export default function VideoWithSubtitles({
  dialog,
  onProgress,
  subtitles,
  style,
  ...props
}: VideoWithSubtitlesProps) {
  const [subtitleIndex, setSubtitleIndex] = useState(0)
  const [subtitle, setSubtitle] = useState<Subtitle>()
  const currentTimeRef = useRef(0)
  const subtitleStart = useRef<number>(0)
  const subtitleEnd = useRef<number>(0)

  useEffect(() => {
    if (subtitles?.[subtitleIndex]) {
      subtitleStart.current = parseTimeStringToDeciSecond(
        subtitles[subtitleIndex].start,
      )
      subtitleEnd.current = parseTimeStringToDeciSecond(
        subtitles[subtitleIndex].end,
      )

      updateSubtitle()
    }
  }, [subtitleIndex])

  const updateSubtitle = () => {
    if (currentTimeRef.current > subtitleEnd.current) {
      return setSubtitleIndex((i) => i + 1)
    }

    if (
      currentTimeRef.current > subtitleStart.current &&
      currentTimeRef.current < subtitleEnd.current
    ) {
      // subtitles exists if subtitleEnd.current is set > 0 (won't pass unless)
      setSubtitle(subtitles![subtitleIndex])
    } else {
      setSubtitle(undefined)
    }
  }

  const _onProgress = (d: OnProgressData) => {
    currentTimeRef.current = Math.floor(d.currentTime * 10) / 10.0
    updateSubtitle()
    onProgress?.(d)
  }

  return (
    <View style={[styles.container, style]}>
      <Video
        {...props}
        resizeMode="cover"
        onProgress={_onProgress}
        style={styles.video}
      />
      {subtitle && (
        <VideoSubtitleBox
          name="XX"
          style={styles.subtitle}
          children={subtitle.content.join(' ')}
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
