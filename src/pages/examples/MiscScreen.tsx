import React from 'react'
import { View, Image } from 'react-native'
import VideoWithSubtitles from '@/components/VideoWithSubtitles'
import VideoWithDialog from '@/components/VideoWithDialog'
import Summary from '@/components/Summary'
import WebPImage from '@/components/shared/WebPImage'

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

      <WebPImage
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
      />

      {/* <WebPImage
        source={require('@/assets/images/tortures/bride.webp')}
        style={{ width: '33%', height: '33%' }}
        resizeMode={WebPImage.resizeMode.contain}
      /> */}
    </View>
  )
}
