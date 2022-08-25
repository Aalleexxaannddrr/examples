import { useCallback, useState } from 'react'

const useDebounce = (someFunction: Function, delay: number) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  return useCallback(
    function (...args) {
      clearTimeout(timer)
      const newTimer = setTimeout(() => {
        someFunction(...args)
      }, delay)
      setTimer(newTimer)
    },
    [delay, someFunction, timer]
  )
}

export default useDebounce
