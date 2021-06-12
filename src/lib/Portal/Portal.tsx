import React, { ReactNode } from 'react'

import PortalConsumer from './PortalConsumer'
import { Context } from './PortalHost'

interface PortalProps {
  children: ReactNode
}

export default function Portal({ children }: PortalProps) {
  return (
    <Context.Consumer>
      {(manager): ReactNode => (
        <PortalConsumer manager={manager}>{children}</PortalConsumer>
      )}
    </Context.Consumer>
  )
}
