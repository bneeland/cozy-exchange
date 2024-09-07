'use client'

import Button from '@/components/ui/button'
import {
  ArrowDownOnSquareStackIcon,
  BoltIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  LinkIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import useData from '@/hooks/useData'

export default function Navigation({ onSelect }: { onSelect?: () => void }) {
  const { data } = useData()

  const pathname = usePathname()
  const router = useRouter()

  const [selectedPathname, setSelectedPathname] = useState<string | null>(null)

  function isSelected(href: string) {
    return selectedPathname === href || pathname === href
  }

  useEffect(() => {
    setSelectedPathname(null)
  }, [pathname])

  const Items = () => (
    <div className="h-full flex flex-col justify-between gap-4">
      <div className="space-y-4">
        <Button
          icon={<Cog6ToothIcon className="w-5 h-5" />}
          label="Settings"
          onClick={() => {
            setSelectedPathname('/settings')
            router.push('/settings')
            onSelect && onSelect()
          }}
          selected={isSelected('/settings')}
          full
        />
        <Button
          icon={<UserGroupIcon className="w-5 h-5" />}
          label="People"
          badge={data.people.length || null}
          onClick={async () => {
            setSelectedPathname('/people')
            router.push('/people')
            onSelect && onSelect()
          }}
          selected={isSelected('/people')}
          full
        />
        <Button
          icon={<CheckCircleIcon className="w-5 h-5" />}
          label="Rules"
          badge={
            data.rules.exclusions.length + data.rules.inclusions.length || null
          }
          onClick={() => {
            setSelectedPathname('/rules')
            router.push('/rules')
            onSelect && onSelect()
          }}
          selected={isSelected('/rules')}
          full
        />
        <Button
          icon={<BoltIcon className="w-5 h-5" />}
          label="Finalize"
          onClick={() => {
            setSelectedPathname('/finalize')
            router.push('/finalize')
            onSelect && onSelect()
          }}
          selected={isSelected('/finalize')}
          full
        />
      </div>
      <Button
        icon={<ArrowDownOnSquareStackIcon className="w-5 h-5" />}
        label="Save Data"
        onClick={() => {
          setSelectedPathname('/save')
          router.push('/save')
          onSelect && onSelect()
        }}
        selected={isSelected('/save')}
        full
      />
    </div>
  )

  return (
    <div className="w-40 overflow-y-auto h-full">
      <Items />
    </div>
  )
}
