import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export interface SelectorKeyboardItemProps {
  icon?: ReactNode
  text?: string
}

export default function SelectorKeyboardItem({
  icon,
  text,
}: SelectorKeyboardItemProps) {
  return (
    <View style={[styles.item, icon ? styles.withIcon : styles.withText]}>
      {icon ? (
        <View style={styles.inner}>{icon}</View>
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  inner: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  withIcon: {
    width: 54,
    borderRadius: 27,
  },
  withText: {
    width: '45%',
    maxWidth: 130,
    borderRadius: 37,
  },
  text: {
    width: '100%',
    fontSize: 17,
    paddingTop: 4,
    fontFamily: 'Avara-Bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
})
