import * as React from 'react'

import LocalizationContext from './context'

export default function useLocalization() {
  const context = React.useContext(LocalizationContext)
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider')
  }
  return context
}
