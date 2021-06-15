import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import RoundedButton from '@/components/shared/RoundedButton'
import LinearGradient from '@/components/shared/LinearGradient'
import FullScreenIcon from '@/components/icons/FullScreenIcon'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'

import { Portal } from '@/lib/Portal'

interface InnerPosterProps {
  width: number | string
  aspectRatio: number
  placeholder: ReactNode
  onBack?: () => void
  visible?: boolean
  fullscreen?: boolean
}

export default function InnerPoster({
  children,
  placeholder,
  fullscreen = true,
  onBack,
  width,
  visible,
  aspectRatio,
}: PropsWithChildren<InnerPosterProps>) {
  const [isPosterVisible, setIsPosterVisible] = useState(visible)

  useEffect(() => {
    if (!isPosterVisible) onBack?.()
  }, [isPosterVisible])

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { width, aspectRatio }]}>
        {placeholder}
      </View>
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
          <SafeAreaView style={styles.backButton}>
            <RoundedButton large onPress={() => setIsPosterVisible(false)}>
              <ArrowLeftIcon />
            </RoundedButton>
          </SafeAreaView>
          <View style={{ flex: 1 }}>{children}</View>
        </Portal>
      )}
      <RoundedButton
        disabled={!fullscreen}
        onPress={() => setIsPosterVisible(true)}>
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
    marginBottom: 15,
    borderRadius: 6,
    overflow: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 2,
  },
  content: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
})
