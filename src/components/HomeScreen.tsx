import { RootStackParamList } from '@/App'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Button, Text, View } from 'react-native'

export interface HomeProps {}
interface HomePropsWithNavigation extends HomeProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

export default function HomeScreen({ navigation }: HomePropsWithNavigation) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to AR"
        onPress={() => navigation.navigate('ARScene', {})}
      />
      <Button
        title="Go to 3D"
        onPress={() => navigation.navigate('ThreeDScene', {})}
      />
    </View>
  )
}
