import React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

import theme from '@/styles/theme'

export default function ArrowRightIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 29 29" {...props}>
      <Path
        fill={theme.colors.mineShaft}
        fillRule="nonzero"
        d="M19 14.5L13 8h-1l2.5 6.5L12 21h1z"
      />
    </Svg>
  )
}
