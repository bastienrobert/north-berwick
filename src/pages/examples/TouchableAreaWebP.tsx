import React from 'react'
import { View, Image } from 'react-native'
import Video from 'react-native-video'
import FastImage from 'react-native-fast-image'

export default function TouchableAreaWebP() {
  return (
    <View style={{ flex: 1 }}>
      <Video
        repeat
        resizeMode="cover"
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        source={require('@/assets/tmp/storm.mp4')}
      />
      <FastImage
        style={{ position: 'absolute', width: 200, height: 200 }}
        source={require('@/assets/tmp/animated-webp-supported.webp')}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  )
}
