import ContentBox from '@/components/contentBox'
import Fieldset from '@/components/fieldset'
import TextInput from '@/components/ui/textInput'

export default function Settings() {
  return (
    <ContentBox header="Settings">
      <Fieldset legend="Group contact">
        <TextInput
          id="contactName"
          label="Contact name"
          placeholder="John Doe"
          autoFocus
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
