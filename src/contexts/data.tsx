'use client'

import { Data } from '@/types'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

const initialData: Data = {
  exchange: {
    name: '',
  },
  contact: {
    name: '',
    email: '',
  },
  people: [],
  rules: {
    inclusions: [],
    exclusions: [],
  },
  message: '',
}

export const DataContext = createContext<{
  data: Data
  setData: Dispatch<SetStateAction<Data>>
}>({
  data: initialData,
  setData: () => {},
})

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Data>(initialData)

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}
