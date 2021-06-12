import React, { useState } from 'react'
import {
  Animated,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import FullScreenIcon from '@/components/icons/FullScreenIcon'
import RoundedButton from '@/components/shared/RoundedButton'
import { Portal } from '@/lib/Portal'
import LinearGradient from '../shared/LinearGradient'
import ArrowLeftIcon from '../icons/ArrowLeftIcon'

interface InnerPosterProps {
  width: number | string
  aspectRatio: number
}

export default function InnerPoster({ width, aspectRatio }: InnerPosterProps) {
  const [isPosterVisible, setIsPosterVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { width, aspectRatio }]} />
      {isPosterVisible && (
        <Portal>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            stops={[
              { offset: '0', stopColor: '#ffe5e3' },
              { offset: '0.48', stopColor: '#fff0ef' },
              { offset: '1', stopColor: '#fff' },
            ]}
          />
          <SafeAreaView>
            <RoundedButton
              large
              style={styles.backButton}
              onPress={() => setIsPosterVisible(false)}>
              <ArrowLeftIcon />
            </RoundedButton>
          </SafeAreaView>
        </Portal>
      )}
      <RoundedButton onPress={() => setIsPosterVisible(true)}>
        <FullScreenIcon />
      </RoundedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 10,
    alignItems: 'center',
  },
  wrapper: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
    marginBottom: 15,
    borderRadius: 6,
    overflow: 'hidden',
  },
  backButton: {
    marginTop: 15,
    marginLeft: 15,
  },
  content: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'green',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
})
