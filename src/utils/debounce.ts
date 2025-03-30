// 受控组件的防抖
import { useState, useEffect } from 'react'
export default function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    // dealy秒后更新value
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounceValue
}
