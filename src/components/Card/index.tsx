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

import { romanize } from '@/utils/math'

import theme from '@/styles/theme'

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
  title: theme.colors.white,
  number: theme.colors.white,
  text: theme.colors.white,
  bottom: theme.colors.white,
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
        {romanize(number)}
      </Text>
      {text && (
        <Text style={[styles.text, { color: BackgroundColors.text }]}>
          {text}
        </Text>
      )}
      {inner}
      <View
        style={[styles.end, { marginTop: forceBottom ? 'auto' : undefined }]}>
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
            },
          ]}>
          {bottom}
        </Text>
      </View>
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
    color: DEFAULT_COLORS.number,
    textTransform: 'uppercase',
    fontSize: 26,
  },
  text: {
    marginTop: `${(90 / 570) * 100}%`,
    paddingHorizontal: '12.5%',
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'iAWriterQuattroS-Italic',
    color: DEFAULT_COLORS.text,
    letterSpacing: -0.5,
    fontSize: 17,
    opacity: 0.8,
  },
  end: {
    marginBottom: `${(100 / 570) * 100}%`,
  },
  revert: {
    marginTop: -(45 + 10),
    alignSelf: 'center',
    marginBottom: 10,
  },
  bottom: {
    width: '100%',
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.56,
    fontFamily: 'iAWriterQuattroS-Italic',
    color: DEFAULT_COLORS.bottom,
    fontSize: 19,
  },
})
