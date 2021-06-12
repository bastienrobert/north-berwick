import React from 'react'
import { StyleSheet, View } from 'react-native'

import SelectorItem from './common/SelectorItem'
import PlusIcon from './common/PlusIcon'
import EqualIcon from './common/EqualIcon'

export interface EquationSelectorProps {}

export default function EquationSelector({}: EquationSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upper}>
          <SelectorItem placeHolderText="?" />
          <PlusIcon style={styles.plus} fill="#FFADA7" />
          <SelectorItem placeHolderText="?" />
        </View>
        <EqualIcon style={styles.equal} fill="#FFDAD7" />
        <SelectorItem theme="large" />
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
    overflow: 'hidden',
    alignItems: 'center',
  },
  upper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plus: {
    marginHorizontal: 8,
  },
  equal: {
    marginTop: 32,
    marginBottom: 20,
  },
})
