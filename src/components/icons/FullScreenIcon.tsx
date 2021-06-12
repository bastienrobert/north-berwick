import React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

import theme from '@/styles/theme'

export default function FullScreenIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 29 29" {...props}>
      <G fill={theme.colors.mineShaft} fillRule="nonzero">
        <Path d="M8 8h4.5l.5.5-3.5 1-1 3.5-.5-.5zM21 8h-4.5l-.5.5 3.5 1 1 3.5.5-.5zM8 21h4.5l.5-.5-3.5-1-1-3.5-.5.5zM21 21h-4.5l-.5-.5 3.5-1 1-3.5.5.5z" />
      </G>
    </Svg>
  )
}
