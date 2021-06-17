import { atom } from 'jotai'

import Cloting from '@/assets/pictograms/cloting.svg'
import Tools from '@/assets/pictograms/tools.svg'
import Broom from '@/assets/pictograms/broom.svg'
import Drug from '@/assets/pictograms/drug.svg'
import Milkmaid from '@/assets/pictograms/milkmaid.svg'
import Bread from '@/assets/pictograms/bread.svg'

import MagicWand from '@/assets/pictograms/magic_wand.svg'
import Plant from '@/assets/pictograms/plant.svg'
import Potion from '@/assets/pictograms/potion.svg'
import Pentacle from '@/assets/pictograms/pentacle.svg'

export const ASSETS = {
  activities: [
    {
      name: 'cloting',
      component: Cloting,
    },
    {
      name: 'tools',
      component: Tools,
    },
    {
      name: 'broom',
      component: Broom,
    },
    {
      name: 'drug',
      component: Drug,
    },
    {
      name: 'milkmaid',
      component: Milkmaid,
    },
    {
      name: 'bread',
      component: Bread,
    },
  ],
  cares: [
    {
      name: 'magic_wand',
      component: MagicWand,
    },
    {
      name: 'plant',
      component: Plant,
    },
    {
      name: 'potion',
      component: Potion,
    },
    {
      name: 'pentacle',
      component: Pentacle,
    },
  ],
  tortures: [
    {
      name: 'gresillon',
      multiline: false,
      image: require('@/assets/images/tortures/gresillon.webp'),
    },
    {
      name: 'bride',
      multiline: true,
      image: require('@/assets/images/tortures/bride.webp'),
    },
    {
      name: 'brodequin',
      multiline: false,
      image: require('@/assets/images/tortures/brodequin.webp'),
    },
    {
      name: 'estrapade',
      multiline: false,
      image: require('@/assets/images/tortures/estrapade.webp'),
    },
  ],
} as const

export type AssetsCaresName = typeof ASSETS.cares[number]['name']
export type AssetsActivitiesName = typeof ASSETS.activities[number]['name']
export type AssetsTorturesName = typeof ASSETS.tortures[number]['name']
export interface GeillisHouseCorrects {
  cares_seaton: [AssetsCaresName, AssetsCaresName]
  cares_revealed: [AssetsCaresName, AssetsCaresName]
  activity: AssetsActivitiesName
  torture: AssetsTorturesName
}

export const CORRECTS: GeillisHouseCorrects = {
  cares_seaton: ['pentacle', 'magic_wand'],
  cares_revealed: ['plant', 'potion'],
  activity: 'drug',
  torture: 'brodequin',
}

export interface GeillisHouseStore
  extends Nullable<
    Omit<GeillisHouseCorrects, 'cares_seaton' | 'cares_revealed'>
  > {
  cares_seaton: Nullable<GeillisHouseCorrects['cares_seaton']>
  cares_revealed: Nullable<GeillisHouseCorrects['cares_revealed']>
}

export default atom<GeillisHouseStore>({
  cares_seaton: [null, null],
  cares_revealed: [null, null],
  activity: null,
  torture: null,
})
