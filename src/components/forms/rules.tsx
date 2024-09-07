'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import Fieldset from '../fieldset'
import Button from '../ui/button'
import { Data, Rules, Vector } from '@/types'
import { save } from '@/helpers'
import { TrashIcon } from '@heroicons/react/16/solid'
import StickyBox from '../stickyBox'
import Select from '../ui/select'
import useData from '@/hooks/useData'
import PlaceholderMessage from '../placeholderMessage'
import Link from 'next/link'
import { getVectors } from '@/helpers/assign'
import toast from 'react-hot-toast'

const initialNewRulePeople = () =>
  ({
    id: crypto.randomUUID(),
    from: 'label',
    to: 'label',
  }) as {
    id: string
    from: string
    to: string
  }

const initialNewRuleType = 'exclusions'

export default function RulesForm() {
  const fromSelectRef = useRef<HTMLSelectElement>(null)

  const { data, setData } = useData()

  const [newRulePeople, setNewRulePeople] = useState(initialNewRulePeople)
  const [newRuleType, setNewRuleType] = useState<'exclusions' | 'inclusions'>(
    initialNewRuleType,
  )

  function handleSaveNewRule(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const [from, to] = [
      data.people.find((person) => person.id === newRulePeople.from),
      data.people.find((person) => person.id === newRulePeople.to),
    ]
    let vector
    if (from && to) {
      vector = { id: newRulePeople.id, from, to }
      const newData: Data = {
        ...data,
        rules: {
          ...data.rules,
          [newRuleType]: [...data.rules[newRuleType], vector],
        },
      }
      setData(newData)
      save(newData)
      setNewRulePeople(initialNewRulePeople)
      setNewRuleType(initialNewRuleType)
      fromSelectRef.current?.focus()
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
      fromSelectRef.current?.focus()
    }
  }

  useEffect(() => {
    if (!getVectors({ people: data.people, rules: data.rules })) {
      toast.error('There is a conflict in your rules')
    }
  }, [data])

  return (
    <div className="space-y-6">
      {data.people.length ? (
        <>
          <div className="divide-y -my-4 md:-my-2">
            {data.rules.exclusions.length || data.rules.inclusions.length ? (
              <>
                {data.rules.exclusions.map((vector, index) => (
                  <div key={vector.id} className="flex items-center gap-2 py-4">
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
                {data.rules.inclusions.map((vector) => (
                  <div
                    key={vector.id}
                    className="flex items-start gap-2 py-4 md:py-2"
                  >
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
              </>
            ) : (
              <PlaceholderMessage>
                No rules yet. Add some, below.
              </PlaceholderMessage>
            )}
          </div>
          <StickyBox>
            <form onSubmit={handleSaveNewRule}>
              <Fieldset legend="Add a rule">
                <div className="flex flex-col lg:flex-row gap-1 overflow-x-auto">
                  <Select
                    customRef={fromSelectRef}
                    id="from"
                    name="from"
                    label="Select person"
                    options={[
                      ...data.people
                        .filter((person) => person.id !== newRulePeople.to)
                        .map((person) => ({
                          value: person.id,
                          label: person.name,
                        })),
                    ]}
                    value={newRulePeople.from}
                    onChange={(e) =>
                      setNewRulePeople((_newRulePeople) => ({
                        ..._newRulePeople,
                        from: e.target.value,
                      }))
                    }
                    autoFocus
                  />
                  <Select
                    id="ruleType"
                    name="ruleType"
                    options={[
                      { value: 'exclusions', label: 'must not give to' },
                      { value: 'inclusions', label: 'must give to' },
                    ]
                      // If `from` person is already a `from` person in existing inclusion rule, can't select inclusion
                      .filter((ruleType) => {
                        if (
                          data.rules.inclusions
                            .map((vector) => vector.from.id)
                            .includes(newRulePeople.from)
                        )
                          return ruleType.value !== 'inclusions'
                        else return true
                      })}
                    value={newRuleType}
                    onChange={(e) =>
                      setNewRuleType(
                        e.target.value as 'exclusions' | 'inclusions',
                      )
                    }
                  />
                  <Select
                    id="to"
                    name="to"
                    label="Select person"
                    options={[
                      ...data.people
                        // `to` person can't be same as `from` person
                        .filter((person) => person.id !== newRulePeople.from)
                        // If inclusion rule, `to` person can't already be a `to` person of existing inclusion rule
                        .filter((person) => {
                          if (newRuleType === 'inclusions')
                            return !data.rules.inclusions
                              .map((vector) => vector.to.id)
                              .includes(person.id)
                          else return true
                        })
                        // `to` and `from` people can't be same `to` and `from` of existing rule
                        .filter(
                          (person) =>
                            ![
                              ...data.rules.exclusions
                                .filter(
                                  (vector) =>
                                    vector.from.id === newRulePeople.from,
                                )
                                .map((vector) => vector.to.id),
                              ...data.rules.inclusions
                                .filter(
                                  (vector) =>
                                    vector.from.id === newRulePeople.from,
                                )
                                .map((vector) => vector.to.id),
                            ].includes(person.id),
                        )
                        // If `exclusion`, can't select last remaining option in `from` people
                        .filter((person, index, array) => {
                          if (
                            newRuleType === 'exclusions' &&
                            array.length === 1
                          )
                            return false
                          else return true
                        })
                        .map((person) => ({
                          value: person.id,
                          label: person.name,
                        })),
                    ]}
                    value={newRulePeople.to}
                    onChange={(e) =>
                      setNewRulePeople((_newRulePeople) => ({
                        ..._newRulePeople,
                        to: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button
                  type="submit"
                  label="Save"
                  full
                  disabled={
                    newRulePeople.from === 'label' ||
                    newRulePeople.to === 'label'
                  }
                />
              </Fieldset>
            </form>
          </StickyBox>
        </>
      ) : (
        <PlaceholderMessage>
          No people yet. Add some on the <Link href="/people">People page</Link>
          .
        </PlaceholderMessage>
      )}
    </div>
  )
}
