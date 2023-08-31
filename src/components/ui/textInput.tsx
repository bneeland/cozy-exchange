'use client'

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
        autoComplete="off"
        onFocus={(e) => e.target.select()}
      />
    </div>
  )
}
