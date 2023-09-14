'use client'

import { DataContext } from '@/contexts/data'
import { ChangeEvent, useContext, useEffect } from 'react'
import Fieldset from '../fieldset'
import TextArea from '../ui/textArea'

export default function FinalizeForm() {
  const { data, setData } = useContext(DataContext)

  useEffect(() => {
    const savedDataString = localStorage.getItem('data')
    const savedData = savedDataString && JSON.parse(savedDataString)
    if (savedData) {
      setData(savedData)
    }
  }, [setData])

  return (
    <>
      <Fieldset legend="Info">
        <TextArea
          id="message"
          label="Message"
          placeholder="Write an optional message, including any special guidelines or details that you'd like everyone to know."
          value={data.message}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, message: e.target.value })
          }
          autoFocus
          autoSave
        />
      </Fieldset>
    </>
  )
}
