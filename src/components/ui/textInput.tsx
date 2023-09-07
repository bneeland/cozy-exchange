'use client'

import { DataContext } from '@/contexts/data'
import { ChangeEventHandler, useContext, KeyboardEvent } from 'react'

export default function TextInput({
  id,
  label,
  placeholder,
  autoFocus = false,
  type = 'text',
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  autoFocus?: boolean
  type?: 'text' | 'email'
  value: string
  onChange: ChangeEventHandler
}) {
  const { data } = useContext(DataContext)

  function save() {
    localStorage.setItem('data', JSON.stringify(data))
  }

  function handleBlur() {
    save()
  }

  function handleEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      save()
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
        onKeyDown={handleEnter}
        autoComplete="off"
      />
    </div>
  )
}
