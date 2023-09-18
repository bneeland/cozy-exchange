import { ReactNode } from 'react'

export default function Fieldset({
  children,
  legend,
}: {
  children: ReactNode
  legend: string
}) {
  return (
    /*
      `min-w-[inherit]` is required on `fieldset` in order for `overflow-x-auto` to work
    */
    <fieldset className="p-6 rounded-xl border border-slate-200 space-y-4 min-w-[inherit] overflow-x-auto">
      <legend className="px-2 -ml-2 -mb-4 text-slate-400 cursor-default">
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}
