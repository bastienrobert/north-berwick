import React, { useEffect } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { SafeAreaView, StyleSheet, Image, Text, View } from 'react-native'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'
import { useScan } from '@/App/Scan/ScanProvider'

import LogoIcon from '@/assets/logo.svg'
import ScanButton from '@/components/ScanButton'

import theme from '@/styles/theme'
import useAudio from '@/hooks/useAudio'
import { useMainSound } from '@/App/MainSoundProvider'

export interface HomeSplashProps {}
type HomeSplashPropsWithNavigation = HomeSplashProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Home:Splash'>
}

export default function HomeSplash({
  navigation,
}: HomeSplashPropsWithNavigation) {
  const t = useTranslate()
  const { set, hide } = useScan()

  const { setParams: setMainSound } = useMainSound()

  useEffect(() => {
    setMainSound({
      source: require('@/assets/musics/theme_loop.mp3'),
      options: {
        autoPlay: true,
        fadeIn: 2000,
        fadeOut: 2000,
        loop: true,
      },
    })
  }, [])

  // useAudio(require('@/assets/musics/theme_loop.mp3'), {
  //   autoPlay: true,
  //   fadeIn: true,
  //   fadeOut: true,
  //   loop: true,
  // })

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/splash/background_top.png')}
        resizeMode="cover"
        style={styles.backgroundTop}
      />
      <Image
        source={require('@/assets/images/splash/background_bottom.png')}
        resizeMode="cover"
        style={styles.backgroundBottom}
      />
      <Image
        source={require('@/assets/images/splash/background.jpg')}
        resizeMode="cover"
        style={styles.background}
      />
      <SafeAreaView style={styles.container}>
        <LogoIcon style={styles.logo} />
        <ScanButton
          style={styles.button}
          onPress={() =>
            set({
              wrongPlaceLabel: t('not_good_place'),
              callbacks: {
                default: () => false,
                /**
                 * @todo
                 * should change w/ cover
                 */
                map_castle: () => {
                  navigation.navigate('Home:Introduction', {})
                  setTimeout(() => hide())
                },
                map_church: () => {
                  console.log('CHURCH')
                },
              },
            })
          }
        />
        <Text style={styles.text}>{t('splash_text')}</Text>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  backgroundTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  backgroundBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  logo: {
    width: '60%',
    marginTop: 45,
    aspectRatio: 1,
    maxHeight: 480,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 9,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: 'iAWriterQuattroS-Regular',
    letterSpacing: -0.21,
    width: '80%',
    maxWidth: 370,
    fontSize: 16,
    marginBottom: 24,
  },
})
