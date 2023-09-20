import {
  CheckBadgeIcon,
  CheckCircleIcon,
  CheckIcon,
} from '@heroicons/react/20/solid'
import { ChangeEventHandler } from 'react'

export default function Radio({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  hideButton,
  showCheckmark,
}: {
  id: string
  name: string
  value: string
  label: string
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  hideButton: boolean
  showCheckmark: boolean
}) {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`${hideButton ? 'hidden' : 'cursor-pointer'}`}
      />
      {showCheckmark && checked ? (
        <CheckCircleIcon className="w-5 h-5 text-blue-500" />
      ) : (
        <div className="w-5 h-5" />
      )}
      <label
        htmlFor={id}
        className={`cursor-pointer ${
          hideButton && !showCheckmark ? '' : 'pl-1.5'
        } ${checked ? 'text-blue-500' : ''}`}
      >
        {label}
      </label>
    </div>
  )
}
