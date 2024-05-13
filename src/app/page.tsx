import ContentBox from '@/components/contentBox'
import Button from '@/components/ui/button'

export default function Home() {
  return (
    <ContentBox header="Gift Exchange App">
      <div className="space-y-4 max-w-sm mx-auto text-center">
        <h1 className="text-3xl font-bold">
          Draw random names for a gift exchange
        </h1>
        <div className="space-y-4 max-w-xs mx-auto text-left">
          <h2>
            Send secret emails so everyone knows who they&apos;re assigned to.
          </h2>
          <h2>
            Save your data in a special link so you can pick up where you left
            off.
          </h2>
        </div>
        <Button label="Start" type="link" href="/settings" full />
      </div>
    </ContentBox>
  )
}
