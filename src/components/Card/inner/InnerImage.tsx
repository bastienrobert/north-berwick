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
        <Image
          style={styles.image}
          source={image}
          resizeMode="contain"
          height={undefined}
        />
        <LargeButton style={styles.button} onPress={onEditClick}>
          {editLabel}
        </LargeButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'stretch',
  },
  wrapper: {
    overflow: 'hidden',
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    width: '80%',
    maxWidth: 370,
    aspectRatio: 1,
    marginBottom: 5,
    marginTop: 'auto',
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
  },
})
