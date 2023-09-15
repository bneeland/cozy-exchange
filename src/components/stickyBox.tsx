import { ReactNode } from 'react';

export default function StickyBox({ children }: {children: ReactNode}) {
  return (
    <div className="sticky -bottom-6 pt-6 border-t bg-white/80 backdrop-blur -mx-6 px-6">
      {children}
    </div>
  )
}
