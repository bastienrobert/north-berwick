import { atom } from 'jotai'

export const ASSETS = {
  portraits: [
    {
      name: 'agnes_sampson',
      multiline: false,
      image: require('@/assets/images/portraits/agnes_sampson.png'),
    },
    {
      name: 'alanis_muir',
      multiline: false,
      image: require('@/assets/images/portraits/alanis_muir.png'),
    },
    {
      name: 'euphame_maccalzean',
      multiline: true,
      image: require('@/assets/images/portraits/euphame_maccalzean.png'),
    },
    {
      name: 'geillis_ducan',
      multiline: false,
      image: require('@/assets/images/portraits/geillis_ducan.png'),
    },
    {
      name: 'john_cunningham',
      multiline: true,
      image: require('@/assets/images/portraits/john_cunningham.png'),
    },
    {
      name: 'margaret_acheson',
      multiline: true,
      image: require('@/assets/images/portraits/margaret_acheson.png'),
    },
    {
      name: 'robert_grierson',
      multiline: false,
      image: require('@/assets/images/portraits/robert_grierson.png'),
    },
    {
      name: 'smith_du_pont_hallis',
      multiline: true,
      image: require('@/assets/images/portraits/smith_du_pont_hallis.png'),
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

export interface CastleCorrects {
  portrait: typeof ASSETS.portraits[number]['name']
  torture: typeof ASSETS.tortures[number]['name']
  poster: boolean
}

export const CORRECTS: CastleCorrects = {
  portrait: 'agnes_sampson',
  torture: 'bride',
  poster: true,
}

export type CastleStore = Nullable<CastleCorrects>

export default atom<CastleStore>({
  portrait: null,
  torture: null,
  poster: false,
})
