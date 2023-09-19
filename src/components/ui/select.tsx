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
    value: string
    label: string
  }[]
  value: string
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
        ${value === 'label' ? 'text-slate-500' : ''}
      `}
      defaultValue="label"
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
