import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { SvgProps, Path } from 'react-native-svg'

import SelectorItem from './common/SelectorItem'

export interface FamilySelectorProps {}

function FamilyTree(props: SvgProps) {
  return (
    <Svg width={153} height={87} viewBox="0 0 153 87" {...props}>
      <Path
        d="M3.5 50.5V55L2 56.5.5 55v-5.5l2-2H75V3H62.5L61 1.5 62.5 0h28L92 1.5 90.5 3H78v44.5h72.5l2 2V55l-1.5 1.5-1.5-1.5v-4.5H78V85l-1.5 1.5L75 85V50.5z"
        fill="#D9CCFF"
        fillRule="nonzero"
      />
    </Svg>
  )
}

export default function FamilySelector({}: FamilySelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.topWrapper}>
          <SelectorItem placeHolderText="Agnès" style={{ marginRight: 45 }} />
          <SelectorItem placeHolderText="?" />
        </View>
        <FamilyTree />
        <View style={styles.bottomWrapper}>
          <SelectorItem placeHolderText="?" style={[{ marginTop: -30 }]} />
          <SelectorItem placeHolderText="?" />
          <SelectorItem placeHolderText="?" style={[{ marginTop: -30 }]} />
        </View>
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
    marginBottom: '30%',
    alignItems: 'center',
  },
  topWrapper: {
    flexDirection: 'row',
    transform: [
      {
        translateY: 18,
      },
    ],
  },
  bottomWrapper: {
    flexDirection: 'row',
    marginTop: 12.5,
  },
})
