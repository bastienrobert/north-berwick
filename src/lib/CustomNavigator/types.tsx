import type { Animated, StyleProp, ViewStyle } from 'react-native'
import type {
  NavigationHelpers,
  NavigationProp,
  ParamListBase,
  Descriptor,
  TabNavigationState,
  TabActionHelpers,
  RouteProp,
} from '@react-navigation/native'

export type BasicNavigationEventMap = {
  /**
   * Event which fires on tapping on the tab in the tab bar.
   */
  tabPress: { data: undefined; canPreventDefault: true }
  /**
   * Event which fires on long press on the tab in the tab bar.
   */
  tabLongPress: { data: undefined }
}

export type LabelPosition = 'beside-icon' | 'below-icon'

export type BasicNavigationHelpers = NavigationHelpers<
  ParamListBase,
  BasicNavigationEventMap
> &
  TabActionHelpers<ParamListBase>

export type BasicNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = NavigationProp<
  ParamList,
  RouteName,
  TabNavigationState<ParamList>,
  BasicNavigationOptions,
  BasicNavigationEventMap
> &
  TabActionHelpers<ParamList>

export type BasicScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = {
  navigation: BasicNavigationProp<ParamList, RouteName>
  route: RouteProp<ParamList, RouteName>
}

export type TimingKeyboardAnimationConfig = {
  animation: 'timing'
  config?: Omit<
    Partial<Animated.TimingAnimationConfig>,
    'toValue' | 'useNativeDriver'
  >
}

export type SpringKeyboardAnimationConfig = {
  animation: 'spring'
  config?: Omit<
    Partial<Animated.SpringAnimationConfig>,
    'toValue' | 'useNativeDriver'
  >
}

export type TabBarVisibilityAnimationConfig =
  | TimingKeyboardAnimationConfig
  | SpringKeyboardAnimationConfig

export type BasicNavigationOptions = {
  /**
   * Title text for the screen.
   */
  title?: string
}

export type BasicDescriptor = Descriptor<
  ParamListBase,
  string,
  TabNavigationState<ParamListBase>,
  BasicNavigationOptions
>

export type BasicDescriptorMap = {
  [key: string]: BasicDescriptor
}

export type BasicNavigationConfig = {
  /**
   * Whether the screens should render the first time they are accessed. Defaults to `true`.
   * Set it to `false` if you want to render all screens on initial render.
   */
  lazy?: boolean
  /**
   * Whether inactive screens should be detached from the view hierarchy to save memory.
   * Make sure to call `enableScreens` from `react-native-screens` to make it work.
   * Defaults to `true` on Android.
   */
  detachInactiveScreens?: boolean
  /**
   * Style object for the component wrapping the screen content.
   */
  sceneContainerStyle?: StyleProp<ViewStyle>
}
