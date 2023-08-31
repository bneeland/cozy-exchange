import ContentBox from '@/components/contentBox'
import Button from '@/components/ui/button'

export default function Home() {
  return (
    <ContentBox header="Intro">
      <p>Draw random names for a gift exchange.</p>
      <p>Send secret emails so everyone knows who they&apos;re assigned to.</p>
      <Button label="Start" type="link" href="/settings" full />
    </ContentBox>
  )
}
