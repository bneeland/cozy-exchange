'use client'

import { config } from '@/config'
import { DataContext } from '@/contexts/data'
import { inflate, save } from '@/helpers'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'

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

  const router = useRouter()

  useEffect(() => {
    async function importData(deflatedString: string) {
      const inflatedString = await inflate(deflatedString)
      const importedData = inflatedString && JSON.parse(inflatedString)
      if (importedData) {
        save(importedData)
        setData(importedData)
        router.replace('/settings')
        toast('Data from backup link was imported successfully')
      }
    }
    const deflatedString = decodeURIComponent(searchParams.get('data') || '')
    if (deflatedString) {
      importData(deflatedString)
    }
  }, [searchParams])

  return { data, setData }
}
