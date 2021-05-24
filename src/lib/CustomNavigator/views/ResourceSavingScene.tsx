import * as React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import {
  Screen,
  screensEnabled,
  // @ts-ignore
  shouldUseActivityState,
} from 'react-native-screens'

type ResourceSavingSceneProps = {
  children: React.ReactNode
  enabled: boolean
  style?: any
}

const FAR_FAR_AWAY = 30000 // this should be big enough to move the whole view out of its container

export default function ResourceSavingScene({
  children,
  style,
  ...rest
}: ResourceSavingSceneProps) {
  // react-native-screens is buggy on web
  if (screensEnabled?.() && Platform.OS !== 'web') {
    if (shouldUseActivityState) {
      return (
        <Screen activityState={2} style={style} {...rest}>
          {children}
        </Screen>
      )
    } else {
      return (
        <Screen active={1} style={style} {...rest}>
          {children}
        </Screen>
      )
    }
  }

  if (Platform.OS === 'web') {
    return (
      <View
        style={[{ display: 'flex' }, styles.container, style]}
        pointerEvents="auto"
        {...rest}>
        {children}
      </View>
    )
  }

  return (
    <View
      style={[styles.container, style]}
      // box-none doesn't seem to work properly on Android
      pointerEvents="auto">
      <View
        collapsable={false}
        removeClippedSubviews={
          // On iOS, set removeClippedSubviews to true only when not focused
          // This is an workaround for a bug where the clipped view never re-appears
          !(Platform.OS === 'ios')
        }
        pointerEvents="auto"
        style={styles.attached}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  attached: {
    flex: 1,
  },
  detached: {
    flex: 1,
    top: FAR_FAR_AWAY,
  },
})
