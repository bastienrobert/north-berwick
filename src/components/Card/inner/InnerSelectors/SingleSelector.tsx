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

import { InnerSelectorsBase, InnerSelectorsRef } from './index'
import SelectorItem from './common/SelectorItem'
import SelectorKeyboard, {
  SelectorKeyboardItems,
} from './common/SelectorKeyboard'

export interface SingleSelectorProps extends InnerSelectorsBase {
  keyboardLabel: string
  items: SelectorKeyboardItems
  initial?: string
  onSelectedChange?: (selected: string) => void
}

function SingleSelector(
  { initial, keyboardLabel, items, onSelectedChange }: SingleSelectorProps,
  ref: ForwardedRef<InnerSelectorsRef>,
) {
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useState<string | null>(initial || null)

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelected(null)
    },
    collapse: () => {
      setActive(false)
    },
  }))

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

  useEffect(() => {
    if (active === null && selected) {
      onSelectedChange?.(selected)
    }
  }, [active, selected])

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
          items={
            active
              ? items.map((item) => {
                  if (item.name === selected) {
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

export default forwardRef(SingleSelector)

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
