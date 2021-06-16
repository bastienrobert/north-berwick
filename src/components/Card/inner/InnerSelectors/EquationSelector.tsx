import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import SelectorItem from './common/SelectorItem'
import PlusIcon from './common/PlusIcon'
import EqualIcon from './common/EqualIcon'
import SelectorKeyboard, {
  SelectorKeyboardItems,
} from './common/SelectorKeyboard'

import { Portal } from '@/lib/Portal'

export interface EquationSelectorProps {
  keyboardLabel: string
  plusColor: string
  equalColor: string
  items: [SelectorKeyboardItems, SelectorKeyboardItems]
  result: ReactNode
}

type SelectedItem = [string | null, string | null]

export default function EquationSelector({
  keyboardLabel,
  plusColor,
  equalColor,
  items,
  result,
}: EquationSelectorProps) {
  const [active, setActive] = useState<null | 0 | 1>(null)
  const [selected, setSelected] = useState<SelectedItem>([null, null])

  const onChoose = useCallback(
    (choice: string) => {
      if (active === null) return
      const next: SelectedItem = [...selected]
      next[active] = choice
      setSelected(next)

      console.log(active)
      if (active === 0) setActive(1)
      if (active === 1) setActive(null)
    },
    [active, selected],
  )

  const leftIcon = selected[0]
    ? items[0].find((i) => i.name === selected[0])
    : null
  const rightIcon = selected[1]
    ? items[1].find((i) => i.name === selected[1])
    : null

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upper}>
          <SelectorItem
            placeHolderText="?"
            selected={active === 0}
            onPress={() => (active === 0 ? setActive(null) : setActive(0))}>
            {leftIcon?.icon}
          </SelectorItem>
          <PlusIcon style={styles.plus} fill={plusColor} />
          <SelectorItem
            placeHolderText="?"
            selected={active === 1}
            onPress={() => (active === 1 ? setActive(null) : setActive(1))}>
            {rightIcon?.icon}
          </SelectorItem>
        </View>
        <EqualIcon style={styles.equal} fill={equalColor} />
        <SelectorItem theme="large">{result}</SelectorItem>
      </View>
      <Portal>
        <SelectorKeyboard
          label={keyboardLabel}
          onChoose={onChoose}
          items={active !== null ? items[active] : undefined}
        />
      </Portal>
    </View>
  )
}

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
