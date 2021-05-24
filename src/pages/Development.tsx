import React from 'react'
import { Button, Text, View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'

import { BasicNavigationProp } from '@/lib/CustomNavigator'

export interface HomeProps {}
interface HomePropsWithNavigation extends HomeProps {
  navigation: BasicNavigationProp<RootNavigationParamList, 'Development'>
}

export default function Development({ navigation }: HomePropsWithNavigation) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Development mode</Text>
      <Button
        title="Go to App"
        onPress={() => navigation.navigate('HomeScreen', {})}
      />
      <Button
        title="Go to Examples"
        onPress={() => navigation.navigate('Examples', {})}
      />
    </View>
  )
}
