import { ChangeEventHandler } from 'react'

export default function Select({
  id,
  name,
  options,
  value,
  onChange,
  label,
  required = true,
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
  required?: boolean
}) {
  return (
    <select
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={`
        px-4 py-2 rounded-2xl bg-transparent text-xl cursor-pointer outline-none outline-offset-0 focus:outline-4 focus:outline-blue-400/40
        ${value === 'label' ? 'text-slate-500' : ''}
      `}
      defaultValue="label"
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
