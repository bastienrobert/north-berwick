import React from 'react'
import { StatusBar, Platform } from 'react-native'
import { I18n } from 'react-polyglot'

import fr from '@/locales/fr.json'

import Router from './Router'
import ScanProvider from './Scan/ScanProvider'
import ScanView from './Scan/ScanView'

import { PortalHost } from '@/lib/Portal'

export default function App() {
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <I18n locale="fr" messages={fr} allowMissing>
        <PortalHost>
          <ScanProvider>
            <ScanView />
            <Router />
          </ScanProvider>
        </PortalHost>
      </I18n>
    </>
  )
}
