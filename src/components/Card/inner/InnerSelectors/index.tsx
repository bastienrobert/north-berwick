import React from 'react'

import EquationSelector, { EquationSelectorProps } from './EquationSelector'
import SingleSelector, { SingleSelectorProps } from './SingleSelector'
import FamilySelector, { FamilySelectorProps } from './FamilySelector'

type InnerSelectorsProps =
  | ({ type: 'equation' } & EquationSelectorProps)
  | ({ type: 'single' } & SingleSelectorProps)
  | ({ type: 'family' } & FamilySelectorProps)

const COMPONENTS = {
  equation: EquationSelector,
  single: SingleSelector,
  family: FamilySelector,
}

export default function InnerSelectors({
  type,
  ...props
}: InnerSelectorsProps) {
  const C = COMPONENTS[type] as any
  return <C {...props} />
}
