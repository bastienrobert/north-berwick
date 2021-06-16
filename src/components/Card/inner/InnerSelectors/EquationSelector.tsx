import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { StyleSheet, View } from 'react-native'

import { InnerSelectorsBase, InnerSelectorsRef } from './index'
import SelectorItem from './common/SelectorItem'
import PlusIcon from './common/PlusIcon'
import EqualIcon from './common/EqualIcon'
import SelectorKeyboard, {
  SelectorKeyboardItems,
} from './common/SelectorKeyboard'

import { Portal } from '@/lib/Portal'

export interface EquationSelectorProps extends InnerSelectorsBase {
  plusColor: string
  equalColor: string
  items: [SelectorKeyboardItems, SelectorKeyboardItems]
  result: ReactNode
  onSelectedChange?: (selected: [string, string]) => void
}

type SelectedItem = [string | null, string | null]

function EquationSelector(
  {
    keyboardLabel,
    plusColor,
    equalColor,
    items,
    result,
    onSelectedChange,
  }: EquationSelectorProps,
  ref: ForwardedRef<InnerSelectorsRef>,
) {
  const [active, setActive] = useState<null | 0 | 1>(null)
  const [selected, setSelected] = useState<SelectedItem>([null, null])

  const onChoose = useCallback(
    (choice: string) => {
      if (active === null) return
      const next: SelectedItem = [...selected]
      next[active] = choice
      setSelected(next)

      if (active === 0) setActive(1)
      if (active === 1) setActive(null)
    },
    [active, selected],
  )

  const leftChoice = useMemo(() => {
    return selected[0] ? items[0].find((i) => i.name === selected[0]) : null
  }, [selected, items])

  const rightChoice = useMemo(() => {
    return selected[1] ? items[1].find((i) => i.name === selected[1]) : null
  }, [selected, items])

  useEffect(() => {
    if (active === null && selected.every((s) => s !== null)) {
      // can't be null because of test below
      onSelectedChange?.(selected as any)
    }
  }, [selected, active])

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelected([null, null])
    },
    collapse: () => {
      setActive(null)
    },
  }))

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upper}>
          <SelectorItem
            placeHolderText="?"
            selected={active === 0}
            onPress={() => setActive(active === 0 ? null : 0)}>
            {leftChoice?.icon}
          </SelectorItem>
          <PlusIcon style={styles.plus} fill={plusColor} />
          <SelectorItem
            placeHolderText="?"
            selected={active === 1}
            onPress={() => setActive(active === 1 ? null : 1)}>
            {rightChoice?.icon}
          </SelectorItem>
        </View>
        <EqualIcon style={styles.equal} fill={equalColor} />
        <SelectorItem theme="large">{result}</SelectorItem>
      </View>
      <Portal>
        <SelectorKeyboard
          label={keyboardLabel}
          onChoose={onChoose}
          items={
            active !== null
              ? // prevent two similar items in the same equation
                items[active].map((item) => {
                  if (active === 1 && leftChoice?.name === item.name) {
                    return { ...item, disabled: true }
                  }
                  if (active === 0 && rightChoice?.name === item.name) {
                    return { ...item, disabled: true }
                  }
                  return item
                })
              : undefined
          }
        />
      </Portal>
    </View>
  )
}

export default forwardRef(EquationSelector)

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
  },
  wrapper: {
    alignItems: 'center',
  },
  upper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plus: {
    marginHorizontal: 8,
  },
  equal: {
    marginTop: 32,
    marginBottom: 20,
  },
})
