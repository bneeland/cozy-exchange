'use client'

import Button from '@/components/ui/button'
import {
  BoltIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  LinkIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedPathname, setSelectedPathname] = useState<string | null>(null)

  function toggle() {
    setIsOpen((currentValue) => !currentValue)
  }

  function isSelected(href: string) {
    return selectedPathname === href || pathname === href
  }

  useEffect(() => {
    setSelectedPathname(null)
  }, [pathname])

  const Items = () => (
    <div className="space-y-4">
      <Button
        icon={<Cog6ToothIcon className="w-5 h-5" />}
        label="Settings"
        onClick={() => {
          setSelectedPathname('/settings')
          router.push('/settings')
          toggle()
        }}
        selected={isSelected('/settings')}
        focus={false}
        full
      />
      <Button
        icon={<UserGroupIcon className="w-5 h-5" />}
        label="People"
        onClick={async () => {
          setSelectedPathname('/people')
          router.push('/people')
          toggle()
        }}
        selected={isSelected('/people')}
        focus={false}
        full
      />
      <Button
        icon={<CheckCircleIcon className="w-5 h-5" />}
        label="Rules"
        onClick={() => {
          setSelectedPathname('/rules')
          router.push('/rules')
          toggle()
        }}
        selected={isSelected('/rules')}
        focus={false}
        full
      />
      <Button
        icon={<BoltIcon className="w-5 h-5" />}
        label="Finalize"
        onClick={() => {
          setSelectedPathname('/finalize')
          router.push('/finalize')
          toggle()
        }}
        selected={isSelected('/finalize')}
        focus={false}
        full
      />
      <Button
        icon={<LinkIcon className="w-5 h-5" />}
        label="Save"
        onClick={() => {
          setSelectedPathname('/save')
          router.push('/save')
          toggle()
        }}
        selected={isSelected('/save')}
        focus={false}
        full
      />
    </div>
  )

  return (
    <div className="w-40 overflow-y-auto">
      <Items />
    </div>
  )
}
