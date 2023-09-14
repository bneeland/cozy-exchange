import ContentBox from '@/components/contentBox'
import Button from '@/components/ui/button'

export default function Home() {
  return (
    <ContentBox header="Intro">
      <h1>Draw random names for a gift exchange.</h1>
      <h2>
        Send secret emails so everyone knows who they&apos;re assigned to.
      </h2>
      <h2>Saves data automatically to your browser.</h2>
      <Button label="Start" type="link" href="/settings" full />
    </ContentBox>
  )
}
