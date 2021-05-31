import React from 'react'
import { StatusBar, Platform } from 'react-native'

import Router from './Router'
import ScanProvider from './Scan/ScanProvider'
import ScanView from './Scan/ScanView'

export default function App() {
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <ScanProvider>
        <ScanView />
        <Router />
      </ScanProvider>
    </>
  )
}
