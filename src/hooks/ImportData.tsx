'use client'

import { inflate, save } from '@/helpers'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import useData from './useData'
import toast from 'react-hot-toast'

export default function ImportData() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { setData } = useData()

  useEffect(() => {
    async function importData(deflatedString: string) {
      const inflatedString = await inflate(deflatedString)
      const importedData = inflatedString && JSON.parse(inflatedString)
      if (importedData) {
        save(importedData)
        setData(importedData)
        toast('Data from backup link was imported successfully')
        router.replace('/settings')
      }
    }

    const deflatedString = decodeURIComponent(searchParams.get('data') || '')
    if (deflatedString) {
      importData(deflatedString)
    }
  }, [])

  return <></>
}
