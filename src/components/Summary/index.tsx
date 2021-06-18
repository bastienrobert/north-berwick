import React from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from 'react-native'

import SummaryTitle from './SummaryTitle'
import SummaryParagraph, { SummaryParagraphParams } from './SummaryParagraph'
import LargeButton, { LargeButtonProps } from '@/components/shared/LargeButton'
import LinearGradient from '@/components/shared/LinearGradient'

export interface SummaryProps {
  title: string
  titleColor: string
  button: string
  contentLabelBackgroundColor: string
  content: SummaryParagraphParams[]
  onPress: LargeButtonProps['onPress']
  colors: [string, string] | [string, string, string]
  style?: StyleProp<ViewStyle>
}

export default function Summary({
  title,
  titleColor,
  button,
  contentLabelBackgroundColor,
  content,
  onPress,
  colors,
  style,
}: SummaryProps) {
  const { width } = useWindowDimensions()
  const w = Math.min(width, 370)

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        stops={
          colors[2]
            ? [
                { offset: '0', stopColor: colors[0] },
                { offset: '0.48', stopColor: colors[1] },
                { offset: '1', stopColor: colors[2] },
              ]
            : [
                { offset: '0', stopColor: colors[0] },
                { offset: '1', stopColor: colors[1] },
              ]
        }
      />
      <SafeAreaView>
        <View style={styles.main}>
          <SummaryTitle
            content={title}
            color={titleColor}
            style={{
              width: w,
              height:
                (w / SummaryTitle.DIMENSIONS.width) *
                SummaryTitle.DIMENSIONS.height,
            }}
          />
          <View style={styles.content}>
            {content.map(({ label, text }, i) => {
              return (
                <SummaryParagraph
                  style={styles.paragraph}
                  key={`${label}-${i}`}
                  label={label}
                  text={text}
                  labelBackgroundColor={contentLabelBackgroundColor}
                />
              )
            })}
          </View>
        </View>
        <LargeButton onPress={onPress} style={styles.button}>
          {button}
        </LargeButton>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    marginTop: 60,
    alignSelf: 'center',
    flex: 1,
  },
  content: {
    marginTop: -20,
    width: '70%',
    alignSelf: 'center',
  },
  paragraph: {
    alignItems: 'center',
    marginBottom: 30,
    maxWidth: 250,
  },
  button: {
    marginBottom: 40,
    alignSelf: 'center',
  },
})
