import theme from '@/styles/theme'
import React from 'react'
import { StyleSheet } from 'react-native'
import Svg, { G, Circle, Path } from 'react-native-svg'

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
        <G fill="none" fill-rule="evenodd">
          <G transform="translate(39.5 40.5)">
            <Circle cx="29.5" cy="29.5" r="29.5" fill="#FFFFFF" />
            <Path
              stroke="#2C2C2C"
              stroke-width="2.5"
              d="M34.878 15.074c2.504.66 4.413 1.602 5.692 2.881 1.28 1.28 2.222 3.189 2.882 5.693-.66 2.504-1.602 4.413-2.882 5.693-1.848 1.848-3.68 2.868-5.545 2.92-2.576-.662-4.536-1.616-5.84-2.92-1.28-1.28-2.222-3.19-2.882-5.694.66-2.503 1.603-4.413 2.882-5.692 1.28-1.28 3.189-2.221 5.693-2.881z"
            />
            <Path
              fill="#2C2C2C"
              d="M35.247 19.091l-.231 2.415 1.219-.454-1.004.828 2.208 1.008-2.416-.232.455 1.22-.829-1.005-1.007 2.21.233-2.419-1.22.457 1.004-.828-2.209-1.008 2.417.232-.456-1.22.828 1.004zM27.769 27.386l3.145 3.146-7.444 6.186-6.186 7.444-3.145-3.146 7.444-6.186z"
            />
          </G>
          <G stroke="#FFFFFF">
            <Path d="M68.5 0v33M77.465 1.015l-4 32.712M85.802 2.577l-7.94 31.979M93.885 5.154L82.124 35.922M101.593 8.707l-15.408 29.1M108.808 13.182L89.984 40.18M115.423 18.513L93.462 43.005M121.336 24.617L96.566 46.24M126.459 31.404L99.25 49.834M130.842 39.028l-29.498 14.447M134.134 46.877l-31.032 10.73M136.442 55.071l-32.103 6.853M137.732 63.489l-32.695 2.872M137.983 72.001l-32.8-1.15M137.194 80.48l-32.416-5.155M135.374 88.798l-31.548-9.084M132.553 96.83l-30.21-12.878M128.772 104.453l-28.423-16.479M124.088 111.552l-26.21-19.834M118.573 118.022L94.964 95.128M112.309 123.763L91.655 98.15M105.39 128.69L88 100.74M97.924 132.727l-13.87-29.87M90.02 135.814L79.878 104.47M81.798 137.904l-6.262-32.352M73.384 138.966l-2.29-32.877M64.617 138.966l2.29-32.877M56.203 137.904l6.262-32.352M47.981 135.814l10.142-31.344M40.077 132.727l13.87-29.87M32.61 128.69l17.392-27.95M25.692 123.763L46.346 98.15M19.428 118.022l23.609-22.894M13.913 111.552l26.21-19.834M9.23 104.453l28.422-16.479M5.448 96.83l30.21-12.878M2.627 88.798l31.548-9.084M.807 80.48l32.416-5.155M.018 72.001l32.8-1.15M.27 63.489l32.694 2.872M1.56 55.071l32.102 6.853M3.867 46.877L34.9 57.607M7.159 39.028l29.498 14.447M11.542 31.404l27.209 18.43M16.665 24.617l24.77 21.622M22.578 18.513L44.54 43.005M29.193 13.182L48.017 40.18M36.408 8.707l15.408 29.1M44.116 5.154l11.761 30.768M52.199 2.577l7.94 31.979M60.536 1.015l4 32.712" />
          </G>
          <Circle cx="69.0001441" cy="70" r="31.5" stroke="#FFFFFF" />
          <Circle
            cx="69.0001441"
            cy="70"
            r="37"
            stroke="#FFFFFF"
            stroke-width="2"
          />
          <G fill="#FFFFFF">
            <G transform="translate(35 36)">
              <Circle cx="34" cy="1.21428571" r="1.21428571" />
              <Circle
                cx="66.7857143"
                cy="34"
                r="1.21428571"
                transform="rotate(90 66.786 34)"
              />
              <Circle
                cx="34"
                cy="66.7857143"
                r="1.21428571"
                transform="rotate(180 34 66.786)"
              />
              <Circle
                cx="1.21428571"
                cy="34"
                r="1.21428571"
                transform="rotate(-90 1.214 34)"
              />
            </G>
            <G transform="rotate(45 7.944 94.29)">
              <Circle cx="34.7893951" cy="1.19963431" r="1.19963431" />
              <Circle
                cx="66.6826167"
                cy="33.0928559"
                r="1.19963431"
                transform="rotate(90 66.683 33.093)"
              />
              <Circle
                cx="33.0928559"
                cy="66.6826167"
                r="1.19963431"
                transform="rotate(180 33.093 66.683)"
              />
              <Circle
                cx="1.19963431"
                cy="34.7893951"
                r="1.19963431"
                transform="rotate(-90 1.2 34.79)"
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
    shadowColor: theme.colors.romantic,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
})
