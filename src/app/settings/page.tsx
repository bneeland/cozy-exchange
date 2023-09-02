import ContentBox from '@/components/contentBox'
import Fieldset from '@/components/fieldset'
import TextInput from '@/components/ui/textInput'

export default function Settings() {
  return (
    <ContentBox header="Settings">
      <Fieldset legend="Exchange name">
        <TextInput
          id="exchangeName"
          label="Exchange name"
          placeholder="Christmas gift exchange"
          autoFocus
        />
      </Fieldset>
      <Fieldset legend="Group contact">
        <TextInput
          id="contactName"
          label="Contact name"
          placeholder="John Doe"
        />
        <TextInput
          id="contactEmail"
          label="Contact email"
          placeholder="john.doe@example.com"
          type="email"
        />
      </Fieldset>
    </ContentBox>
  )
}
