import React from 'react'
import { useAtom } from 'jotai'
import { Button, Text, View } from 'react-native'

import { RootNavigationParamList } from '@/App/Router'

import { BasicNavigationProp } from '@/lib/CustomNavigator'
import { useScan } from '@/App/Scan/ScanProvider'

import port, { CORRECTS as PORT_CORRECTS } from '@/controllers/port'
import castle, { CORRECTS as CASTLE_CORRECTS } from '@/controllers/castle'
import church, { CORRECTS as CHURCH_CORRECTS } from '@/controllers/church'
import geillis_house, {
  CORRECTS as GEILLIS_HOUSE_CORRECTS,
} from '@/controllers/geillis_house'

export interface HomeProps {}
interface HomePropsWithNavigation extends HomeProps {
  navigation: BasicNavigationProp<RootNavigationParamList, 'Development'>
}

export default function Development({ navigation }: HomePropsWithNavigation) {
  const { set, hide } = useScan()

  const [, setPort] = useAtom(port)
  const [, setCastle] = useAtom(castle)
  const [, setChurch] = useAtom(church)
  const [, setGeillisHouse] = useAtom(geillis_house)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Development mode</Text>
      <Button
        title="Go to App"
        onPress={() => navigation.navigate('Home:Splash', {})}
      />
      <Button
        title="Go to Examples"
        onPress={() => navigation.navigate('Examples', {})}
      />
      <Button
        title="Open Viewer"
        onPress={() =>
          set({
            callbacks: {
              map_castle: () => hide(),
              default: () => null,
            },
          })
        }
      />
      <Text>---</Text>
      <Button
        title="Goto Castle"
        onPress={() => navigation.navigate('Chapter:Castle', {})}
      />
      <Button
        title="Goto Port"
        onPress={() => navigation.navigate('Chapter:Port', {})}
      />
      <Button
        title="Goto Church"
        onPress={() => navigation.navigate('Chapter:Church', {})}
      />
      <Button
        title="Goto GeillisHouse"
        onPress={() => navigation.navigate('Chapter:GeillisHouse', {})}
      />
      <Button
        title="Goto End"
        onPress={() => {
          navigation.navigate('Conclusion:End', {})
        }}
      />
      <Button
        title="Goto Conclusion"
        onPress={() => {
          setPort(PORT_CORRECTS)
          setCastle(CASTLE_CORRECTS)
          setChurch(CHURCH_CORRECTS)
          setGeillisHouse(GEILLIS_HOUSE_CORRECTS)

          navigation.navigate('Conclusion:Recap', {})
        }}
      />
    </View>
  )
}
