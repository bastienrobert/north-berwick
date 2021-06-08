import * as React from 'react'
import { StyleSheet } from 'react-native'
import { SvgProps } from 'react-native-svg'
import ArrowRightIcon from './ArrowRightIcon'

export default function ArrowLeftIcon({ style, ...props }: SvgProps) {
  return <ArrowRightIcon style={[style, styles.icon]} {...props} />
}

const styles = StyleSheet.create({
  icon: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
})
