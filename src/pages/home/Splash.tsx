import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'
import ScanButton from '@/components/ScanButton'
import { useScan } from '@/App/Scan/ScanProvider'

export interface HomeSplashProps {}
type HomeSplashPropsWithNavigation = HomeSplashProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Home:Splash'>
}

export default function HomeSplash({
  navigation,
}: HomeSplashPropsWithNavigation) {
  const { set, hide } = useScan()

  return (
    <SafeAreaView>
      <Text>Scan cover!</Text>
      <ScanButton
        onPress={() =>
          set({
            callbacks: {
              default: () => null,
              map_castle: () => {
                navigation.navigate('Chapter:Castle', {})
                hide()
              },
              map_port: () => false,
              map_geillis: () => false,
              map_church: () => false,
            },
            // overlay: (
            //   <Image
            //     style={styles.scanOverlayImage}
            //     source={require('@/assets/agnes_sampson-overlay.png')}
            //   />
            // ),
          })
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scanOverlayImage: {
    width: '80%',
    maxWidth: 420,
  },
})
