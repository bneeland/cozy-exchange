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
  disabled = false,
  selected = false,
}: {
  icon?: ReactNode
  label?: string
  onClick?: any
  color?: 'default' | 'lit'
  size?: 'sm' | 'md'
  type?: 'button' | 'link' | 'submit'
  href?: string
  full?: boolean
  disabled?: boolean
  selected?: boolean
}) {
  const classNames = `
    active:border-b-0 active:border-t-4 disabled:active:border-b-4 disabled:active:border-t-0 flex items-center gap-3 outline-none
    ${
      color === 'default'
        ? 'bg-slate-200 hover:bg-slate-300 disabled:bg-slate-200 disabled:hover:bg-slate-200 border-slate-300 hover:border-slate-400 disabled:border-slate-200 disabled:hover:border-slate-200'
        : ''
    }
    ${
      color === 'lit'
        ? 'bg-slate-200 hover:bg-slate-300 disabled:bg-slate-200 disabled:hover:bg-slate-200 border-slate-300 hover:border-slate-400 disabled:border-slate-200 disabled:hover:border-slate-200'
        : ''
    }
    ${(icon && !label) || (label && !icon) ? 'flex justify-center' : ''}
    ${
      selected
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
            ${
              color === 'default'
                ? disabled
                  ? 'text-slate-300'
                  : 'text-slate-500'
                : ''
            }
            ${
              color === 'lit'
                ? disabled
                  ? 'text-slate-300'
                  : 'text-slate-500'
                : ''
            }
          `}
          >
            {icon}
          </div>
        )}
        {label && (
          <div
            className={`
          ${
            color === 'default'
              ? disabled
                ? 'text-slate-400'
                : 'text-slate-950'
              : ''
          }
          ${
            color === 'lit'
              ? disabled
                ? 'text-slate-400'
                : 'text-slate-950'
              : ''
          }
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
        <button
          type={type}
          className={classNames}
          onClick={onClick}
          disabled={disabled}
        >
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
