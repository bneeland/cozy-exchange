import ContentBox from '@/components/contentBox'
import Fieldset from '@/components/fieldset'
import SettingsForm from '@/components/forms/settings'
import TextInput from '@/components/ui/textInput'

export default function Settings() {
  return (
    <ContentBox header="Settings">
      <SettingsForm />
    </ContentBox>
  )
}
