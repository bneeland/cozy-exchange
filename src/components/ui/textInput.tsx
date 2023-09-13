'use client'

import { DataContext } from '@/contexts/data'
import { save } from '@/helpers'
import { Data } from '@/types'
import { ChangeEventHandler, useContext, KeyboardEvent } from 'react'

export default function TextInput({
  id,
  label,
  placeholder,
  autoFocus = false,
  saveOnEnter = false,
  type = 'text',
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  autoFocus?: boolean
  saveOnEnter?: boolean
  type?: 'text' | 'email'
  value: string
  onChange: ChangeEventHandler
}) {
  const { data } = useContext(DataContext)

  function handleBlur() {
    save(data)
  }

  function handleEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      save(data)
      ;(e.target as HTMLInputElement).blur()
    }
  }

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="outline-none text-xl w-full"
        placeholder={placeholder}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyDown={saveOnEnter ? handleEnter : undefined}
        autoComplete="off"
      />
    </div>
  )
}
