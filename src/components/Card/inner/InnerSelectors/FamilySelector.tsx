import { Portal } from '@/lib/Portal'
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { SvgProps, Path } from 'react-native-svg'

import { InnerSelectorsBase, InnerSelectorsRef } from './index'
import SelectorItem from './common/SelectorItem'
import SelectorKeyboard from './common/SelectorKeyboard'
import { SelectorKeyboardItemParams } from './common/SelectorKeyboardItem'

type FamilyItem = SelectorKeyboardItemParams & { display: string }

interface FamilyItems {
  parent: FamilyItem
  children: [FamilyItem, FamilyItem, FamilyItem]
}

interface FamilyResults {
  parent: string
  children: [string, string, string]
}

export interface FamilySelectorProps extends InnerSelectorsBase {
  main: string
  items: FamilyItems
  onSelectedChange?: (selected: FamilyResults) => void
}

function FamilyTree(props: SvgProps) {
  return (
    <Svg width={153} height={87} viewBox="0 0 153 87" {...props}>
      <Path
        d="M3.5 50.5V55L2 56.5.5 55v-5.5l2-2H75V3H62.5L61 1.5 62.5 0h28L92 1.5 90.5 3H78v44.5h72.5l2 2V55l-1.5 1.5-1.5-1.5v-4.5H78V85l-1.5 1.5L75 85V50.5z"
        fill="#D9CCFF"
        fillRule="nonzero"
      />
    </Svg>
  )
}

type SelectedItems = Nullable<[string, string, string, string]>

function FamilySelector(
  { main, items, keyboardLabel, onSelectedChange }: FamilySelectorProps,
  ref: ForwardedRef<InnerSelectorsRef>,
) {
  const [active, _setActive] = useState<null | 0 | 1 | 2 | 3>(null)
  const [selected, setSelected] = useState<SelectedItems>([
    null,
    null,
    null,
    null,
  ])

  const keyboardItems = useMemo(() => {
    return [items.parent, ...items.children]
  }, [items])

  const selectedItems = useMemo(() => {
    return selected.map((s) => keyboardItems.find((i) => i.name === s))
  }, [selected])

  const setActive = useCallback(
    (payload: typeof active) => {
      _setActive(active !== payload ? payload : null)
    },
    [active],
  )

  const onChoose = useCallback(
    (choice: string) => {
      if (active === null) return
      const next: SelectedItems = [...selected]
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
    if (active === null && selected.every((s) => s !== null)) {
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
            onPress={() => setActive(0)}
            placeHolderText={selectedItems[0]?.display || '?'}
          />
        </View>
        <FamilyTree />
        <View style={styles.bottomWrapper}>
          <SelectorItem
            style={[{ marginTop: -30 }]}
            placeHolderText={selectedItems[1]?.display || '?'}
            onPress={() => setActive(1)}
          />
          <SelectorItem
            onPress={() => setActive(2)}
            placeHolderText={selectedItems[2]?.display || '?'}
          />
          <SelectorItem
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
          items={active !== null ? keyboardItems : undefined}
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
    marginBottom: '15%',
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
