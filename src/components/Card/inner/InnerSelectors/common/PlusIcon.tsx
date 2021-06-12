import React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

interface PlusIconProps extends SvgProps {
  fill: string
}

export default function PlusIcon({ fill, ...props }: PlusIconProps) {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" {...props}>
      <Path
        fill={fill}
        d="M8.35 11.934L.142 10.142 8.35 8.35 10.142.142l1.792 8.208 8.208 1.792-8.208 1.792-1.792 8.208z"
        fillRule="evenodd"
      />
    </Svg>
  )
}
