'use client'

import { ChangeEvent, useEffect, useRef } from 'react'
import Fieldset from '../fieldset'
import TextInput from '../ui/textInput'
import useData from '@/hooks/useData'

export default function SettingsForm() {
  const exchangeNameInputRef = useRef<HTMLInputElement>(null)
  const exchangeContactNameInputRef = useRef<HTMLInputElement>(null)
  const exchangeContactEmailInputRef = useRef<HTMLInputElement>(null)

  const { isLoadingData, data, setData } = useData()

  useEffect(() => {
    if (!isLoadingData) {
      if (!data.exchange.name) exchangeNameInputRef.current?.focus()
      else if (!data.exchange.contact.name)
        exchangeContactNameInputRef.current?.focus()
      else if (!data.exchange.contact.email)
        exchangeContactEmailInputRef.current?.focus()
    }
  }, [isLoadingData])

  return (
    <>
      <Fieldset legend="Exchange name">
        <TextInput
          customRef={exchangeNameInputRef}
          id="exchangeName"
          label="Exchange name"
          placeholder="Christmas gift exchange"
          value={data.exchange.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({
              ...data,
              exchange: { ...data.exchange, name: e.target.value },
            })
          }
          autoSave
          readOnly={isLoadingData}
        />
      </Fieldset>
      <Fieldset legend="Group contact">
        <TextInput
          customRef={exchangeContactNameInputRef}
          id="contactName"
          label="Contact name"
          placeholder="John Doe"
          value={data.exchange.contact.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({
              ...data,
              exchange: {
                ...data.exchange,
                contact: {
                  ...data.exchange.contact,
                  name: e.target.value,
                },
              },
            })
          }
          autoSave
          readOnly={isLoadingData}
        />
        <TextInput
          customRef={exchangeContactEmailInputRef}
          id="contactEmail"
          label="Contact email"
          placeholder="john.doe@example.com"
          type="email"
          value={data.exchange.contact.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({
              ...data,
              exchange: {
                ...data.exchange,
                contact: {
                  ...data.exchange.contact,
                  email: e.target.value,
                },
              },
            })
          }
          autoSave
          readOnly={isLoadingData}
        />
      </Fieldset>
    </>
  )
}
