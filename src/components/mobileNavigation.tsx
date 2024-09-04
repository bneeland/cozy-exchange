'use client'

import { Bars3Icon } from '@heroicons/react/20/solid'
import Button from './ui/button'
import { useState } from 'react'
import Dialog from './ui/dialog'
import Navigation from './navigation'
import { XMarkIcon } from '@heroicons/react/16/solid'

export default function MobileNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <Button
        label={<Bars3Icon className="w-5 h-5" />}
        onClick={() => setIsMobileMenuOpen(true)}
      />
      <Dialog
        header={
          <div className="flex justify-between items-center">
            <div>Menu</div>
            <Button
              icon={<XMarkIcon className="w-4 h-4" />}
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        }
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        fullPage
      >
        <Navigation onSelect={() => setIsMobileMenuOpen(false)} />
      </Dialog>
    </>
  )
}
