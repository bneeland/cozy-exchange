import './globals.css'
import type { Metadata } from 'next'
import { Exo_2 } from 'next/font/google'

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
      <body className={exo2.className}>{children}</body>
    </html>
  )
}
