import { registerRootComponent } from 'expo'
import { THREE } from 'expo-three'

import App from './src/App'

// remove all THREE warnings to prevent build issues
THREE.suppressExpoWarnings(true)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
