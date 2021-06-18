import { RevertableColorRecord } from './index'

import theme from '@/styles/theme'

export interface CardColors {
  title: string
  number: string
  text: string
  bottom: string
}

const colors: RevertableColorRecord<CardColors> = {
  red: {
    front: {
      title: theme.colors.white,
      text: theme.colors.white,
      number: theme.colors.white,
      bottom: theme.colors.brownPod,
    },
  },
  blue: {
    front: {
      title: theme.colors.white,
      text: theme.colors.white,
      number: theme.colors.white,
      bottom: theme.colors.stratos,
    },
    back: {
      title: theme.colors.stratos,
      text: theme.colors.stratos,
      number: theme.colors.hawkesBlue,
      bottom: theme.colors.white,
    },
  },
  purple: {
    front: {
      title: theme.colors.white,
      text: theme.colors.white,
      number: theme.colors.white,
      bottom: theme.colors.tolopoea,
    },
  },
  pink: {
    front: {
      title: theme.colors.white,
      text: theme.colors.white,
      number: theme.colors.white,
      bottom: theme.colors.darkTan,
    },
    back: {
      title: theme.colors.darkTan,
      text: theme.colors.darkTan,
      number: theme.colors.azalea,
      bottom: theme.colors.white,
    },
  },
}

export default colors
