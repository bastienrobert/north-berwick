import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'

import LargeButton from '@/components/shared/LargeButton'

interface InnerImageProps {
  editLabel: string
  image: ImageSourcePropType
  onEditClick?: () => void
}

export default function InnerImage({
  editLabel,
  onEditClick,
  image,
}: InnerImageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={image} resizeMode="contain" />
        <LargeButton style={styles.button} onPress={onEditClick}>
          {editLabel}
        </LargeButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'center',
  },
  wrapper: {
    overflow: 'hidden',
  },
  image: {
    width: '80%',
    maxWidth: 370,
    aspectRatio: 1,
    marginBottom: 5,
  },
  button: {
    alignSelf: 'center',
  },
})
