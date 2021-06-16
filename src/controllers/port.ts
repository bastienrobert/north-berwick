import { atom } from 'jotai'

const ASSETS = {
  icons: [
    {
      name: 'waves',
      image: undefined,
    },
    {
      name: 'sailor_cap',
      image: undefined,
    },
    {
      name: 'demon',
      image: undefined,
    },
    {
      name: 'storm',
      image: undefined,
    },
    {
      name: 'bones',
      image: undefined,
    },
    {
      name: 'witch_hat',
      image: undefined,
    },
    {
      name: 'cat',
      image: undefined,
    },
    {
      name: 'alcool',
      image: undefined,
    },
  ],
} as const

type AssetsIconsName = typeof ASSETS.icons[number]['name']
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

export default atom<PortStore>({
  cat_king: [null, null],
  cat_revealed: [null, null],
  demons_king: [null, null],
  demons_revealed: [null, null],
})
