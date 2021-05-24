import React from 'react'
import { StatusBar, Platform } from 'react-native'

import Router from './Router'

export default function App() {
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <Router />
    </>
  )
}
