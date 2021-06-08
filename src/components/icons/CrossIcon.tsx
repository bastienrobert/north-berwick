import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export default function CrossIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 29 29" {...props}>
      <Path
        fill="#2C2C2C"
        fillRule="nonzero"
        d="M9.3 8l5.2 4.333L19.7 8H21l-4.25 6.5L21 21h-1.3l-5.2-4.333L9.3 21H8l4.25-6.5L8 8z"
      />
    </Svg>
  )
}
