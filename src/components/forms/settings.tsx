'use client'

import { ChangeEvent } from 'react'
import Fieldset from '../fieldset'
import TextInput from '../ui/textInput'
import useData from '@/hooks/useData'

export default function SettingsForm() {
  const { data, setData } = useData()

  return (
    <>
      <Fieldset legend="Exchange name">
        <TextInput
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
          autoFocus={!data.exchange.name}
          autoSave
        />
      </Fieldset>
      <Fieldset legend="Group contact">
        <TextInput
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
          autoFocus={!!data.exchange.name && !data.exchange.contact.name}
          autoSave
        />
        <TextInput
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
          autoFocus={
            !!data.exchange.name &&
            !!data.exchange.contact.name &&
            !data.exchange.contact.email
          }
          autoSave
        />
      </Fieldset>
    </>
  )
}
