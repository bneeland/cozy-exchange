import { ChangeEventHandler, RefObject } from 'react'

export default function Select({
  id,
  name,
  options,
  value,
  onChange,
  label,
  autoFocus = false,
  required = true,
  customRef,
}: {
  id: string
  name: string
  options: {
    value: string
    label: string
  }[]
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  label?: string
  autoFocus?: boolean
  required?: boolean
  customRef?: RefObject<HTMLSelectElement>
}) {
  return (
    <select
      ref={customRef}
      name={name}
      id={id}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      className={`
        px-4 py-2 rounded-2xl bg-transparent text-xl cursor-pointer outline-none -outline-offset-2 hover:outline-2 hover:outline-blue-400/10 focus:outline-2 focus:outline-blue-400/40
        ${value === 'label' ? 'text-slate-500' : ''}
      `}
      required={required}
    >
      {label && (
        <option value="label" disabled>
          {label}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
