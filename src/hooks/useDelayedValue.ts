import * as React from 'react'

export default function useDelayedValue<T>(value: T, delay: number) {
  const [delayedValue, setDelayedValue] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return delayedValue
}
