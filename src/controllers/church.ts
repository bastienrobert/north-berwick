import { atom } from 'jotai'

import Cloting from '@/assets/pictograms/cloting.svg'
import Tools from '@/assets/pictograms/tools.svg'
import Broom from '@/assets/pictograms/broom.svg'
import Drug from '@/assets/pictograms/drug.svg'
import Milkmaid from '@/assets/pictograms/milkmaid.svg'
import Bread from '@/assets/pictograms/bread.svg'

export const ASSETS = {
  icons: [
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
  families: [
    {
      name: 'charles',
      text: 'Charles',
      display: 'C',
    },
    {
      name: 'mary',
      text: 'Mary',
      display: 'M',
    },
    {
      name: 'edmond',
      text: 'Edmond',
      display: 'E',
    },
    {
      name: 'hughes',
      text: 'Hughes',
      display: 'H',
    },
  ],
} as const

export type AssetsIconsName = typeof ASSETS.icons[number]['name']
export type AssetsFamiliesName = typeof ASSETS.families[number]['name']
export interface ChurchCorrects {
  job: AssetsIconsName
  parent: AssetsFamiliesName
  children: [AssetsFamiliesName, AssetsFamiliesName, AssetsFamiliesName]
}

export const CORRECTS: ChurchCorrects = {
  job: 'drug',
  parent: 'charles',
  children: ['edmond', 'hughes', 'mary'],
}

export interface ChurchStore
  extends Nullable<Omit<ChurchCorrects, 'children'>> {
  children: Nullable<ChurchCorrects['children']>
}

export default atom<ChurchStore>({
  job: null,
  parent: null,
  children: [null, null, null],
})
