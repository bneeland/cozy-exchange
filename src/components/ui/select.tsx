import { ChangeEventHandler } from 'react'

export default function Select({
  id,
  name,
  options,
  value,
  onChange,
  label,
}: {
  id: string
  name: string
  options: {
    value: string | undefined
    label: string
  }[]
  value: string | undefined
  onChange: ChangeEventHandler<HTMLSelectElement>
  label?: string
}) {
  return (
    <select
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={`
        outline-none bg-transparent text-xl cursor-pointer
        ${!value ? 'text-slate-500' : ''}
      `}
    >
      {label && (
        <option key={label} value="undefined" disabled={true} selected={true}>
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
