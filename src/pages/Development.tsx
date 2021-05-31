import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'

import { BasicNavigationProp } from '@/lib/CustomNavigator'
import { useScan } from '@/App/Scan/ScanProvider'
import { clamp } from '@/utils/math'
import Carousel from '@/components/shared/Carousel'

export interface HomeProps {}
interface HomePropsWithNavigation extends HomeProps {
  navigation: BasicNavigationProp<RootNavigationParamList, 'Development'>
}

export default function Development({ navigation }: HomePropsWithNavigation) {
  const { set, reset } = useScan()
  const [index, setIndex] = useState(1)

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="L" onPress={() => setIndex(clamp(index - 1, 0, 2))} />
        <View
          style={{
            borderColor: 'red',
            borderStyle: 'solid',
            borderWidth: 1,
          }}>
          <View style={{ width: 160 }}>
            <Carousel
              axis="x"
              length={3}
              margins={{ left: 24, right: 0, top: 0, bottom: 0 }}
              // disable
              targetIndex={index}>
              <View style={styles.box}>
                <View style={styles.inner}>
                  <Text>Hello world!</Text>
                </View>
              </View>
              <View style={styles.box}>
                <View style={styles.inner}>
                  <Text>Hello world!</Text>
                </View>
              </View>
              <View style={styles.box}>
                <View style={styles.inner}>
                  <Text>Hello world!</Text>
                </View>
              </View>
            </Carousel>
          </View>
        </View>
        <Button title="R" onPress={() => setIndex(clamp(index + 1, 0, 2))} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61dafb',
    width: 160,
    height: 80,
    borderRadius: 4,
    marginLeft: 24,
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
