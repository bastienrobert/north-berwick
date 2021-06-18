import theme from '@/styles/theme'
import React from 'react'
import { StyleSheet } from 'react-native'
import Svg, { SvgProps, Defs, Circle, G, Use, Path } from 'react-native-svg'

import TouchableOpacityOrView, {
  TouchableOpacityOrViewProps,
} from './shared/TouchableOpacityOrView'

type ScanButtonProps = TouchableOpacityOrViewProps

export default function ScanButton({ style, ...rest }: ScanButtonProps) {
  return (
    <TouchableOpacityOrView
      activeOpacity={1}
      style={[styles.container, style]}
      {...rest}>
      <Svg viewBox="0 0 138 139">
        <Defs>
          <Circle id="prefix__b" cx={28} cy={28} r={27.5} />
        </Defs>
        <G fill="none" fillRule="evenodd">
          <G transform="translate(41 42)">
            <Use fill={theme.colors.white} xlinkHref="#prefix__b" />
          </G>
          <Path
            d="M69.741 78.741c2.667 0 5.111-.533 7.334-1.6l4.666-6.4-4.666-6.4c-2.223-1.066-4.667-1.6-7.334-1.6-2.666 0-5.11.534-7.333 1.6l-4.667 6.4 4.667 6.4c2.222 1.067 4.667 1.6 7.333 1.6z"
            stroke={theme.colors.mineShaft}
            strokeWidth={2.5}
          />
          <Path
            d="M71.241 63.991c1.187 0 2.503.45 3.962 1.289.839 1.459 1.288 2.775 1.288 3.961 0 1.683-.344 3-1.159 3.887-1.51.887-2.87 1.363-4.09 1.363-1.187 0-2.503-.45-3.963-1.288-.838-1.46-1.288-2.775-1.288-3.962 0-1.186.45-2.502 1.289-3.962 1.459-.838 2.775-1.288 3.961-1.288z"
            stroke={theme.colors.mineShaft}
            strokeWidth={2.5}
            fill={theme.colors.mineShaft}
          />
          <Path
            fill={theme.colors.white}
            d="M73.813 63.741l-.309 3.227 1.628-.607-1.34 1.106 2.95 1.346-3.229-.31.609 1.63-1.108-1.343-1.344 2.951.31-3.23-1.63.61 1.341-1.106-2.95-1.345 3.228.309-.608-1.628 1.106 1.34z"
          />
          <G stroke={theme.colors.white}>
            <Path d="M68.5 0v33M77.465 1.015l-4 32.712M85.802 2.577l-7.94 31.978M93.886 5.155L82.124 35.922M101.594 8.707l-15.408 29.1M108.809 13.183L89.983 40.179M115.422 18.513l-21.96 24.49M121.336 24.617L96.566 46.24M126.46 31.404l-27.21 18.43M130.842 39.028l-29.498 14.447M134.134 46.877l-31.032 10.73M136.442 55.072l-32.102 6.852M137.732 63.488l-32.695 2.873M137.984 72.001l-32.8-1.15M137.194 80.48l-32.416-5.155M135.375 88.798l-31.548-9.084M132.553 96.83l-30.21-12.877M128.772 104.453L100.35 87.975M124.088 111.553L97.877 91.719M118.572 118.022L94.964 95.128M112.31 123.763L91.654 98.15M105.391 128.69L88 100.74M97.923 132.726l-13.87-29.869M90.02 135.813L79.877 104.47M81.798 137.904l-6.262-32.352M73.384 138.966l-2.29-32.878M64.617 138.966l2.29-32.878M56.203 137.904l6.262-32.352M47.982 135.813l10.142-31.344M40.078 132.726l13.87-29.869M32.61 128.69l17.392-27.95M25.692 123.763L46.346 98.15M19.429 118.022l23.608-22.894M13.913 111.553l26.211-19.834M9.229 104.453l28.423-16.478M5.448 96.83l30.21-12.877M2.626 88.798l31.548-9.084M.807 80.48l32.416-5.155M.017 72.001l32.8-1.15M.27 63.488l32.694 2.873M1.56 55.072l32.101 6.852M3.867 46.877l31.032 10.73M7.16 39.028l29.497 14.447M11.542 31.404l27.208 18.43M16.665 24.617l24.77 21.622M22.579 18.513l21.96 24.491M29.193 13.183l18.825 26.996M36.407 8.707l15.41 29.1M44.115 5.155l11.762 30.767M52.199 2.577l7.94 31.978M60.536 1.015l4 32.712" />
          </G>
          <Circle stroke={theme.colors.white} cx={69} cy={70} r={32} />
          <Circle
            stroke={theme.colors.white}
            strokeWidth={2}
            cx={69}
            cy={70}
            r={37}
          />
          <G fill={theme.colors.white}>
            <G transform="translate(35 36)">
              <Circle cx={34} cy={1.214} r={1.214} />
              <Circle
                transform="rotate(90 66.786 34)"
                cx={66.786}
                cy={34}
                r={1.214}
              />
              <Circle
                transform="rotate(180 34 66.786)"
                cx={34}
                cy={66.786}
                r={1.214}
              />
              <Circle
                transform="rotate(-90 1.214 34)"
                cx={1.214}
                cy={34}
                r={1.214}
              />
            </G>
            <G transform="rotate(45 7.944 94.29)">
              <Circle cx={34.789} cy={1.2} r={1.2} />
              <Circle
                transform="rotate(90 66.683 33.093)"
                cx={66.683}
                cy={33.093}
                r={1.2}
              />
              <Circle
                transform="rotate(180 33.093 66.683)"
                cx={33.093}
                cy={66.683}
                r={1.2}
              />
              <Circle
                transform="rotate(-90 1.2 34.79)"
                cx={1.2}
                cy={34.789}
                r={1.2}
              />
            </G>
          </G>
        </G>
      </Svg>
    </TouchableOpacityOrView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 138,
    height: 138,
    shadowColor: theme.colors.mineShaft,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.16,
    elevation: 8,
  },
})
