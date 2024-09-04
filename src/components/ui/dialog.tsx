import { ReactNode } from 'react'
import ContentBox from '@/components/contentBox'

export default function Dialog({
  children,
  header = '',
  open = false,
  onClose,
  fullPage = false,
}: {
  children?: ReactNode
  header?: ReactNode
  open?: boolean
  onClose?: () => void
  fullPage?: boolean
}) {
  switch (open) {
    case true:
      switch (fullPage) {
        case true:
          return (
            <div className="z-50 absolute inset-0 mt-0 bg-white/80 backdrop-blur flex justify-center items-center">
              <div className="space-y-4">
                <div>{header}</div>
                {children}
              </div>
            </div>
          )
        case false:
          return (
            <div
              className="z-50 absolute inset-0 mt-0 bg-slate-900/30 backdrop-blur flex justify-center items-center"
              onClick={() => onClose && onClose()}
            >
              <ContentBox header={header}>{children}</ContentBox>
            </div>
          )
      }
    case false:
      return <></>
  }
}
