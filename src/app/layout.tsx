import './globals.css'
import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'
import Logo from '@/components/logo'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import { DataProvider } from '@/contexts/data'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import ImportData from '@/hooks/ImportData'
import MobileNavigation from '@/components/mobileNavigation'

const exo2 = Exo_2({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'cozy.exchange',
  description: 'Simple yet powerful group gift exchange tool',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <DataProvider>
      <html lang="en">
        <body
          className={`${exo2.className} h-screen w-screen flex flex-col gap-4 p-4 text-sm text-slate-950`}
        >
          <div className="flex gap-4">
            <div className="flex-1 flex justify-start items-center">
              <div className="block sm:hidden">
                <MobileNavigation />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link href="/" className="border-none">
                <Logo />
              </Link>
            </div>
            <div className="flex-1" />
          </div>
          <div className="flex-1 flex overflow-y-auto gap-4">
            <div className="hidden sm:block">
              <Navigation />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden rounded-2xl bg-slate-200 border border-t-4 border-slate-300 bg-[url('/backgrounds/bg1.jpg')] bg-cover bg-center">
              <div className="overflow-y-auto p-6">{children}</div>
            </div>
          </div>
          <div className="flex justify-center">cozy.exchange</div>
          <Toaster position="bottom-right" />
          <ImportData />
        </body>
      </html>
    </DataProvider>
  )
}
