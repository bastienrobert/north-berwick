import React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

interface EqualIconProps extends SvgProps {
  fill: string
}

export default function EqualIcon({ fill, ...props }: EqualIconProps) {
  return (
    <Svg width={18} height={9} viewBox="0 0 18 9" {...props}>
      <Path
        d="M16.642 5.142l1 3h-17l1-3h15zm1-5l-1 3h-15l-1-3h17z"
        fill={fill}
        fillRule="evenodd"
      />
    </Svg>
  )
}
