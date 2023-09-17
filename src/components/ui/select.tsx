import { ChangeEventHandler } from 'react'

export default function Select({
  id,
  name,
  options,
  value,
  onChange,
}: {
  id: string
  name: string
  options: {
    value: string | undefined
    label: string
  }[]
  value: string | undefined
  onChange: ChangeEventHandler<HTMLSelectElement>
}) {
  return (
    <select
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className="bg-transparent"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
