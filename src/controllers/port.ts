import { atom } from 'jotai'

import Waves from '@/assets/pictograms/waves.svg'
import SailorCap from '@/assets/pictograms/sailor_cap.svg'
import Demon from '@/assets/pictograms/demon.svg'
import Storm from '@/assets/pictograms/storm.svg'
import Bones from '@/assets/pictograms/bones.svg'
import WitchHat from '@/assets/pictograms/witch_hat.svg'
import Cat from '@/assets/pictograms/cat.svg'
import Alcool from '@/assets/pictograms/alcool.svg'

export const ASSETS = {
  icons: [
    {
      name: 'waves',
      component: Waves,
    },
    {
      name: 'sailor_cap',
      component: SailorCap,
    },
    {
      name: 'demon',
      component: Demon,
    },
    {
      name: 'storm',
      component: Storm,
    },
    {
      name: 'bones',
      component: Bones,
    },
    {
      name: 'witch_hat',
      component: WitchHat,
    },
    {
      name: 'cat',
      component: Cat,
    },
    {
      name: 'alcool',
      component: Alcool,
    },
  ],
} as const

export type AssetsIconsName = typeof ASSETS.icons[number]['name']
export interface PortCorrects {
  cat_king: [AssetsIconsName, AssetsIconsName]
  cat_revealed: [AssetsIconsName, AssetsIconsName]
  demons_king: [AssetsIconsName, AssetsIconsName]
  demons_revealed: [AssetsIconsName, AssetsIconsName]
}

export const CORRECTS: PortCorrects = {
  cat_king: ['bones', 'cat'],
  cat_revealed: ['storm', 'waves'],
  demons_king: ['witch_hat', 'demon'],
  demons_revealed: ['alcool', 'sailor_cap'],
}

export interface PortStore {
  cat_king: Nullable<PortCorrects['cat_king']>
  cat_revealed: Nullable<PortCorrects['cat_revealed']>
  demons_king: Nullable<PortCorrects['demons_king']>
  demons_revealed: Nullable<PortCorrects['demons_revealed']>
}

export function isCompleted({
  cat_revealed,
  cat_king,
  demons_revealed,
  demons_king,
}: PortStore) {
  return {
    cat_revealed: cat_revealed[0] !== null && cat_revealed[1] !== null,
    cat_king: cat_king[0] !== null && cat_king[1] !== null,
    demons_revealed: demons_revealed[0] !== null && demons_revealed[1] !== null,
    demons_king: demons_king[0] !== null && demons_king[1] !== null,
  }
}

export default atom<PortStore>({
  cat_king: [null, null],
  cat_revealed: [null, null],
  demons_king: [null, null],
  demons_revealed: [null, null],
})
