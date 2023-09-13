'use client'

import { DataContext } from '@/contexts/data'
import { ChangeEvent, useContext, useEffect } from 'react'
import Fieldset from '../fieldset'
import TextInput from '../ui/textInput'

export default function SettingsForm() {
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
      <Fieldset legend="Exchange name">
        <TextInput
          id="exchangeName"
          label="Exchange name"
          placeholder="Christmas gift exchange"
          value={data.exchange.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, exchange: { name: e.target.value } })
          }
          autoFocus
          saveOnEnter
        />
      </Fieldset>
      <Fieldset legend="Group contact">
        <TextInput
          id="contactName"
          label="Contact name"
          placeholder="John Doe"
          value={data.contact.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({
              ...data,
              contact: { ...data.contact, name: e.target.value },
            })
          }
          saveOnEnter
        />
        <TextInput
          id="contactEmail"
          label="Contact email"
          placeholder="john.doe@example.com"
          type="email"
          value={data.contact.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({
              ...data,
              contact: { ...data.contact, email: e.target.value },
            })
          }
          saveOnEnter
        />
      </Fieldset>
    </>
  )
}
