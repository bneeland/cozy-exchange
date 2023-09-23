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
import { usePathname } from 'next/navigation'

export default function Navigation({
  format = 'desktop',
}: {
  format?: 'desktop' | 'mobile'
}) {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggle() {
    setIsOpen((currentValue) => !currentValue)
  }

  function isSelected(href: string) {
    return pathname === href
  }

  const Items = () => (
    <div className="flex flex-col gap-4">
      <Button
        icon={<Cog6ToothIcon className="w-5 h-5" />}
        label="Settings"
        type="link"
        href="/settings"
        onClick={toggle}
        selected={isSelected('/settings')}
        focus={false}
      />
      <Button
        icon={<UserGroupIcon className="w-5 h-5" />}
        label="People"
        type="link"
        href="/people"
        onClick={toggle}
        selected={isSelected('/people')}
        focus={false}
      />
      <Button
        icon={<CheckCircleIcon className="w-5 h-5" />}
        label="Rules"
        type="link"
        href="/rules"
        onClick={toggle}
        selected={isSelected('/rules')}
        focus={false}
      />
      <Button
        icon={<BoltIcon className="w-5 h-5" />}
        label="Finalize"
        type="link"
        href="/finalize"
        onClick={toggle}
        selected={isSelected('/finalize')}
        focus={false}
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
            <div className="absolute inset-x-0 top-0 h-screen flex z-50">
              <div className="flex flex-1 overflow-y-auto bg-white/20 backdrop-blur">
                <div className="flex flex-1 overflow-hidden rounded-r-2xl border-r-4 border-slate-300">
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
                <div className="w-40 -ml-20" onClick={toggle} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
