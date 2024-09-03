import { ReactNode } from 'react'

export default function PlaceholderMessage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <label className="text-center text-lg text-slate-300">{children}</label>
  )
}
