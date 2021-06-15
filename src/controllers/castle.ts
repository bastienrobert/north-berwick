import { atom } from 'jotai'

export const ASSETS = {
  portraits: [
    {
      name: 'agnes_sampson',
      image: require('@/assets/images/portraits/agnes_sampson.png'),
    },
    {
      name: 'alanis_muir',
      image: require('@/assets/images/portraits/alanis_muir.png'),
    },
    {
      name: 'euphame_maccalzean',
      image: require('@/assets/images/portraits/euphame_maccalzean.png'),
    },
    {
      name: 'geillis_ducan',
      image: require('@/assets/images/portraits/geillis_ducan.png'),
    },
    {
      name: 'john_cunningham',
      image: require('@/assets/images/portraits/john_cunningham.png'),
    },
    {
      name: 'margaret_acheson',
      image: require('@/assets/images/portraits/margaret_acheson.png'),
    },
    {
      name: 'robert_grierson',
      image: require('@/assets/images/portraits/robert_grierson.png'),
    },
    {
      name: 'smith_du_pont_hallis',
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

export default atom<Nullable<CastleCorrects>>({
  portrait: null,
  torture: null,
  poster: false,
})
