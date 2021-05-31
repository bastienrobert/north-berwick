import React from 'react'
import { Button, Text, View } from 'react-native'

import { ExampleNavigationParamList } from '@/pages/examples'
import { BasicNavigationProp } from '@/lib/CustomNavigator'

export interface HomeProps {}
interface HomePropsWithNavigation extends HomeProps {
  navigation: BasicNavigationProp<ExampleNavigationParamList, 'Home'>
}

export default function HomeScreen({ navigation }: HomePropsWithNavigation) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home', {})}
      />
      <Button
        title="Go to ARScene"
        onPress={() => navigation.navigate('ARScene', {})}
      />
      <Button
        title="Go to ThreeDScene"
        onPress={() => navigation.navigate('ThreeDScene', {})}
      />
      <Button
        title="Go to FlipCard"
        onPress={() => navigation.navigate('FlipCard', {})}
      />
      <Button
        title="Go to DragZone"
        onPress={() => navigation.navigate('DragZone', {})}
      />
      <Button
        title="Go to ScrollVideoScreen"
        onPress={() => navigation.navigate('ScrollVideoScreen', {})}
      />
      <Button
        title="Go to CarouselDemo"
        onPress={() => navigation.navigate('CarouselDemo', {})}
      />
    </View>
  )
}
