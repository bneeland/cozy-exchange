'use client'

import { config } from '@/config'
import { DataContext } from '@/contexts/data'
import { inflate, save } from '@/helpers'
import { useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'

export default function useData() {
  const { data, setData } = useContext(DataContext)

  useEffect(() => {
    const version = sessionStorage.getItem('version')
    if (version && version === config.VERSION) {
      const savedDataString = sessionStorage.getItem('data')
      const savedData = savedDataString && JSON.parse(savedDataString)
      if (savedData) {
        setData(savedData)
      }
    } else {
      sessionStorage.removeItem('data')
      sessionStorage.setItem('version', config.VERSION)
    }
  }, [setData])

  const searchParams = useSearchParams()

  useEffect(() => {
    async function importData(deflatedString: string) {
      const inflatedString = await inflate(deflatedString)
      const importedData = inflatedString && JSON.parse(inflatedString)
      if (importedData) {
        save(importedData)
        setData(importedData)
      }
    }
    const deflatedString = decodeURIComponent(searchParams.get('d') || '')
    if (deflatedString) {
      importData(deflatedString)
    }
  }, [searchParams])

  return { data, setData }
}
