import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function ArrowRightIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 29 29" {...props}>
      <Path
        fill="#2C2C2C"
        fillRule="nonzero"
        d="M19 14.5L13 8h-1l2.5 6.5L12 21h1z"
      />
    </Svg>
  )
}
