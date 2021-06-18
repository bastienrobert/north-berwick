import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import VideoWithDialog from '@/components/VideoWithDialog'
import Card from '@/components/Card'
import FlippableCarousel from '@/components/FlippableCarousel'
import BoatDemons from '@/components/BoatDemons'

export default function TouchableAreaWebP() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Video
        repeat
        resizeMode="cover"
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        source={require('@/assets/tmp/storm.mp4')}
      /> */}

      {/* <VideoWithDialog
        name="Agnes"
        source={require('@/assets/tmp/storm.mp4')}
        dialogs={require('@/assets/tmp/videos/out.json')}
      /> */}

      {/* <BoatDemons onEnd={() => null} /> */}

      <View style={{ width: '90%', flex: 1, alignSelf: 'center' }}>
        <FlippableCarousel
          data={[
            [
              {
                front: (
                  <Card
                    number={1}
                    color="purple"
                    title={['Hellow', 'World']}
                    bottom={'hey'}
                  />
                ),
              },
              {
                front: (
                  <Card
                    number={2}
                    color="purple"
                    title={['Hellow', 'World']}
                    bottom={'hey'}
                  />
                ),
              },
            ],
            [
              {
                front: (
                  <Card
                    number={3}
                    color="blue"
                    title={['Hellow', 'World']}
                    bottom={'hey'}
                  />
                ),
              },
              {
                front: (
                  <Card
                    number={3}
                    color="blue"
                    title={['Hellow', 'World']}
                    bottom={'hey'}
                  />
                ),
              },
            ],
          ]}
        />
      </View>

      {/* <WebPImage
        source={require('@/assets/images/tortures/bride.webp')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '33%',
          height: '33%',
          zIndex: 2,
        }}
        resizeMode={WebPImage.resizeMode.contain}
      />
      <WebPImage
        source={require('@/assets/images/tortures/gresillon.webp')}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '33%',
          height: '33%',
          zIndex: 2,
        }}
        resizeMode={WebPImage.resizeMode.contain}
      />
      <VideoWithDialog
        name="Agnes"
        source={require('@/assets/tmp/storm.mp4')}
        dialogs={require('@/assets/tmp/videos/out.json')}
      /> */}

      {/* <WebPImage
        source={require('@/assets/images/tortures/bride.webp')}
        style={{ width: '33%', height: '33%' }}
        resizeMode={WebPImage.resizeMode.contain}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61dafb',
    height: '100%',
    borderRadius: 4,
  },
  inner: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // userSelect: 'none',
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 4,
  },
})
