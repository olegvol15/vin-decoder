import { useState } from 'react'

const STORAGE_KEY = 'vin_history'
const MAX_HISTORY = 3

function readHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function useVinHistory(): [string[], (vin: string) => void] {
  const [history, setHistory] = useState<string[]>(readHistory)

  function addVin(vin: string) {
    const updated = [vin, ...history.filter(v => v !== vin)].slice(0, MAX_HISTORY)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setHistory(updated)
  }

  return [history, addVin]
}
