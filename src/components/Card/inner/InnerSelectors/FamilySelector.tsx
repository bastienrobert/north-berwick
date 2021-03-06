import { Portal } from '@/lib/Portal'
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { SvgProps, Path } from 'react-native-svg'

import { InnerSelectorsBase, InnerSelectorsRef } from './index'
import SelectorItem from './common/SelectorItem'
import SelectorKeyboard from './common/SelectorKeyboard'
import { SelectorKeyboardItemParams } from './common/SelectorKeyboardItem'

import theme from '@/styles/theme'

export type FamilyItem = SelectorKeyboardItemParams & { display: string }
export type FamilyItems = [FamilyItem, FamilyItem, FamilyItem, FamilyItem]

interface FamilyResults {
  parent: string
  children: [string, string, string]
}

type SelectedItems = Nullable<[string, string, string, string]>

export interface FamilySelectorProps extends InnerSelectorsBase {
  main: string
  items: FamilyItems
  initial?: {
    parent: FamilyResults['parent'] | null
    children: Nullable<FamilyResults['children']>
  }
  onSelectedChange?: (selected: FamilyResults) => void
}

function FamilyTree(props: SvgProps) {
  return (
    <Svg width={153} height={87} viewBox="0 0 153 87" {...props}>
      <Path
        d="M3.5 50.5V55L2 56.5.5 55v-5.5l2-2H75V3H62.5L61 1.5 62.5 0h28L92 1.5 90.5 3H78v44.5h72.5l2 2V55l-1.5 1.5-1.5-1.5v-4.5H78V85l-1.5 1.5L75 85V50.5z"
        fill={theme.colors.fog}
        fillRule="nonzero"
      />
    </Svg>
  )
}

function FamilySelector(
  {
    initial,
    disabled,
    main,
    items,
    keyboardLabel,
    onSelectedChange,
  }: FamilySelectorProps,
  ref: ForwardedRef<InnerSelectorsRef>,
) {
  const hasBeenModified = useRef(false)
  const [active, _setActive] = useState<null | 0 | 1 | 2 | 3>(null)
  const [selected, setSelected] = useState<SelectedItems>(
    initial ? [initial.parent, ...initial.children] : [null, null, null, null],
  )

  const selectedItems = useMemo(() => {
    return selected.map((s) => items.find((i) => i.name === s))
  }, [selected])

  const setActive = useCallback(
    (payload: typeof active) => {
      if (disabled) return
      _setActive(active !== payload ? payload : null)
    },
    [active, disabled],
  )

  const onChoose = useCallback(
    (choice: string) => {
      if (active === null) return
      const next: SelectedItems = [...selected]
      hasBeenModified.current = true
      next[active] = choice
      setSelected(next)

      const nextIndex = next.every((n) => n !== null)
        ? active + 1
        : next.findIndex((n, i) => i > active && n === null)
      // SelectedItems length is fixed to 4
      _setActive(
        nextIndex > 0 && nextIndex < 4 ? (nextIndex as 0 | 1 | 2 | 3) : null,
      )
    },
    [active, selected],
  )

  useEffect(() => {
    if (
      hasBeenModified.current &&
      active === null &&
      selected.every((s) => s !== null)
    ) {
      hasBeenModified.current = false
      // can't be null because of test below
      onSelectedChange?.({
        parent: selected[0],
        children: [selected[1], selected[2], selected[3]],
      } as any)
    }
  }, [active, selected])

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelected([null, null, null, null])
    },
    collapse: () => {
      setActive(null)
    },
  }))

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.topWrapper}>
          <SelectorItem placeHolderText={main} style={{ marginRight: 45 }} />
          <SelectorItem
            selected={active === 0}
            onPress={() => setActive(0)}
            placeHolderText={selectedItems[0]?.display || '?'}
          />
        </View>
        <FamilyTree />
        <View style={styles.bottomWrapper}>
          <SelectorItem
            selected={active === 1}
            style={[{ marginTop: -30 }]}
            placeHolderText={selectedItems[1]?.display || '?'}
            onPress={() => setActive(1)}
          />
          <SelectorItem
            selected={active === 2}
            onPress={() => setActive(2)}
            placeHolderText={selectedItems[2]?.display || '?'}
          />
          <SelectorItem
            selected={active === 3}
            style={[{ marginTop: -30 }]}
            placeHolderText={selectedItems[3]?.display || '?'}
            onPress={() => setActive(3)}
          />
        </View>
      </View>
      <Portal>
        <SelectorKeyboard
          size="medium"
          onChoose={onChoose}
          label={keyboardLabel}
          items={
            active !== null
              ? items.map((item) => {
                  // if (selected.includes(item.name)) {
                  //   return { ...item, disabled: true }
                  // }
                  return item
                })
              : undefined
          }
        />
      </Portal>
    </View>
  )
}

export default forwardRef(FamilySelector)

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
  },
  wrapper: {
    marginBottom: '5%',
    alignItems: 'center',
  },
  topWrapper: {
    flexDirection: 'row',
    transform: [
      {
        translateY: 18,
      },
    ],
  },
  bottomWrapper: {
    flexDirection: 'row',
    marginTop: 12.5,
  },
})
