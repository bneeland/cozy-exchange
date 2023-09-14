'use client'

import { DataContext } from '@/contexts/data'
import { save } from '@/helpers'
import { Data } from '@/types'
import { ChangeEventHandler, useContext, KeyboardEvent } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export default function TextArea({
  id,
  label,
  placeholder,
  autoFocus = false,
  autoSave = false,
  required = true,
  type = 'text',
  value,
  onChange,
}: {
  id: string
  label?: string
  placeholder: string
  autoFocus?: boolean
  autoSave?: boolean
  required?: boolean
  type?: 'text' | 'email'
  value: string
  onChange: ChangeEventHandler
}) {
  const { data } = useContext(DataContext)

  function handleBlur() {
    save(data)
  }

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <TextareaAutosize
        id={id}
        className="outline-none text-xl w-full bg-transparent"
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={autoSave ? handleBlur : undefined}
        autoComplete="off"
      />
    </div>
  )
}
