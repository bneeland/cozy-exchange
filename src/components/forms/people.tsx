'use client'

import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import Fieldset from '../fieldset'
import TextInput from '../ui/textInput'
import Button from '../ui/button'
import { Data, Person } from '@/types'
import { save } from '@/helpers'
import { TrashIcon } from '@heroicons/react/16/solid'
import StickyBox from '../stickyBox'
import useData from '@/hooks/useData'
import PlaceholderMessage from '../placeholderMessage'

const initialNewPerson = () => ({
  id: crypto.randomUUID(),
  name: '',
  email: '',
})

export default function PeopleForm() {
  const nameInputRef = useRef<HTMLInputElement>(null)

  const { data, setData } = useData()

  const [newPerson, setNewPerson] = useState(initialNewPerson)

  function handleSaveNewPerson(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newData: Data = { ...data, people: [...data.people, newPerson] }
    setData(newData)
    save(newData)
    setNewPerson(initialNewPerson)
    nameInputRef.current?.focus()
  }

  function handleDeletePerson(person: Person) {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      const newData: Data = {
        ...data,
        people: data.people.filter((_person) => _person.id !== person.id),
        rules: {
          inclusions: data.rules.inclusions.filter(
            (inclusion) =>
              ![inclusion.from.id, inclusion.to.id].includes(person.id),
          ),
          exclusions: data.rules.exclusions.filter(
            (exclusion) =>
              ![exclusion.from.id, exclusion.to.id].includes(person.id),
          ),
        },
      }
      setData(newData)
      save(newData)
    }
    nameInputRef.current?.focus()
  }

  function getPersonFromData(id: string) {
    return data.people.find((person) => person.id === id)
  }

  function handlePersonChange({
    e,
    person,
    field,
  }: {
    e: ChangeEvent<HTMLInputElement>
    person: Person
    field: string
  }) {
    setData({
      ...data,
      people: [
        ...data.people.map((_person) =>
          _person.id === person.id
            ? { ..._person, [field]: e.target.value }
            : _person,
        ),
      ],
    })
  }

  return (
    <div className="space-y-6">
      <div className="divide-y -my-4 md:-my-2">
        {data.people.length ? (
          data.people.map((person: Person) => (
            <div
              key={person.id}
              className="flex items-center gap-2 py-4 md:py-2"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 w-full text-xl">
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
                  type="email"
                />
              </div>
              <Button
                icon={<TrashIcon className="w-4 h-4" />}
                size="sm"
                onClick={() => handleDeletePerson(person)}
              />
            </div>
          ))
        ) : (
          <PlaceholderMessage>
            No people yet. Add some, below.
          </PlaceholderMessage>
        )}
      </div>
      <StickyBox>
        <form onSubmit={handleSaveNewPerson}>
          <Fieldset legend="Add a person">
            <TextInput
              customRef={nameInputRef}
              id="newPersonName"
              label="Name"
              placeholder="John Doe"
              value={newPerson.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPerson({ ...newPerson, name: e.target.value })
              }
              autoFocus
              required
            />
            <TextInput
              id="newPersonEmail"
              label="Email"
              type="email"
              placeholder="john.doe@example.com"
              value={newPerson.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPerson({ ...newPerson, email: e.target.value })
              }
              required
            />
            <Button
              type="submit"
              label="Save"
              full
              disabled={!newPerson.name || !newPerson.email}
            />
          </Fieldset>
        </form>
      </StickyBox>
    </div>
  )
}
