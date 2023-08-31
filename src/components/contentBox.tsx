import { ReactNode } from 'react'

export default function ContentBoxBox({
  children,
  header,
}: {
  children: ReactNode
  header: string
}) {
  return (
    <div className="bg-white shadow-md rounded-xl max-w-xl mx-auto">
      <div className="px-6 py-4 font-semibold border-b">{header}</div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  )
}
