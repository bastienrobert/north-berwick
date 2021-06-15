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
  items: [SelectorKeyboardItems, SelectorKeyboardItems]
  result: ReactNode
}

type SelectedItem = [string | null, string | null]

export default function EquationSelector({
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

      if (active === 0) setActive(1)
      if (active === 1) setActive(null)
    },
    [active, selected],
  )

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upper}>
          <SelectorItem
            placeHolderText="?"
            selected={active === 0}
            onPress={() => setActive(0)}>
            {selected[0] ? items[0][selected[0]].icon : null}
          </SelectorItem>
          <PlusIcon style={styles.plus} fill="#FFADA7" />
          <SelectorItem
            placeHolderText="?"
            selected={active === 1}
            onPress={() => setActive(1)}>
            {selected[1] ? items[1][selected[1]].icon : null}
          </SelectorItem>
        </View>
        <EqualIcon style={styles.equal} fill="#FFDAD7" />
        <SelectorItem theme="large">{result}</SelectorItem>
      </View>
      <Portal>
        {active !== null && (
          <SelectorKeyboard
            isOpen={active !== null}
            onChoose={onChoose}
            items={items[active]}
          />
        )}
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
