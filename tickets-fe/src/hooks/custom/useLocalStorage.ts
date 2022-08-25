import { useState } from "react"

export const useLocalStorage = (key: string, value: string) => {
    const [localValue, setLocalValue] = useState(() => {
        const localStorageJson = localStorage.getItem(key)
        return localStorageJson ? JSON.parse(localStorageJson) : value
    })

    const setLocalStorage = (value: string) => {
        localStorage.setitem(key, JSON.stringify(value))
        setLocalValue(value)

    }
    return [localValue, setLocalStorage]
}