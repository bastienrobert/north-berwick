import React, { useMemo, useState } from 'react'
import { NavigationProp } from '@react-navigation/core'
import { View, Image, StyleSheet } from 'react-native'
import { atom, useAtom } from 'jotai'
import { useTranslate } from 'react-polyglot'

import { RootNavigationParamList } from '@/App/Router'

import SunkenShipIcon from '@/assets/pictograms/sunken_ship.svg'
import DeathIcon from '@/assets/pictograms/death.svg'
import DrugIcon from '@/assets/pictograms/drug.svg'

import Card from '@/components/Card'
import FlippableCarousel from '@/components/FlippableCarousel'

import castle, {
  CastleStore,
  ASSETS as CASTLE_ASSETS,
} from '@/controllers/castle'
import port, { PortStore, ASSETS as PORT_ASSETS } from '@/controllers/port'
import church, {
  ChurchStore,
  ASSETS as CHURCH_ASSETS,
} from '@/controllers/church'
import geillis_house, {
  GeillisHouseStore,
  ASSETS as GEILLIS_HOUSE_ASSETS,
} from '@/controllers/geillis_house'

import InnerSelectors from '@/components/Card/inner/InnerSelectors'
import InnerImage from '@/components/Card/inner/InnerImage'
import InnerCarousel from '@/components/Card/inner/InnerCarousel'
import WebPImage from '@/components/shared/WebPImage'
import InnerPoster from '@/components/Card/inner/InnerPoster'
import { FamilyItems } from '@/components/Card/inner/InnerSelectors/FamilySelector'
import Poster from '@/components/Poster'

import theme from '@/styles/theme'

import { FlippableSide } from '@/hooks/useFlippable'

export interface ConclusionRecapProps {}
type ConclusionRecapPropsWithNavigation = ConclusionRecapProps & {
  navigation: NavigationProp<RootNavigationParamList, 'Conclusion:Recap'>
}

type Stores = [CastleStore, PortStore, ChurchStore, GeillisHouseStore]
const results = atom<Stores>((get) => [
  get(castle),
  get(port),
  get(church),
  get(geillis_house),
])

export default function ConclusionRecap({
  navigation,
}: ConclusionRecapPropsWithNavigation) {
  const t = useTranslate()
  const [all] = useAtom(results)

  const [demonsCardFlip, setDemonsCardFlip] = useState<FlippableSide>('front')
  const [catCardFlip, setCatCardFlip] = useState<FlippableSide>('front')
  const [caresCardFlip, setCaresCardFlip] = useState<FlippableSide>('front')

  const data = useMemo(() => {
    return [
      {
        portrait: CASTLE_ASSETS['portraits'].find(
          (p) => p.name === all[0]['portrait'],
        ),
        torture: CASTLE_ASSETS['tortures'].find(
          (p) => p.name === all[0]['torture'],
        ),
      },
      {
        icons: PORT_ASSETS.icons.map(({ name, component: C }) => ({
          name,
          icon: <C />,
        })),
        cat_king: all[1].cat_king,
        cat_revealed: all[1].cat_revealed,
        demons_king: all[1].demons_king,
        demons_revealed: all[1].demons_revealed,
      },
      {
        icons: CHURCH_ASSETS.icons.map(({ name, component: C }) => ({
          name,
          icon: <C />,
        })),
        job: all[2].job,
        parent: all[2].parent,
        children: all[2].children,
      },
      {
        cares: GEILLIS_HOUSE_ASSETS.cares.map(({ name, component: C }) => ({
          name,
          icon: <C />,
        })),
        activities: GEILLIS_HOUSE_ASSETS.activities.map(
          ({ name, component: C }) => ({
            name,
            icon: <C />,
          }),
        ),
        cares_seaton: all[3].cares_seaton,
        cares_revealed: all[3].cares_revealed,
        activity: all[3].activity,
        torture: GEILLIS_HOUSE_ASSETS['tortures'].find(
          (p) => p.name === all[3]['torture'],
        ),
      },
    ]
  }, [all])

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FlippableCarousel
          onClosePress={() => navigation.navigate('Home:Splash', {})}
          data={[
            [
              {
                front: (
                  <Card
                    number={1}
                    color="red"
                    title={[t('job_title_line_1'), t('job_title_line_2')]}
                    forceBottom={false}
                    bottom={t('job_label')}
                    inner={
                      data[0].portrait ? (
                        <InnerImage image={data![0].portrait.image} />
                      ) : null
                    }
                  />
                ),
              },
              {
                front: (
                  <Card
                    number={1}
                    color="red"
                    forceBottom={false}
                    title={
                      data[0]['torture']
                        ? data[0]['torture'].multiline
                          ? [
                              t(data[0]['torture'].name + '_line_1'),
                              t(data[0]['torture'].name + '_line_2', { _: '' }),
                            ]
                          : [t(data[0]['torture'].name)]
                        : undefined
                    }
                    bottom={t('torture_label')}
                    inner={
                      <InnerCarousel
                        length={1}
                        controls={false}
                        content={[
                          <WebPImage
                            source={data[0]['torture']?.image}
                            style={{
                              marginTop: 20,
                              width: '90%',
                              aspectRatio: 1,
                            }}
                          />,
                        ]}
                      />
                    }
                  />
                ),
              },
              {
                front: (
                  <Card
                    number={1}
                    color="red"
                    title={[t('conviction')]}
                    forceBottom={false}
                    bottom={t('punishment')}
                    inner={
                      <InnerPoster
                        width="60%"
                        aspectRatio={0.68}
                        placeholder={
                          <Image
                            source={require('@/assets/images/poster/completed_large.jpg')}
                            resizeMode="cover"
                            style={{ width: '100%', flex: 1 }}
                          />
                        }>
                        <Poster completed />
                      </InnerPoster>
                    }
                  />
                ),
              },
            ],
            [
              {
                side: demonsCardFlip,
                front: (
                  <Card
                    revert
                    onFlipPress={() => setDemonsCardFlip('back')}
                    number={2}
                    color="blue"
                    title={[
                      t('port_title_king_line_1'),
                      t('port_title_king_line_2'),
                    ]}
                    forceBottom={false}
                    bottom={t('james_royall_label')}
                    inner={
                      <InnerSelectors
                        disabled
                        type="equation"
                        initial={data[1].demons_king}
                        keyboardLabel="Falcon of Leith"
                        plusColor={theme.colors.anakiwa}
                        equalColor={theme.colors.periwinkle}
                        result={<SunkenShipIcon />}
                        items={[data[1].icons, data[1].icons] as any}
                      />
                    }
                  />
                ),
                back: (
                  <Card
                    revert
                    onFlipPress={() => setDemonsCardFlip('front')}
                    number={2}
                    color="blue"
                    title={[t('port_title_revealed')]}
                    forceBottom={false}
                    bottom={t('james_royall_label')}
                    inner={
                      <InnerSelectors
                        disabled
                        type="equation"
                        initial={data[1].demons_revealed}
                        keyboardLabel="Falcon of Leith"
                        plusColor={theme.colors.anakiwa}
                        equalColor={theme.colors.periwinkle}
                        result={<SunkenShipIcon />}
                        items={[data[1].icons, data[1].icons] as any}
                      />
                    }
                  />
                ),
              },
              {
                side: catCardFlip,
                front: (
                  <Card
                    revert
                    onFlipPress={() => setCatCardFlip('back')}
                    number={2}
                    color="blue"
                    title={[
                      t('port_title_king_line_1'),
                      t('port_title_king_line_2'),
                    ]}
                    forceBottom={false}
                    bottom={t('falcon_of_leith_label')}
                    inner={
                      <InnerSelectors
                        disabled
                        type="equation"
                        initial={data[1].cat_king}
                        keyboardLabel="Falcon of Leith"
                        plusColor={theme.colors.anakiwa}
                        equalColor={theme.colors.periwinkle}
                        result={<DeathIcon />}
                        items={[data[1].icons, data[1].icons] as any}
                      />
                    }
                  />
                ),
                back: (
                  <Card
                    revert
                    onFlipPress={() => setCatCardFlip('front')}
                    number={2}
                    color="blue"
                    title={[t('port_title_revealed')]}
                    forceBottom={false}
                    bottom={t('falcon_of_leith_label')}
                    inner={
                      <InnerSelectors
                        disabled
                        type="equation"
                        initial={data[1].cat_revealed}
                        keyboardLabel="Falcon of Leith"
                        plusColor={theme.colors.anakiwa}
                        equalColor={theme.colors.periwinkle}
                        result={<DeathIcon />}
                        items={[data[1].icons, data[1].icons] as any}
                      />
                    }
                  />
                ),
              },
            ],
            [
              {
                front: (
                  <Card
                    number={3}
                    color="purple"
                    title={[t('family_title_line_1'), t('family_title_line_2')]}
                    forceBottom={false}
                    bottom={t('family_label')}
                    inner={
                      <InnerSelectors
                        disabled
                        type="family"
                        main={t('agnes')}
                        initial={data[2] as any}
                        keyboardLabel={t('family_label')}
                        items={CHURCH_ASSETS.families as FamilyItems}
                      />
                    }
                  />
                ),
              },
              {
                front: (
                  <Card
                    number={3}
                    color="purple"
                    title={[t('family_title_line_1'), t('family_title_line_2')]}
                    forceBottom={false}
                    bottom={t('family_label')}
                    inner={
                      <InnerSelectors
                        disabled
                        type="single"
                        keyboardLabel={t('job_label')}
                        initial={data[2].job}
                        items={data[2].icons as any}
                      />
                    }
                  />
                ),
              },
            ],
            [
              {
                side: caresCardFlip,
                front: (
                  <Card
                    revert
                    onFlipPress={() => setCaresCardFlip('back')}
                    number={4}
                    color="pink"
                    title={[
                      t('cares_seaton_title_line_1'),
                      t('cares_seaton_title_line_2'),
                    ]}
                    forceBottom={false}
                    bottom={t('cares_label')}
                    inner={
                      <InnerSelectors
                        disabled
                        type="equation"
                        keyboardLabel={t('cares_label')}
                        plusColor={theme.colors.cornflowerLilac}
                        equalColor={theme.colors.peachSchnapps}
                        result={<DrugIcon />}
                        initial={data[3].cares_seaton}
                        items={[data[3].cares, data[3].cares] as any}
                      />
                    }
                  />
                ),
                back: (
                  <Card
                    onFlipPress={() => setCaresCardFlip('front')}
                    number={4}
                    color="pink"
                    title={[
                      t('cares_revealed_title_line_1'),
                      t('cares_revealed_title_line_2'),
                    ]}
                    forceBottom={false}
                    bottom={t('cares_label')}
                    inner={
                      <InnerSelectors
                        disabled
                        type="equation"
                        keyboardLabel={t('cares_label')}
                        plusColor={theme.colors.peachSchnapps}
                        equalColor={theme.colors.peachSchnapps}
                        result={<DrugIcon />}
                        initial={data[3].cares_revealed}
                        items={[data[3].cares, data[3].cares] as any}
                      />
                    }
                  />
                ),
              },
              {
                front: (
                  <Card
                    number={4}
                    color="pink"
                    title={[
                      t('activity_title_line_1'),
                      t('activity_title_line_2'),
                    ]}
                    forceBottom={false}
                    bottom={t('activity_label')}
                    inner={
                      <InnerSelectors
                        disabled
                        type="single"
                        keyboardLabel={t('activity_label')}
                        initial={data[3].activity}
                        items={data[3].activities as any}
                      />
                    }
                  />
                ),
              },
              {
                front: (
                  <Card
                    number={4}
                    color="pink"
                    title={
                      data[3]['torture']
                        ? data[3]['torture'].multiline
                          ? [
                              t(data[3]['torture'].name + '_line_1'),
                              t(data[3]['torture'].name + '_line_2', { _: '' }),
                            ]
                          : [t(data[3]['torture'].name)]
                        : undefined
                    }
                    forceBottom={false}
                    bottom={t('torture_label')}
                    inner={
                      <InnerCarousel
                        length={1}
                        controls={false}
                        content={[
                          <WebPImage
                            source={data[3]['torture']?.image}
                            style={{
                              marginTop: 20,
                              width: '90%',
                              aspectRatio: 1,
                            }}
                          />,
                        ]}
                      />
                    }
                  />
                ),
              },
            ],
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.vistaWhite,
  },
  wrapper: {
    width: '90%',
    flex: 1,
    alignSelf: 'center',
  },
})
