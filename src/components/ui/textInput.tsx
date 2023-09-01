'use client'

import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useState } from 'react'

export default function TextInput({
  id,
  label,
  placeholder,
  autoFocus = false,
  type = 'text',
}: {
  id: string
  label: string
  placeholder: string
  autoFocus?: boolean
  type?: 'text' | 'email'
}) {
  const [defaultValue, setDefaultValue] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setDefaultValue(localStorage.getItem(id) || undefined)
    setIsLoading(false)
  }, [id])

  function save(e: FocusEvent | KeyboardEvent) {
    const [id, value] = [(e.target as HTMLInputElement).id, (e.target as HTMLInputElement).value]
    localStorage.setItem(id, value)
  }

  function handleBlur(e: FocusEvent) {
    save(e)
  }

  function handleEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      save(e);
      (e.target as HTMLInputElement).blur()
    }
  }

  if (isLoading) return <></>

  else return (
    <div className="space-y-1">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="outline-none text-xl w-full"
        placeholder={placeholder}
        autoFocus={autoFocus && !defaultValue}
        autoComplete="off"
        onFocus={(e) => e.target.select()}
        onBlur={handleBlur}
        onKeyDown={handleEnter}
        defaultValue={defaultValue}
      />
    </div>
  )
}
