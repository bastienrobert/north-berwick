import Carousel from '@/components/shared/Carousel'
import { clamp } from '@/utils/math'
import React, { useState } from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'

export default function CarouselDemo() {
  const [index, setIndex] = useState(1)

  return (
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
