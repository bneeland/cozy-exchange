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

const initialNewPerson: Person = {
  id: uuid(),
  name: '',
  email: '',
}

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

  return (
    <>
      {data.people.map((person: Person) => (
        <div key={person.id} className="flex justify-between items-center">
          <div>{person.name}</div>
          <div>{person.email}</div>
          <Button
            icon={<TrashIcon className="w-4 h-4" />}
            size="sm"
            onClick={() => handleDeletePerson(person)}
          />
        </div>
      ))}
      <div className="sticky bottom-0 pt-6 border-t bg-white/80 backdrop-blur -mx-6 px-6">
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
            />
            <TextInput
              id="newPersonEmail"
              label="Email"
              placeholder="john.doe@example.com"
              value={newPerson.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPerson({ ...newPerson, email: e.target.value })
              }
            />
            <Button type="submit" label="Save" />
          </Fieldset>
        </form>
      </div>
    </>
  )
}
