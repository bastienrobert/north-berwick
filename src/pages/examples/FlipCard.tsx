import React, { useEffect, useRef, useCallback } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native'

export default function App2() {
  const animatedRotation = useRef(new Animated.Value(0)).current
  const rotation = useRef(0)

  const flipCard = useCallback(() => {
    if (rotation.current >= 90) {
      Animated.spring(animatedRotation, {
        useNativeDriver: false,
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start()
    } else {
      Animated.spring(animatedRotation, {
        useNativeDriver: false,
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start()
    }
  }, [animatedRotation])

  useEffect(() => {
    animatedRotation.addListener(({ value }) => {
      rotation.current = value
    })
  }, [animatedRotation])

  const frontInterpolate = animatedRotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })

  const backInterpolate = animatedRotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  })

  const frontOpacity = animatedRotation.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  })

  const backOpacity = animatedRotation.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  })

  return (
    <View style={styles.container}>
      <View>
        <Animated.View
          style={[
            styles.flipCard,
            styles.squareCard,
            {
              opacity: frontOpacity,
              transform: [{ rotateY: frontInterpolate }],
            },
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => flipCard()}
            style={styles.squareCard}>
            <Text style={styles.text}>Front title</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.squareCard,
            styles.flipCard,
            styles.flipCardBack,
            {
              opacity: backOpacity,
              transform: [{ rotateY: backInterpolate }],
            },
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => flipCard()}
            style={[styles.squareCard, { backgroundColor: 'red' }]}>
            <View style={{ justifyContent: 'center', padding: 10 }}>
              <Text style={styles.text}>Back title</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  )
}

const width = Dimensions.get('window').width
const containerWidth = (width - 30) / 2 - 7.5

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  squareCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    height: containerWidth,
    width: containerWidth,
  },
  flipCard: {
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  },
  text: {
    color: 'white',
  },
})
