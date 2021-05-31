import React from 'react'
import { Button, Text, View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'

import { BasicNavigationProp } from '@/lib/CustomNavigator'
import { useScan } from '@/App/Scan/ScanProvider'

export interface HomeProps {}
interface HomePropsWithNavigation extends HomeProps {
  navigation: BasicNavigationProp<RootNavigationParamList, 'Development'>
}

export default function Development({ navigation }: HomePropsWithNavigation) {
  const { set, reset } = useScan()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Development mode</Text>
      <Button
        title="Go to App"
        onPress={() => navigation.navigate('Home:Splash', {})}
      />
      <Button
        title="Go to Examples"
        onPress={() => navigation.navigate('Examples', {})}
      />
      <Button
        title="Open Viewer"
        onPress={() =>
          set({
            map_castle: () => reset(),
            default: () => console.log('NOPE'),
          })
        }
      />
    </View>
  )
}
