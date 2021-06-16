import { Portal } from '@/lib/Portal'
import React, { useCallback, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import SelectorItem from './common/SelectorItem'
import SelectorKeyboard, {
  SelectorKeyboardItems,
} from './common/SelectorKeyboard'

export interface SingleSelectorProps {
  keyboardLabel: string
  items: SelectorKeyboardItems
}

export default function SingleSelector({
  keyboardLabel,
  items,
}: SingleSelectorProps) {
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>()

  const onChoose = useCallback(
    (choice: string) => {
      setSelected(choice)
      setActive(false)
    },
    [active, selected],
  )

  const choice = useMemo(() => {
    return selected ? items.find((i) => i.name === selected) : null
  }, [selected, items])

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <SelectorItem
          theme="big"
          selected={active}
          onPress={() => (active ? setActive(false) : setActive(true))}
          placeHolderText="?">
          {choice?.icon}
        </SelectorItem>
      </View>
      <Portal>
        <SelectorKeyboard
          label={keyboardLabel}
          onChoose={onChoose}
          items={active ? items : undefined}
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
    marginTop: 10,
    alignItems: 'center',
  },
})
