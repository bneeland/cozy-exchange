'use client'

import { config } from '@/config'
import { DataContext } from '@/contexts/data'
import { useContext, useEffect, useState } from 'react'

export default function useData() {
  const { data, setData } = useContext(DataContext)

  const [isLoadingData, setIsLoadingData] = useState(true)

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

    setIsLoadingData(false)
  }, [setData])

  return { isLoadingData, data, setData }
}
