import React from 'react'
import { StatusBar, Platform } from 'react-native'
import { I18n } from 'react-polyglot'

import fr from '@/locales/fr.json'

import Router from './Router'
import MainSoundProvider from './MainSoundProvider'
import ScanProvider from './Scan/ScanProvider'
import ScanView from './Scan/ScanView'

import { PortalHost } from '@/lib/Portal'

export default function App() {
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <MainSoundProvider>
        <I18n locale="fr" messages={fr} allowMissing>
          <ScanProvider>
            <ScanView style={{ flex: 1, zIndex: 899 }} />
            <PortalHost>
              <Router />
            </PortalHost>
          </ScanProvider>
        </I18n>
      </MainSoundProvider>
    </>
  )
}
