import React, { useRef } from 'react'
import Svg, { SvgProps, Path, Text, TextPath, TSpan } from 'react-native-svg'

import { uuidv4 } from '@/utils/uuid'

interface SummaryTitle extends SvgProps {
  content: string
  color: string
}

function SummaryTitle({ content, color, ...props }: SummaryTitle) {
  const uuid = useRef(uuidv4()).current

  return (
    <Svg viewBox="0 0 367 105" {...props}>
      <Path
        fill="none"
        id={`${uuid}__a`}
        d="M0 104.29C42.385 53.006 108.688 20 183.208 20 258.07 20 324.642 53.312 367 105"
      />
      <Text transform="translate(0 11)">
        <TextPath href={`#${uuid}__a`} startOffset="50%">
          <TSpan
            textAnchor="middle"
            fill={color}
            fontFamily="Avara-Bold"
            fontSize={25}
            letterSpacing={1}>
            {content}
          </TSpan>
        </TextPath>
      </Text>
    </Svg>
  )
}

SummaryTitle.DIMENSIONS = {
  width: 367,
  height: 105,
}

export default SummaryTitle
