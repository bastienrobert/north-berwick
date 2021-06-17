import React, { ForwardedRef, forwardRef } from 'react'

import EquationSelector, { EquationSelectorProps } from './EquationSelector'
import SingleSelector, { SingleSelectorProps } from './SingleSelector'
import FamilySelector, { FamilySelectorProps } from './FamilySelector'

export interface InnerSelectorsBase {
  keyboardLabel: string
  initial?: any
  onSelectedChange?: (selected: any) => void
}

export interface InnerSelectorsRef {
  collapse: () => void
  reset: () => void
}

type InnerSelectorsProps =
  | ({ type: 'equation' } & EquationSelectorProps)
  | ({ type: 'single' } & SingleSelectorProps)
  | ({ type: 'family' } & FamilySelectorProps)

const COMPONENTS = {
  equation: EquationSelector,
  single: SingleSelector,
  family: FamilySelector,
}

function InnerSelectors(
  { type, ...props }: InnerSelectorsProps,
  ref: ForwardedRef<InnerSelectorsRef>,
) {
  // type is already checked by object key
  const C = COMPONENTS[type] as any
  return <C ref={ref} {...props} />
}

export default forwardRef(InnerSelectors)
