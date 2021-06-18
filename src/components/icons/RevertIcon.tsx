import React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

import theme from '@/styles/theme'

export default function RevertIcon(props: SvgProps) {
  return (
    <Svg width={29} height={29} viewBox="0 0 29 29" {...props}>
      <G fill={theme.colors.mineShaft} fillRule="nonzero">
        <Path d="M10 11l-2 4 1.5 3.5c1.5.333 3 .5 4.5.5s3-.167 4.5-.5L20 15l-1.707-3.293 1.414-1.414C21.214 11.799 22 13.373 22 15c0 1.542-.706 3.035-2.061 4.469l-.232.238-.172.172-.23.074C17.126 20.648 15.365 21 14 21c-1.275 0-2.894-.307-4.874-.913l-.7-.22-.185-.216C6.767 17.93 6 16.398 6 15c0-1.324.674-2.89 2-4.5l2 .5z" />
        <Path d="M17.46 8.177l-1.464 5.464.5.866 2.828-3.102 4.1-.898-.5-.866z" />
      </G>
    </Svg>
  )
}
