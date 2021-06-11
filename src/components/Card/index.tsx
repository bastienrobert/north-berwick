import React, {
  useRef,
  useMemo,
  ReactNode,
  memo,
  MemoExoticComponent,
} from 'react'
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native'
import Svg, { Path, Text as SvgText, TextPath, TSpan } from 'react-native-svg'

import colors, { CardColors } from './colors'
import RedFront from './backgrounds/RedFront.svg'
import BlueFront from './backgrounds/BlueFront.svg'
import BlueBack from './backgrounds/BlueBack.svg'
import PurpleFront from './backgrounds/PurpleFront.svg'
import PinkFront from './backgrounds/PinkFront.svg'
import PinkBack from './backgrounds/PinkBack.svg'

import { uuidv4 } from '@/utils/uuid'
import { range } from '@/utils/math'

type CardBaseColors = 'blue' | 'pink' | 'red' | 'purple'
type CardBaseRevertableColors = Extract<CardBaseColors, 'blue' | 'pink'>
type CardBaseUnrevertableColors = Extract<CardBaseColors, 'red' | 'purple'>
type CardBaseProps = {
  number: number
  style?: StyleProp<ViewStyle>
  title?: [string] | [string, string]
  text?: string
  bottom?: string
  inner?: ReactNode
  forceBottom?: boolean
} & (
  | {
      color: CardBaseRevertableColors
      revert?: boolean
    }
  | {
      color: CardBaseUnrevertableColors
      revert?: undefined
    }
)

export type RevertableColorRecord<T> = Record<
  CardBaseRevertableColors,
  { front: T; back: T }
> &
  Record<CardBaseUnrevertableColors, { front: T }>

const BACKGROUNDS: RevertableColorRecord<ReactNode> = {
  red: {
    front: RedFront,
  },
  blue: {
    front: BlueFront,
    back: BlueBack,
  },
  purple: {
    front: PurpleFront,
  },
  pink: {
    front: PinkFront,
    back: PinkBack,
  },
}

const DEFAULT_COLORS: CardColors = {
  title: '#fff',
  number: '#fff',
  text: '#fff',
  bottom: '#fff',
}

function Card({
  number,
  title,
  text,
  bottom,
  color,
  style,
  inner,
  forceBottom = true,
  revert = false,
}: CardBaseProps) {
  const uuid = useRef(uuidv4()).current

  const [Background, BackgroundColors] = useMemo(() => {
    // already typed w/ props
    const C = (BACKGROUNDS[color] as any)[revert ? 'back' : 'front']
    const col = (colors[color] as any)[revert ? 'back' : 'front']
    return [C, Object.assign({}, DEFAULT_COLORS, col)]
  }, [color, revert])

  return (
    <View style={[styles.container, style]}>
      <Background
        style={[StyleSheet.absoluteFill, { flex: 1, width: '100%' }]}
      />
      <Text style={[styles.number, { color: BackgroundColors.number }]}>
        {range(number).map(() => 'I')}
      </Text>
      {text && (
        <Text style={[styles.text, { color: BackgroundColors.text }]}>
          {text}
        </Text>
      )}
      {inner}
      <Text
        style={[
          styles.bottom,
          {
            color: BackgroundColors.bottom,
            marginTop: forceBottom ? 'auto' : undefined,
          },
        ]}>
        {bottom}
      </Text>
      {title && (
        <Svg
          viewBox="0 0 315 570"
          style={StyleSheet.absoluteFill}
          pointerEvents="none">
          <Path
            id={`${uuid}__g`}
            d="M0 160c39.6-41.908 95.5-68 157.5-68s117.9 26.092 157.5 68"
            fill="none"
          />
          <SvgText>
            <TextPath
              textAnchor="middle"
              startOffset="50%"
              href={`#${uuid}__g`}>
              <TSpan
                fontFamily="Avara-Bold"
                textAnchor="middle"
                fontSize={25}
                letterSpacing={0.3}
                fill={BackgroundColors.title}>
                {title[0]}
              </TSpan>
            </TextPath>
          </SvgText>
          <Path
            id={`${uuid}__h`}
            d="M0 211c31.48-54.2 90.143-91 157.4-91 67.357 0 126.12 36.6 157.6 91"
            fill="none"
          />
          {title[1] && (
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
                  fill={BackgroundColors.title}>
                  {title[1]}
                </TSpan>
              </TextPath>
            </SvgText>
          )}
        </Svg>
      )}
    </View>
  )
}

const MemoizedCard = memo(Card) as MemoExoticComponent<typeof Card> & {
  DIMENSIONS: { width: number; height: number }
}

MemoizedCard.DIMENSIONS = {
  width: 317,
  height: 572,
}

export default MemoizedCard

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'red',
  },
  number: {
    marginTop: `${(35 / 570) * 100}%`,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'NewYork',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 26,
  },
  text: {
    // position: 'absolute',
    marginTop: `${(90 / 570) * 100}%`,
    paddingHorizontal: '12.5%',
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'iAWriterQuattroS-Italic',
    color: 'white',
    letterSpacing: -0.5,
    fontSize: 17,
    opacity: 0.8,
  },
  bottom: {
    marginBottom: `${(100 / 570) * 100}%`,
    width: '100%',
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.56,
    fontFamily: 'iAWriterQuattroS-Italic',
    color: '#480D00',
    fontSize: 19,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
