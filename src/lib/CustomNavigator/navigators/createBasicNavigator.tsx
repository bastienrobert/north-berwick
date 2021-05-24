import React from 'react'
import {
  useNavigationBuilder,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  TabRouter,
  TabRouterOptions,
  TabNavigationState,
  TabActionHelpers,
  ParamListBase,
} from '@react-navigation/native'
import BottomTabView from '../views/BottomTabView'
import type {
  BasicNavigationConfig,
  BasicNavigationOptions,
  BasicNavigationEventMap,
} from '../types'

type Props = DefaultNavigatorOptions<BasicNavigationOptions> &
  TabRouterOptions &
  BasicNavigationConfig

function BasicNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  sceneContainerStyle,
  ...rest
}: Props) {
  const { state, descriptors, navigation } = useNavigationBuilder<
    TabNavigationState<ParamListBase>,
    TabRouterOptions,
    TabActionHelpers<ParamListBase>,
    BasicNavigationOptions,
    BasicNavigationEventMap
  >(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  })

  return (
    <BottomTabView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
      sceneContainerStyle={sceneContainerStyle}
    />
  )
}

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  BasicNavigationOptions,
  BasicNavigationEventMap,
  typeof BasicNavigator
>(BasicNavigator)
