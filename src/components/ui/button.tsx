import Link from 'next/link'
import { ReactNode } from 'react'

export default function Button({
  icon,
  label,
  onClick,
  color = 'default',
  size = 'md',
  type = 'button',
  href = '/',
  full = false,
  isSelected = false,
}: {
  icon?: ReactNode
  label?: string
  onClick?: any
  color?: 'default' | 'lit'
  size?: 'sm' | 'md'
  type?: 'button' | 'link' | 'submit'
  href?: string
  full?: boolean
  isSelected?: boolean
}) {
  const classNames = `
    active:border-b-0 active:border-t-4 flex items-center gap-3 outline-none
    ${
      color === 'default'
        ? 'bg-slate-200 hover:bg-slate-300 border-slate-300 hover:border-slate-400'
        : ''
    }
    ${
      color === 'lit'
        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-gradient-to-r border-slate-300 hover:border-slate-400'
        : ''
    }
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
        {icon && (
          <div
            className={`
            ${color === 'default' ? 'text-slate-500' : ''}
            ${color === 'lit' ? 'text-white' : ''}
          `}
          >
            {icon}
          </div>
        )}
        {label && (
          <div
            className={`
          ${color === 'default' ? 'text-slate-950' : ''}
          ${color === 'lit' ? 'text-white' : ''}
        `}
          >
            {label}
          </div>
        )}
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
