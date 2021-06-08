import React from 'react'
import { View, Image } from 'react-native'
import VideoWithSubtitles from '@/components/VideoWithSubtitles'
import VideoWithDialog from '@/components/VideoWithDialog'

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

      <VideoWithDialog
        name="Agnes"
        source={require('@/assets/tmp/storm.mp4')}
        dialogs={require('@/assets/tmp/videos/out.json')}
      />
    </View>
  )
}
