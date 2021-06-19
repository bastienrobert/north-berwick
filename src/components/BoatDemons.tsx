import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Video from 'react-native-video'

import Fade from '@/components/shared/Fade'
import WebPImage, { WebPImageProps } from '@/components/shared/WebPImage'

interface DemonProps {
  style: StyleProp<ViewStyle>
  pressed: boolean
  onPress: () => void
  source: WebPImageProps['source']
}

function Demon({ style, pressed, onPress, source }: DemonProps) {
  const opacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.spring(opacity, {
      useNativeDriver: false,
      toValue: pressed ? 0 : 1,
    }).start()
  }, [pressed, opacity])

  return (
    <TouchableOpacity disabled={pressed} onPress={onPress} style={style}>
      <Animated.View style={[styles.animated, { opacity }]}>
        <WebPImage source={source} style={styles.image} />
      </Animated.View>
    </TouchableOpacity>
  )
}

interface BoatDemons {
  onEnd: () => void
}

export default function BoatDemons({ onEnd }: BoatDemons) {
  const [end, setEnd] = useState(false)
  const [selected, setSelected] = useState([false, false, false])

  const onBackgroundEnd = useCallback(() => {
    if (selected.every((s) => s === true)) {
      setEnd(true)
    }
  }, [selected])

  return (
    <View style={styles.container}>
      <Fade start initial={1} fadeIn={false} />
      <Video
        muted
        repeat
        onEnd={onBackgroundEnd}
        source={require('@/assets/videos/demon_background.mp4')}
        style={styles.background}
        resizeMode="cover"
      />
      <Video
        muted
        paused={!end}
        onEnd={onEnd}
        source={require('@/assets/videos/demon_end.mp4')}
        style={[StyleSheet.absoluteFill, { zIndex: end ? 1 : -1 }]}
        resizeMode="cover"
      />
      <Demon
        style={styles.demon_first}
        pressed={selected[0]}
        onPress={() =>
          setSelected((s) => {
            s[0] = true
            return [...s]
          })
        }
        source={require('@/assets/images/demons/demon_first.webp')}
      />
      <Demon
        style={styles.demon_second}
        pressed={selected[1]}
        onPress={() =>
          setSelected((s) => {
            s[1] = true
            return [...s]
          })
        }
        source={require('@/assets/images/demons/demon_second.webp')}
      />
      <Demon
        style={styles.demon_third}
        pressed={selected[2]}
        onPress={() =>
          setSelected((s) => {
            s[2] = true
            return [...s]
          })
        }
        source={require('@/assets/images/demons/demon_third.webp')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  animated: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  demon_first: {
    position: 'absolute',
    width: '120%',
    aspectRatio: 1,
    right: '-60%',
    top: '5%',
  },
  demon_second: {
    position: 'absolute',
    width: '120%',
    aspectRatio: 1,
    bottom: '-10%',
  },
  demon_third: {
    position: 'absolute',
    width: '150%',
    aspectRatio: 1,
    left: '-60%',
    top: '10%',
  },
})
