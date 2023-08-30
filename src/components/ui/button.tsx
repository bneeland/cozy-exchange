import Link from 'next/link'
import { ReactNode } from 'react'

export default function Button({
  icon,
  label,
  onClick,
  color = 'dark',
  type = 'button',
  href = '/',
}: {
  icon: ReactNode
  label?: string
  onClick?: any
  color?: 'dark' | 'light'
  type?: 'button' | 'link'
  href?: string
}) {
  const classNames = `
    px-4 py-2 rounded-2xl border-b-4 active:border-b-0 active:border-t-4 border-slate-300 hover:border-slate-400 flex items-center gap-3 transition-colors
    ${color === 'dark' && 'bg-slate-200 hover:bg-slate-300'}
    ${color === 'light' && 'bg-white hover:bg-slate-300'}
  `

  if (type === 'button') return (
    <button
      className={classNames}
      onClick={onClick}
    >
      <div className="text-slate-400">{icon}</div>
      {label && <div className="text-slate-800">{label}</div>}
    </button>
  )
  
  if (type === 'link') return (
    <Link
      className={classNames}
      onClick={onClick}
      href={href}
    >
      <div className="text-slate-400">{icon}</div>
      {label && <div className="text-slate-800">{label}</div>}
    </Link>
  )

  return <></>
}
