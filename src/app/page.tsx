import ContentBox from '@/components/contentBox'
import Button from '@/components/ui/button'
import { DocumentCheckIcon, KeyIcon } from '@heroicons/react/20/solid'

export default function Home() {
  return (
    <ContentBox header="Gift Exchange App">
      <div className="text-center space-y-4 max-w-md mx-auto">
        <h1 className="text-3xl font-bold">
          Draw random names for a gift exchange
        </h1>
        <h2>
          <KeyIcon className="w-5 h-5 text-slate-400 inline" /> Sends secret
          emails so everyone knows who they&apos;re assigned to
        </h2>
        <h2>
          <DocumentCheckIcon className="w-5 h-5 text-slate-400 inline" /> Saves
          data automatically so you can close the page and come back later
        </h2>
        <Button label="Start" type="link" href="/settings" full />
      </div>
    </ContentBox>
  )
}
