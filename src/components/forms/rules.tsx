'use client'

import { DataContext } from '@/contexts/data'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import Fieldset from '../fieldset'
import TextInput from '../ui/textInput'
import Button from '../ui/button'
import { Data, Person, Vector } from '@/types'
import { v4 as uuid } from 'uuid'
import { save } from '@/helpers'
import { TrashIcon } from '@heroicons/react/20/solid'
import StickyBox from '../stickyBox'
import Radio from '../ui/radio'
import Select from '../ui/select'

const initialNewRule = () =>
  ({
    id: uuid(),
    from: undefined,
    to: undefined,
  }) as {
    id: string
    from: string | undefined
    to: string | undefined
  }

export default function RulesForm() {
  const { data, setData } = useContext(DataContext)

  useEffect(() => {
    const savedDataString = localStorage.getItem('data')
    const savedData = savedDataString && JSON.parse(savedDataString)
    if (savedData) {
      setData(savedData)
    }
  }, [setData])

  const [newRule, setNewRule] = useState(initialNewRule)
  const [newType, setNewType] = useState<string | undefined>(undefined)

  // function handleSaveNewRule(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault()
  //   const newData: Data = { ...data, rules: [...data.rules, newRules] }
  //   setData(newData)
  //   save(newData)
  //   setNewPerson(initialNewPerson)
  //   ;(document.querySelector('#newPersonName') as HTMLElement)?.focus()
  // }

  // function handleDeletePerson(person: Person) {
  //   if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
  //     const newData: Data = {
  //       ...data,
  //       people: data.people.filter((_person) => _person.id !== person.id),
  //     }
  //     setData(newData)
  //     save(newData)
  //   }
  // }

  // function getPersonFromData(id: string) {
  //   return data.people.find((person) => person.id === id)
  // }

  // function handlePersonChange({
  //   e,
  //   person,
  //   field,
  // }: {
  //   e: ChangeEvent<HTMLInputElement>
  //   person: Person
  //   field: string
  // }) {
  //   setData({
  //     ...data,
  //     people: [
  //       ...data.people.map((_person) =>
  //         _person.id === person.id
  //           ? { ..._person, [field]: e.target.value }
  //           : _person,
  //       ),
  //     ],
  //   })
  // }

  console.log('newRule')
  console.log(newRule)

  return (
    <div className="space-y-6">
      <div className="divide-y md:divide-y-0 -my-4 md:-my-2">
        {/* {data.people.map((person: Person) => (
          <div key={person.id} className="flex items-start gap-2 py-4 md:py-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
              <TextInput
                id={`${person.id}_name`}
                placeholder="Edit name…"
                value={getPersonFromData(person.id)?.name || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePersonChange({ e, person, field: 'name' })
                }
                autoSave
              />
              <TextInput
                id={`${person.id}_email`}
                placeholder="Edit email…"
                value={getPersonFromData(person.id)?.email || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePersonChange({ e, person, field: 'email' })
                }
                autoSave
              />
            </div>
            <Button
              icon={<TrashIcon className="w-4 h-4" />}
              size="sm"
              onClick={() => handleDeletePerson(person)}
            />
          </div>
        ))} */}
      </div>
      <StickyBox>
        {/* <form onSubmit={handleSaveNewRule}> */}
        <form>
          <Fieldset legend="Add a rule">
            <div className="flex gap-4">
              <Select
                id="from"
                name="from"
                options={data.people
                  .filter((person) => person.id !== newRule.to)
                  .map((person) => ({ value: person.id, label: person.name }))}
                value={newRule.from}
                onChange={(e) =>
                  setNewRule((_newRule) => ({
                    ..._newRule,
                    from: e.target.value,
                  }))
                }
              />
              <div>
                <Radio
                  name="ruleType"
                  value="inclusion"
                  id="inclusion"
                  label="must give to"
                  checked={newType === 'inclusion'}
                  onChange={(e) => setNewType(e.target.value)}
                  hideButton
                  showCheckmark
                />
                <Radio
                  name="ruleType"
                  value="exclusion"
                  id="exclusion"
                  label="must not give to"
                  checked={newType === 'exclusion'}
                  onChange={(e) => setNewType(e.target.value)}
                  hideButton
                  showCheckmark
                />
              </div>
              <Select
                id="to"
                name="to"
                options={data.people
                  .filter((person) => person.id !== newRule.from)
                  .map((person) => ({ value: person.id, label: person.name }))}
                value={newRule.to}
                onChange={(e) =>
                  setNewRule((_newRule) => ({
                    ..._newRule,
                    to: e.target.value,
                  }))
                }
              />
            </div>
            <Button type="submit" label="Save" full />
          </Fieldset>
        </form>
      </StickyBox>
    </div>
  )
}
