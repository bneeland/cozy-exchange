'use client'

import { ReactNode, useRef } from 'react'
import Button from './button'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function ModalDialog({
  children,
  header,
  label,
}: {
  children?: ReactNode
  header?: string
  label?: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  return (
    <>
      <Button
        label={label}
        onClick={() => ref.current?.showModal()}
        focus={false}
      />
      <dialog
        ref={ref}
        className="bg-white shadow-lg rounded-xl max-w-2xl mx-auto"
      >
        <div className="px-6 py-4 font-semibold border-b flex items-center justify-between">
          {header}
          <Button
            icon={<XMarkIcon className="w-4 h-4" />}
            focus={false}
            size="sm"
            onClick={() => ref.current?.close()}
          />
        </div>
        <div className="p-6 space-y-4">{children}</div>
      </dialog>
    </>
  )
}
