import React from 'react'
import { NavigationProp } from '@react-navigation/core'
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

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
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text>Scan cover!</Text>
        <Button
          title="Goto Castle"
          onPress={() => navigation.navigate('Chapter:Castle', {})}
        />
        <Button
          title="Goto Port"
          onPress={() => navigation.navigate('Chapter:Port', {})}
        />
        <Button
          title="Goto Church"
          onPress={() => navigation.navigate('Chapter:Church', {})}
        />
        <Button
          title="Goto GeillisHouse"
          onPress={() => navigation.navigate('Chapter:GeillisHouse', {})}
        />
        <ScanButton
          style={styles.button}
          onPress={() =>
            set({
              callbacks: {
                default: () => null,
                cover: () => {
                  navigation.navigate('Home:Introduction', {})
                  hide()
                },
              },
              // overlay: (
              //   <Image
              //     style={styles.scanOverlayImage}
              //     resizeMode="contain"
              //     source={require('@/assets/portraits/agnes_sampson.png')}
              //   />
              // ),
            })
          }
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanOverlayImage: {
    flex: 1,
    opacity: 0.4,
    width: '60%',
    maxWidth: 420,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 40,
  },
})
