'use client'

import { DataContext } from '@/contexts/data'
import { save } from '@/helpers'
import { ChangeEventHandler, useContext, KeyboardEvent, RefObject } from 'react'

export default function TextInput({
  id,
  label,
  placeholder,
  autoFocus = false,
  autoSave = false,
  required = true,
  type = 'text',
  value,
  onChange,
  customRef,
  readOnly = false,
}: {
  id?: string
  label?: string
  placeholder?: string
  autoFocus?: boolean
  autoSave?: boolean
  required?: boolean
  type?: 'text' | 'email'
  value: string
  onChange?: ChangeEventHandler
  customRef?: RefObject<HTMLInputElement>
  readOnly?: boolean
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
    <div className="space-y-1 w-full">
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <input
        ref={customRef}
        id={id}
        type={type}
        className="text-xl w-full bg-transparent py-2 rounded-2xl outline-none outline-offset-2 focus:outline-4 focus:outline-blue-400/40"
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={autoSave ? handleBlur : undefined}
        onKeyDown={autoSave ? handleEnter : undefined}
        autoComplete="off"
        readOnly={readOnly}
      />
    </div>
  )
}
