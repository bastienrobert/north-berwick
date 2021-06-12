import React from 'react'
import { StyleSheet, View } from 'react-native'

import SelectorItem from './common/SelectorItem'

export interface SingleSelectorProps {}

export default function SingleSelector({}: SingleSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <SelectorItem theme="big" placeHolderText="?" style={styles.selector} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
  },
  wrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  selector: {
    marginBottom: 80,
  },
})
