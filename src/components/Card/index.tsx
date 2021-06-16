import React, { useMemo, ReactNode, memo, MemoExoticComponent } from 'react'
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native'

import CardTitle, { CardTitleContent } from './CardTitle'
import RoundedButton from '@/components/shared/RoundedButton'
import RevertIcon from '@/components/icons/RevertIcon'

import colors, { CardColors } from './colors'
import RedFront from './backgrounds/RedFront.svg'
import BlueFront from './backgrounds/BlueFront.svg'
import BlueBack from './backgrounds/BlueBack.svg'
import PurpleFront from './backgrounds/PurpleFront.svg'
import PinkFront from './backgrounds/PinkFront.svg'
import PinkBack from './backgrounds/PinkBack.svg'

import { range } from '@/utils/math'

type CardBaseColors = 'blue' | 'pink' | 'red' | 'purple'
type CardBaseRevertableColors = Extract<CardBaseColors, 'blue' | 'pink'>
type CardBaseUnrevertableColors = Extract<CardBaseColors, 'red' | 'purple'>
type CardBaseProps = {
  number: number
  style?: StyleProp<ViewStyle>
  title?: CardTitleContent
  text?: string
  bottom?: string
  inner?: ReactNode
  forceBottom?: boolean
  onFlipPress?: () => void
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
  onFlipPress,
}: CardBaseProps) {
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
      {onFlipPress && (
        <RoundedButton onPress={onFlipPress} style={styles.revert}>
          <RevertIcon />
        </RoundedButton>
      )}
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
      <CardTitle content={title} color={BackgroundColors.title} />
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
  revert: {
    alignSelf: 'center',
    marginBottom: 10,
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
