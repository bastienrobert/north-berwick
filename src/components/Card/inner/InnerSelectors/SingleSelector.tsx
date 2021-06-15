import { Portal } from '@/lib/Portal'
import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import SelectorItem from './common/SelectorItem'
import SelectorKeyboard, {
  SelectorKeyboardItems,
} from './common/SelectorKeyboard'

export interface SingleSelectorProps {
  items: SelectorKeyboardItems
}

export default function SingleSelector({ items }: SingleSelectorProps) {
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>()

  const onChoose = useCallback(
    (choice: string) => {
      setSelected(choice)
      setActive(false)
    },
    [active, selected],
  )

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <SelectorItem
          theme="big"
          onPress={() => setActive(true)}
          placeHolderText="?">
          {selected ? items[selected].icon : null}
        </SelectorItem>
      </View>
      <Portal>
        <SelectorKeyboard isOpen={active} onChoose={onChoose} items={items} />
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
