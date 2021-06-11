import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Rect,
  Stop,
  StopProps,
  SvgProps,
} from 'react-native-svg'

import { uuidv4 } from '@/utils/uuid'

export interface LinearGradientProps extends SvgProps {
  stops: StopProps[]
}

export default function LinearGradient({
  stops,
  ...props
}: LinearGradientProps) {
  const uuid = useRef(uuidv4()).current

  return (
    <Svg viewBox="0 0 1 2" preserveAspectRatio="xMinYMin slice" {...props}>
      <Defs>
        <SvgLinearGradient id={uuid} x1="0" y1="0" x2="1" y2="1">
          {stops.map((stop, i) => (
            <Stop key={i} {...stop} />
          ))}
        </SvgLinearGradient>
      </Defs>
      <Rect fill={`url(#${uuid})`} width="1" height="3" />
    </Svg>
  )
}
