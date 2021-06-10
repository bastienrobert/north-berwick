import { RevertableColorRecord } from './index'

export interface CardColors {
  title: string
  number: string
  text: string
  bottom: string
}

const colors: RevertableColorRecord<CardColors> = {
  red: {
    front: {
      title: '#fff',
      text: '#fff',
      number: '#fff',
      bottom: '#480D00',
    },
  },
  blue: {
    front: {
      title: '#fff',
      text: '#fff',
      number: '#fff',
      bottom: '#000848',
    },
    back: {
      title: '#000848',
      text: '#000848',
      number: '#c6d5fb',
      bottom: '#fff',
    },
  },
  purple: {
    front: {
      title: '#fff',
      text: '#fff',
      number: '#fff',
      bottom: '#250048',
    },
  },
  pink: {
    front: {
      title: '#fff',
      text: '#fff',
      number: '#fff',
      bottom: '#680E1C',
    },
    back: {
      title: '#680E1C',
      text: '#680E1C',
      number: '#f8cfca',
      bottom: '#fff',
    },
  },
}

export default colors
