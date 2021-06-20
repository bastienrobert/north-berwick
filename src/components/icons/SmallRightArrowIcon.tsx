import React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function SmallRightArrowIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 7 13" {...props}>
      <Path
        d="M7 6.5L1 0H0l2.5 6.5L0 13h1z"
        fill="#2C2C2C"
        fillRule="nonzero"
      />
    </Svg>
  )
}
