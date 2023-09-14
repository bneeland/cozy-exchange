import Link from 'next/link'
import { ReactNode } from 'react'

export default function Button({
  icon,
  label,
  onClick,
  color = 'dark',
  size = 'md',
  type = 'button',
  href = '/',
  full = false,
  isSelected = false,
}: {
  icon?: ReactNode
  label?: string
  onClick?: any
  color?: 'dark' | 'light'
  size?: 'sm' | 'md'
  type?: 'button' | 'link' | 'submit'
  href?: string
  full?: boolean
  isSelected?: boolean
}) {
  const classNames = `
    active:border-b-0 active:border-t-4 border-slate-300 hover:border-slate-400 flex items-center gap-3 outline-none
    ${color === 'dark' ? 'bg-slate-200 hover:bg-slate-300' : ''}
    ${color === 'light' ? 'bg-white hover:bg-slate-300' : ''}
    ${(icon && !label) || (label && !icon) ? 'flex justify-center' : ''}
    ${
      isSelected
        ? 'border-b-0 border-t-4 bg-slate-300 border-slate-400'
        : 'border-b-4'
    }
    ${
      (size === 'sm' && 'px-2 py-1 rounded-xl') ||
      (size === 'md' && 'px-4 py-2 rounded-2xl')
    }
    ${full ? 'w-full' : ''}
  `

  function ContentBox() {
    return (
      <>
        {icon && <div className="text-slate-400">{icon}</div>}
        {label && <div className="text-slate-800">{label}</div>}
      </>
    )
  }

  if (type === 'button' || type === 'submit')
    return (
      <div className={full ? 'w-full' : 'inline-block'}>
        <button type={type} className={classNames} onClick={onClick}>
          <ContentBox />
        </button>
      </div>
    )

  if (type === 'link')
    return (
      <div className={full ? 'w-full' : 'inline-block'}>
        <Link className={classNames} onClick={onClick} href={href}>
          <ContentBox />
        </Link>
      </div>
    )

  return <></>
}
