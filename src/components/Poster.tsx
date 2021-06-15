import React, {
  ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  Image,
  ImageProps,
  LayoutChangeEvent,
  LayoutRectangle,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native'
import Svg, { G, Path, PathProps } from 'react-native-svg'

import Fade from '@/components/shared/Fade'
import LinearGradient from '@/components/shared/LinearGradient'

import { range } from '@/utils/math'

const PATHS = [
  'M0,106.332618 C0,106.332618 11.0825579,106.928831 15.2951507,106.332618 C19.5076845,105.736404 23.9208404,105.272735 29.336989,106.597588 C34.7531376,107.9225 43.3409484,104.386845 48.795035,104.544036 C54.2490625,104.701169 57.391178,110.298044 65.013875,108.719812 C72.6366311,107.141522 74.7225108,102.846491 91.7229795,105.724813 C105.540558,108.064235 148.893444,87.2542036 148.893444,82.4846148 C148.893444,77.715026 152.501688,55.2118986 146.686895,41.5455366 C144.313585,35.9676878 146.961148,27.8451605 147.671923,20.3939586 C148.702631,9.58876453 148.692821,0 148.692821,0 L0,0 L0,106.332618 Z',
  'M155.531536,0 C155.531536,0 157.602731,16.3774983 156.661268,22.4026265 C155.719805,28.4277547 153.705693,42.3608011 156.219107,50.8336211 C158.732521,59.306441 155.228633,74.5574934 155.003547,75.6871792 C154.778343,76.8168649 165.32276,82.8419931 173.795925,81.9005687 C182.269089,80.9591442 184.528553,78.3231911 193.001717,80.3943014 C201.474882,82.4654116 213.713897,81.7123073 221.057271,79.2645567 C228.400645,76.8168649 227.270913,73.2394874 232.543093,73.0511672 C237.815272,72.8629058 249.301153,63.4486614 251.184078,59.1181208 C253.066945,54.7875801 258.339124,46.879662 268.318676,45.3733357 C278.298169,43.8670684 287.336199,29.3691792 294.302976,26.9214285 C301.269812,24.4737367 314,17.6955043 314,17.6955043 L314,0 L155.531536,0 Z',
  'M0,118.707762 C0,118.707762 48.9126786,124.683934 60.6443492,123.901155 C72.3760199,123.118436 83.4669156,116.680112 88.6295992,116.680112 C93.7924005,116.680112 98.4218798,118.687914 111.693023,115.907876 C124.964165,113.127837 134.542305,110.503106 141.475961,100 C141.475961,100 150.73492,112.123966 152.123805,131.120727 C153.512631,150.117488 162,168.342013 162,168.342013 C162,168.342013 141.167372,177.454305 133.451593,186.257632 C125.735755,195.061017 109.378253,209.887751 99.6563527,212.822213 C89.934452,215.756675 84.5334418,236.761238 79.2866672,239.386793 C74.0399514,242.012349 47.8062548,252.360148 39.1645325,252.977961 C30.5228691,253.595714 21.4337991,252.218269 0,256 L0,118.707762 Z',
  'M314,26 L314,132 C314,132 284.576992,116.598325 278.944064,116.598325 C273.311137,116.598325 231.402176,89.3703649 230.050247,87.8091208 C229.271627,86.9099464 237.665937,82.0146785 246.62119,73.6752982 C253.214852,67.5350241 260.049684,57.8100678 264.073145,55.2179574 C273.56108,49.1053239 297.64538,38.0042615 300.349178,34.380338 C303.052976,30.7564144 314,26 314,26',
  'M314,139.903157 C314,139.903157 289.993157,132.391691 284.051517,129.624269 C278.109758,126.856906 276.184076,120.222381 265.217681,118.715025 C254.251226,117.207668 245.191989,101.97978 239.470337,101.028062 C233.748745,100.076286 232.318317,100.076286 227.788698,98.4107812 C227.214628,98.1996417 224.627858,95.4347512 220.116882,93.9979313 C216.618596,92.8837085 211.753774,93.087547 207.103807,92.5989117 C202.150553,92.0784818 196.24484,90.7102558 191.273415,91.0549912 C186.30199,91.3997267 182.264913,93.457306 178.662798,93.1945298 C159.204215,91.7751381 156.175463,92.9802698 155.971757,95.8780498 C155.971757,95.8780498 158.922755,115.331494 162.751525,135.893745 C166.580295,156.455995 172.095172,171.923167 166.511743,185.752624 C160.928315,199.582082 154,229.60663 154,236.339423 C154,243.072216 208.149889,250.350875 228.023081,249.986886 C247.896215,249.622956 286.184032,243.072216 296.394065,239.432857 C306.604158,235.79344 314,232.518129 314,232.518129 L314,139.903157 Z',
  'M0,267.556992 C0,267.556992 24.2858833,266.974119 30.162849,264.413311 C36.0398146,261.852563 55.1399383,265.023025 71.7913509,251.609569 C71.7913509,251.609569 91.3812169,243.256633 96.1562478,232.952603 C100.931279,222.648573 101.053729,221.307251 117.949983,210.454485 C134.846237,199.601778 138.641784,193.504705 151.987392,182.286135 C165.333001,171.067623 162.88423,184.724988 158.599001,190.822002 C154.313712,196.919076 154.313712,203.138044 153.089327,214.112706 C151.864942,225.087426 145.253392,231.184441 143.784107,243.988242 C142.31488,256.792043 139.498818,265.205956 143.294364,287.886947 C147.089911,310.567937 148.559197,316.786906 146.232877,318.98185 C143.906557,321.176794 126.030818,328.61519 117.582691,339.467956 C109.134564,350.320604 85.8715431,364.465845 73.015736,369.465387 C64.2460586,372.875814 54.5648591,370.782224 44.0109055,374.525848 C39.0933311,376.270114 38.4885848,377.8793 28.6936223,384.707983 C18.8987189,391.536665 0,393 0,393 L0,267.556992 Z',
  'M152.023715,248.656504 C152.023715,248.656504 151.349177,289.19091 157.19509,313.511459 C163.041061,337.832067 163.536859,353.610407 166.221065,359 C166.221065,359 178.096983,356.084617 193.049709,350.452252 C199.615696,347.978985 206.290057,342.683496 213.631012,340.759588 C229.920635,336.490281 250.213708,332.351081 269.375571,326.625673 C278.514097,323.895315 287.487768,316.954988 295.474256,316.664133 C295.474256,316.664133 311.165531,315.312979 314,313.511459 L314,241 C314,241 287.155059,253.385546 272.315295,254.286276 C257.47559,255.187066 234.091764,262.167992 207.785041,259.240471 C181.478318,256.313067 152.023715,248.656504 152.023715,248.656504',
  'M0,404.919749 L0,466 L149.111559,466 C149.111559,466 151.85663,458.869502 154.137382,448.609107 C156.418134,438.348711 156.81567,403.92684 154.137382,391.018608 C151.459095,378.110377 153.034741,341.901151 152.450879,330.449265 C151.867017,318.99732 140.879689,332.766151 134.928865,337.068855 C128.977924,341.37156 110.133434,360.237482 97.9010346,366.195113 C85.6686356,372.152686 59.6871704,386.059173 48.3102882,388.370713 C36.933406,390.682312 39.714569,393.78154 28.8045883,398.688685 C17.8946077,403.595831 14.1740664,404.58874 0,404.919749',
  'M164.124155,466 L314,466 L314,324 C314,324 290.107288,331.341913 280.319083,333.54805 C270.530878,335.754128 276.124155,330.740207 255.948486,340.767989 C235.772875,350.795711 225.585184,347.787418 215.19772,353.001848 C204.810256,358.216278 183.336213,358.015768 165.058294,371.452862 C165.058294,371.452862 165.687085,386.293936 164.124155,391.107287 C162.561285,395.92058 162.690674,405.747793 164.124155,410.761654 C165.557637,415.775515 166.756213,435.63045 164.558892,440.443802 C162.361571,445.257094 168.283892,460.06911 164.124155,466',
]

type AnimatedPathProps = ComponentType<
  PathProps & { onLayout?: (event: LayoutChangeEvent) => void }
>
const AnimatedPath = Animated.createAnimatedComponent<AnimatedPathProps>(Path)

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1)
}

interface DragImageProps {
  source: ImageProps['source']
  offset: LayoutRectangle
  controls: LayoutRectangle
  placeholder: LayoutRectangle
  onComplete: () => void
}

function DragImage({
  source,
  offset,
  controls,
  placeholder = { x: 0, y: 0, width: 0, height: 0 },
  onComplete,
}: DragImageProps) {
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isDown, setIsDown] = useState<null | boolean>(null)
  const [shouldListen, setShouldListen] = useState(true)

  const component = useRef()
  const position = useRef({ x: 0, y: 0 }).current
  const pan = useRef(new Animated.ValueXY()).current
  const scale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const id = pan.addListener(({ x, y }) => {
      position.x = x
      position.y = y
    })

    return () => {
      pan.removeListener(id)
    }
  }, [position, pan])

  useEffect(() => {
    if (!shouldListen) {
      pan.flattenOffset()
      Animated.spring(pan, {
        useNativeDriver: false,
        toValue: {
          x:
            -(controls.x + layout.x) +
            (placeholder.width / 2 - layout.width / 2) +
            placeholder.x +
            offset.x,
          y:
            -(controls.y + layout.y) +
            (placeholder.height / 2 - layout.height / 2) +
            placeholder.y +
            offset.y,
        },
      }).start()
      Animated.spring(scale, {
        useNativeDriver: false,
        toValue: Math.max(
          placeholder.width / layout.width,
          placeholder.height / layout.height,
        ),
      }).start(() => onComplete())
    }
  }, [shouldListen, placeholder, layout, offset, controls])

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDown(true)
      },
      onPanResponderMove: (_, { dx, dy }) => {
        pan.setValue({ x: dx, y: dy })
      },
      onPanResponderRelease: () => {
        setIsDown(false)
        pan.extractOffset()
      },
    })
  }, [])

  useEffect(() => {
    if (shouldListen && isDown !== null) {
      Animated.spring(scale, {
        useNativeDriver: false,
        toValue: isDown ? 2 : 1,
      }).start()
    }
  }, [shouldListen, isDown])

  useEffect(() => {
    if (shouldListen && isDown === false) {
      const d = distance(
        position.x + controls.x + layout.x + layout.width / 2,
        position.y + controls.y + layout.y + layout.height / 2,
        placeholder.x + offset.x + placeholder.width / 2,
        placeholder.y + offset.y + placeholder.height / 2,
      )
      if (d < 50) {
        setShouldListen(false)
      } else {
        pan.flattenOffset()
        Animated.spring(pan, {
          useNativeDriver: false,
          toValue: {
            x: 0,
            y: 0,
          },
        }).start()
      }
    }
  }, [shouldListen, position, controls, layout, placeholder, isDown])

  return (
    <Animated.Image
      ref={component}
      source={source}
      resizeMode="contain"
      onLayout={(e) => setLayout(e.nativeEvent.layout)}
      style={[
        styles.image,
        {
          zIndex: isDown ? 10 : 0,
          transform: [...pan.getTranslateTransform(), { scale }],
        },
      ]}
      {...(shouldListen ? panResponder.panHandlers : {})}
    />
  )
}

interface PlaceholderProps {
  completed: boolean
  d: string
  onLayout: (event: LayoutChangeEvent) => void
}

function Placeholder({ completed, d, onLayout }: PlaceholderProps) {
  const value = completed ? 0 : 1
  const opacity = useRef(new Animated.Value(value)).current

  useEffect(() => {
    Animated.spring(opacity, {
      useNativeDriver: false,
      toValue: value,
    }).start()
  }, [value, opacity])

  return <AnimatedPath opacity={opacity} d={d} onLayout={onLayout} />
}

export interface PosterProps {
  completed: boolean
  onComplete?: () => void
}

export default function Poster({ completed = false, onComplete }: PosterProps) {
  const [main, setMain] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const [controls, setControls] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const [layouts, setLayouts] = useState<LayoutRectangle[]>([])
  const [showCompleted, setShowCompleted] = useState(false)
  const [innerCompleted, setInnerCompleted] = useState<boolean[]>(
    range(PATHS.length).map(() => false),
  )

  const setLayout = useCallback((key: number, layout: LayoutRectangle) => {
    if (key === 0) setLayouts([layout])
    else setLayouts((l) => [...l, layout])
  }, [])

  return (
    <View style={styles.container}>
      <Fade
        position="inherit"
        start={innerCompleted.every((c) => c === true)}
        color="white"
        onHalf={() => setShowCompleted(true)}
        onComplete={onComplete}
      />
      {completed || showCompleted ? (
        <Image
          style={styles.completed}
          resizeMode="contain"
          source={require('@/assets/images/poster/completed.jpg')}
        />
      ) : (
        <>
          <Svg
            viewBox="0 0 318 470"
            onLayout={(e) => setMain(e.nativeEvent.layout)}
            style={{ width: '90%', aspectRatio: 318 / 470 }}>
            <G
              stroke="none"
              strokeWidth={1}
              fill="none"
              fillRule="evenodd"
              strokeDasharray={4}>
              <G
                transform="translate(-29.000000, -25.000000)"
                fill="#FFCEB2"
                stroke="#f22707"
                strokeWidth={1}>
                <G transform="translate(31.000000, 27.000000)">
                  {PATHS.map((d, i) => (
                    <Placeholder
                      key={i}
                      d={d}
                      completed={innerCompleted[i]}
                      onLayout={(e) => setLayout(i, e.nativeEvent.layout)}
                    />
                  ))}
                </G>
              </G>
            </G>
          </Svg>
          <View
            onLayout={(e) => setControls(e.nativeEvent.layout)}
            style={styles.controls}>
            {[
              require('@/assets/images/poster/1.png'),
              require('@/assets/images/poster/2.png'),
              require('@/assets/images/poster/3.png'),
              require('@/assets/images/poster/4.png'),
              require('@/assets/images/poster/5.png'),
              require('@/assets/images/poster/6.png'),
              require('@/assets/images/poster/7.png'),
              require('@/assets/images/poster/8.png'),
              require('@/assets/images/poster/9.png'),
            ].map((source, i) => (
              <DragImage
                key={i}
                placeholder={layouts[i]}
                onComplete={() =>
                  setInnerCompleted((c) => {
                    c[i] = true
                    return [...c]
                  })
                }
                controls={controls}
                offset={main}
                source={source}
              />
            ))}
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  image: {
    aspectRatio: 1,
    width: '19%',
  },
  completed: {
    flex: 1,
    width: '90%',
  },
})
