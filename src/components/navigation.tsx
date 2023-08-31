'use client'

import Button from '@/components/ui/button'
import {
  Bars3Icon,
  BoltIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function Navigation({
  format = 'desktop',
}: {
  format?: 'desktop' | 'mobile'
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggle() {
    console.log('toggle triggered')
    setIsOpen((currentValue) => !currentValue)
  }

  const Items = () => (
    <div className="flex flex-col gap-4">
      <Button
        icon={<Cog6ToothIcon className="w-5 h-5" />}
        label="Settings"
        type="link"
        href="/settings"
        onClick={toggle}
      />
      <Button
        icon={<UserGroupIcon className="w-5 h-5" />}
        label="Participants"
        type="link"
        href="/participants"
        onClick={toggle}
      />
      <Button
        icon={<CheckCircleIcon className="w-5 h-5" />}
        label="Rules"
        type="link"
        href="/rules"
        onClick={toggle}
      />
      <Button
        icon={<BoltIcon className="w-5 h-5" />}
        label="Finalize"
        type="link"
        href="/finalize"
        onClick={toggle}
      />
    </div>
  )

  return (
    <>
      <div
        className={`${
          format === 'desktop' ? 'hidden sm:block' : 'hidden'
        } w-40 overflow-y-auto`}
      >
        <Items />
      </div>
      <div className={`${format === 'mobile' ? 'block sm:hidden' : 'hidden'}`}>
        <Button
          icon={<Bars3Icon className="w-5 h-5" />}
          type="button"
          onClick={toggle}
        />
        {isOpen && (
          <>
            <div className="absolute inset-x-0 top-0 h-screen flex">
              <div className="flex flex-1 gap-4 overflow-y-auto bg-slate-900/10 backdrop-blur-sm">
                <div className="flex flex-1 flex-col overflow-hidden rounded-r-2xl border-r-4 border-slate-300 mr-10">
                  <div className="flex-1 overflow-y-auto bg-white p-4 space-y-4">
                    <Button
                      icon={<XMarkIcon className="w-5 h-5" />}
                      type="button"
                      onClick={toggle}
                    />
                    <hr />
                    <Items />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
