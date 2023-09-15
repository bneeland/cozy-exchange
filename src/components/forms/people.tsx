'use client'

import { DataContext } from '@/contexts/data'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import Fieldset from '../fieldset'
import TextInput from '../ui/textInput'
import Button from '../ui/button'
import { Data, Person } from '@/types'
import { v4 as uuid } from 'uuid'
import { save } from '@/helpers'
import { TrashIcon } from '@heroicons/react/20/solid'
import StickyBox from '../stickyBox'

const initialNewPerson = () => ({
  id: uuid(),
  name: '',
  email: '',
})

export default function PeopleForm() {
  const { data, setData } = useContext(DataContext)

  useEffect(() => {
    const savedDataString = localStorage.getItem('data')
    const savedData = savedDataString && JSON.parse(savedDataString)
    if (savedData) {
      setData(savedData)
    }
  }, [setData])

  const [newPerson, setNewPerson] = useState(initialNewPerson)

  function handleSaveNewPerson(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newData: Data = { ...data, people: [...data.people, newPerson] }
    setData(newData)
    save(newData)
    setNewPerson(initialNewPerson)
    ;(document.querySelector('#newPersonName') as HTMLElement)?.focus()
  }

  function handleDeletePerson(person: Person) {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      const newData: Data = {
        ...data,
        people: data.people.filter((_person) => _person.id !== person.id),
      }
      setData(newData)
      save(newData)
    }
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
      <div className="divide-y md:divide-y-0 -my-4 md:-my-2">
        {data.people.map((person: Person) => (
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
        ))}
      </div>
      <StickyBox>
        <form onSubmit={handleSaveNewPerson}>
          <Fieldset legend="Add a person">
            <TextInput
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
            <Button type="submit" label="Save" full />
          </Fieldset>
        </form>
      </StickyBox>
    </div>
  )
}
