import React, { ReactNode } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

import {
  NavigationHelpersContext,
  ParamListBase,
  TabNavigationState,
  useTheme,
} from '@react-navigation/native'
import { ScreenContainer, screensEnabled } from 'react-native-screens'

import ResourceSavingScene from './ResourceSavingScene'
import type {
  BasicNavigationConfig,
  BasicNavigationHelpers,
  BasicDescriptorMap,
} from '../types'

type CustomViewProps = BasicNavigationConfig & {
  state: TabNavigationState<ParamListBase>
  navigation: BasicNavigationHelpers
  descriptors: BasicDescriptorMap
}

function SceneContent({
  children,
  style,
}: {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}) {
  const { colors } = useTheme()

  return (
    <View
      accessibilityElementsHidden={false}
      importantForAccessibility="auto"
      style={[styles.content, { backgroundColor: colors.background }, style]}>
      {children}
    </View>
  )
}

export default function BottomTabView({
  state,
  descriptors,
  navigation,
  detachInactiveScreens = true,
  sceneContainerStyle,
}: CustomViewProps) {
  const { routes, index } = state

  const route = routes[index]
  const descriptor = descriptors[route.key]

  const isScreensEnabled = screensEnabled?.() && detachInactiveScreens

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <ScreenContainer enabled={isScreensEnabled} style={styles.container}>
        <ResourceSavingScene
          key={route.key}
          style={StyleSheet.absoluteFill}
          enabled={isScreensEnabled}>
          <SceneContent style={sceneContainerStyle}>
            {descriptor.render()}
          </SceneContent>
        </ResourceSavingScene>
      </ScreenContainer>
    </NavigationHelpersContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
})
