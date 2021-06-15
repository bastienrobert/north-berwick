import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Animated, Easing } from 'react-native'
import Svg, { Path, Text as SvgText, TextPath, TSpan } from 'react-native-svg'

import { uuidv4 } from '@/utils/uuid'

export type CardTitleContent = [string] | [string, string]
export interface CardTitleProps {
  content?: CardTitleContent
  color: string
}

export default function CardTitle({ content, color }: CardTitleProps) {
  const [innerContent, setInnerContent] = useState<CardTitleContent>([''])
  const uuid = useRef(uuidv4()).current
  const opacity = useRef(new Animated.Value(0)).current

  const animate = useCallback(
    (toValue) => {
      return new Promise((resolve) => {
        Animated.timing(opacity, {
          useNativeDriver: false,
          toValue,
          duration: 200,
          easing: Easing.in(Easing.cubic),
        }).start(resolve)
      })
    },
    [opacity, content],
  )

  const isSameContent = content
    ? content[0] === innerContent[0] && content[1] === innerContent[1]
    : false

  useEffect(() => {
    ;(async () => {
      if (isSameContent) return
      await animate(0)
      if (content && content[0].length > 0) {
        setInnerContent(content)
        animate(1)
      } else {
        animate(0)
      }
    })()
  }, [content, isSameContent])

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, { opacity }]}
      pointerEvents="none">
      <Svg viewBox="0 0 315 570">
        <Path
          id={`${uuid}__g`}
          d="M0 160c39.6-41.908 95.5-68 157.5-68s117.9 26.092 157.5 68"
          fill="none"
        />
        <SvgText>
          <TextPath textAnchor="middle" startOffset="50%" href={`#${uuid}__g`}>
            <TSpan
              fontFamily="Avara-Bold"
              textAnchor="middle"
              fontSize={25}
              letterSpacing={0.3}
              fill={color}>
              {innerContent[0]}
            </TSpan>
          </TextPath>
        </SvgText>
        <Path
          id={`${uuid}__h`}
          d="M0 211c31.48-54.2 90.143-91 157.4-91 67.357 0 126.12 36.6 157.6 91"
          fill="none"
        />
        {innerContent[1] ? (
          <SvgText>
            <TextPath
              textAnchor="middle"
              startOffset="50%"
              href={`#${uuid}__h`}>
              <TSpan
                fontFamily="Avara-Bold"
                textAnchor="middle"
                fontSize={25}
                letterSpacing={0.3}
                fill={color}>
                {innerContent[1]}
              </TSpan>
            </TextPath>
          </SvgText>
        ) : null}
      </Svg>
    </Animated.View>
  )
}
