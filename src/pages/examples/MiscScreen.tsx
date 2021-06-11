import React from 'react'
import { View, Image } from 'react-native'
import VideoWithSubtitles from '@/components/VideoWithSubtitles'
import VideoWithDialog from '@/components/VideoWithDialog'
import Summary from '@/components/Summary'

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

      <Summary
        title="Récapitulatif"
        titleColor="#480D00"
        button="Retourner au château"
        onPress={() => {}}
        content={[
          {
            text:
              'Selon Mr Seaton, Geillis aurait eu des pouvoirs de guérison grâce à',
            label: 'La Sorcellerie',
          },
          {
            text:
              "Afin de la faire avouer, Mr Seaton la fit torturer à l'aide de",
            label: 'Brodequins',
          },
          {
            text:
              'En réalité, Geillis était capable de prodiguer des soins car elle était ',
            label: 'Guérisseuse',
          },
          {
            text: "Geillis s'échappait la nuit afin de pratiquer",
            label: 'La Médecine',
          },
        ]}
        colors={['#ffe5e3', '#fff0ef', '#ffffff']}
      />
    </View>
  )
}
