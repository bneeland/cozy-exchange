import ContentBox from '@/components/contentBox'
import Button from '@/components/ui/button'

export default function Home() {
  return (
    <ContentBox header="Intro">
      <p className="text-lg">Draw random names for a gift exchange.</p>
      <p className="text-base">Send secret emails so everyone knows who they&apos;re assigned to.</p>
      <p className="text-base">Saves data automatically to your browser.</p>
      <Button label="Start" type="link" href="/settings" full />
    </ContentBox>
  )
}
