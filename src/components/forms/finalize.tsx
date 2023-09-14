'use client'

import { DataContext } from '@/contexts/data'
import { ChangeEvent, ReactNode, useContext, useEffect } from 'react'
import Fieldset from '../fieldset'
import TextArea from '../ui/textArea'
import Button from '../ui/button'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'

export default function FinalizeForm() {
  const { data, setData } = useContext(DataContext)

  useEffect(() => {
    const savedDataString = localStorage.getItem('data')
    const savedData = savedDataString && JSON.parse(savedDataString)
    if (savedData) {
      setData(savedData)
    }
  }, [setData])

  return (
    <>
      <Fieldset legend="Info">
        <TextArea
          id="message"
          label="Message"
          placeholder="Write an optional message, including any special guidelines or details that you'd like everyone to know."
          value={data.message}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, message: e.target.value })
          }
          autoFocus
          autoSave
        />
      </Fieldset>
      <Fieldset legend="Summary">
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td>Contact</td>
            <td>{data.contact.name} &middot; {data.contact.email}</td>
          </tr>
          <tr>
            <td>People</td>
            <td>
              {data.people.map((person) => (
                <div key={person.id}>
                  {person.name} &middot; {person.email}
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td>Message</td>
            <td>{data.message ? data.message : <span className="text-slate-500">None</span>}</td>
          </tr>
        </tbody>
      </table>
      </Fieldset>
      <h1>Generate matches and send emails</h1>
      <p>If everything looks good, click the button below to generate matches and send emails to all participants.</p>
      <Button label="Match and send now" icon={<PaperAirplaneIcon className="w-5 h-5" />} />
    </>
  )
}
