import { useEffect, useState } from "react"

export function useLocalStorageState(innitialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : innitialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])
  return [value, setValue]
}
