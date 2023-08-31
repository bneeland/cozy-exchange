import { ReactNode } from 'react'

export default function Fieldset({
  children,
  legend,
}: {
  children: ReactNode
  legend: string
}) {
  return (
    <fieldset className="p-6 rounded-xl border border-slate-200 space-y-4">
      <legend className="px-2 -ml-2 -mb-4 text-slate-400 cursor-default">
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}
