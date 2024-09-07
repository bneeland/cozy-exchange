import { ReactNode } from 'react'

export default function PlaceholderMessage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <label className="text-center text-xl text-slate-400">{children}</label>
  )
}
