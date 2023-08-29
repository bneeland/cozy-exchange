import './globals.css'
import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'
import Logo from '@/components/logo'
import Link from 'next/link'
import Button from '@/components/ui/button'
import { BoltIcon, InformationCircleIcon, ListBulletIcon, UserGroupIcon } from '@heroicons/react/20/solid'

const exo2 = Exo_2({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'cozy.exchange',
  description: 'Simple yet powerful group gift exchange tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${exo2.className} h-screen w-screen flex flex-col gap-4 p-4 text-sm`}
      >
        <div className="flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 flex overflow-y-auto gap-4">
          <div className="w-40 flex flex-col gap-4">
            <Button
              icon={<InformationCircleIcon className="w-5 h-5" />}
              label="Settings"
              type="link"
              href="/settings"
            />
            <Button
              icon={<UserGroupIcon className="w-5 h-5" />}
              label="Participants"
              type="link"
              href="/participants"
            />
            <Button
              icon={<ListBulletIcon className="w-5 h-5" />}
              label="Rules"
              type="link"
              href="/rules"
            />
            <Button
              icon={<BoltIcon className="w-5 h-5" />}
              label="Finalize"
              type="link"
              href="/finalize"
            />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden rounded-2xl bg-slate-200 border border-t-4 border-slate-300">
            <div className="overflow-y-auto px-4 py-12">{children}</div>
          </div>
        </div>
        <div className="flex justify-center">cozy.exchange</div>
      </body>
    </html>
  )
}
