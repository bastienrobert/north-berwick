import { atom } from 'jotai'

import castle, { CastleStore } from '@/controllers/castle'
import port, { PortStore } from '@/controllers/port'
import church, { ChurchStore } from '@/controllers/church'
import geillis_house, { GeillisHouseStore } from '@/controllers/geillis_house'

type Stores = [CastleStore, PortStore, ChurchStore, GeillisHouseStore]
export default atom<Stores>((get) => [
  get(castle),
  get(port),
  get(church),
  get(geillis_house),
])
