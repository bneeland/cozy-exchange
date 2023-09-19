'use client'

import { FormEvent, useState } from 'react'
import Fieldset from '../fieldset'
import Button from '../ui/button'
import { Data, Rules, Vector } from '@/types'
import { v4 as uuid } from 'uuid'
import { save } from '@/helpers'
import { TrashIcon } from '@heroicons/react/20/solid'
import StickyBox from '../stickyBox'
import Select from '../ui/select'
import useData from '@/hooks/useData'

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

const initialNewType = 'exclusions'

export default function RulesForm() {
  const { data, setData } = useData()

  const [newRule, setNewRule] = useState(initialNewRule)
  const [newType, setNewType] = useState<'exclusions' | 'inclusions'>(
    initialNewType,
  )

  function handleSaveNewRule(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const [from, to] = [
      data.people.find((person) => person.id === newRule.from),
      data.people.find((person) => person.id === newRule.to),
    ]
    let vector
    if (from && to) {
      vector = { id: newRule.id, from, to }
    }
    if (vector) {
      const newData: Data = {
        ...data,
        rules: { ...data.rules, [newType]: [...data.rules[newType], vector] },
      }
      setData(newData)
      save(newData)
      setNewRule(initialNewRule)
      setNewType(initialNewType)
    }
  }

  function handleDeleteRule(vector: Vector, type: 'exclusions' | 'inclusions') {
    if (
      window.confirm(
        `Are you sure you want to delete the rule that ${vector.from.name} ${
          type === 'exclusions' ? 'must not give to' : ''
        }${type === 'inclusions' ? 'must give to' : ''} ${vector.to.name}?`,
      )
    ) {
      const otherType = type === 'exclusions' ? 'inclusions' : 'exclusions'
      const newData: Data = {
        ...data,
        rules: {
          [type]: data.rules[type].filter(
            (_vector) => _vector.id !== vector.id,
          ),
          [otherType]: data.rules[otherType],
        } as Rules,
      }
      setData(newData)
      save(newData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="divide-y md:divide-y-0 -my-4 md:-my-2">
        {data.rules.exclusions.map((vector) => (
          <div key={vector.id} className="flex items-start gap-2 py-4 md:py-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full text-xl">
              {vector.from.name} must not give to {vector.to.name}
            </div>
            <Button
              icon={<TrashIcon className="w-4 h-4" />}
              size="sm"
              onClick={() => handleDeleteRule(vector, 'exclusions')}
            />
          </div>
        ))}
        {data.rules.exclusions.length > 0 &&
          data.rules.inclusions.length > 0 && <hr />}
        {data.rules.inclusions.map((vector) => (
          <div key={vector.id} className="flex items-start gap-2 py-4 md:py-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full text-xl">
              {vector.from.name} must give to {vector.to.name}
            </div>
            <Button
              icon={<TrashIcon className="w-4 h-4" />}
              size="sm"
              onClick={() => handleDeleteRule(vector, 'inclusions')}
            />
          </div>
        ))}
      </div>
      <StickyBox>
        <form onSubmit={handleSaveNewRule}>
          <Fieldset legend="Add a rule">
            <div className="flex flex-col lg:flex-row gap-4">
              <Select
                id="from"
                name="from"
                label="Select person"
                options={[
                  ...data.people
                    .filter((person) => person.id !== newRule.to)
                    .map((person) => ({
                      value: person.id,
                      label: person.name,
                    })),
                ]}
                value={newRule.from}
                onChange={(e) =>
                  setNewRule((_newRule) => ({
                    ..._newRule,
                    from: e.target.value,
                  }))
                }
              />
              <Select
                id="ruleType"
                name="ruleType"
                options={[
                  { value: 'exclusions', label: 'must not give to' },
                  { value: 'inclusions', label: 'must give to' },
                ]}
                value={newType}
                onChange={(e) =>
                  setNewType(e.target.value as 'exclusions' | 'inclusions')
                }
              />
              <Select
                id="to"
                name="to"
                label="Select person"
                options={[
                  ...data.people
                    .filter((person) => person.id !== newRule.from)
                    .map((person) => ({
                      value: person.id,
                      label: person.name,
                    })),
                ]}
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
