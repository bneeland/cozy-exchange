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

  function None() {
    return <span className="text-slate-500">None</span>
  }

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
              <td>Name</td>
              <td>{data.exchange.name || <None />}</td>
            </tr>
            <tr>
              <td>Contact</td>
              <td>
                {(data.contact.name && data.contact.email && (
                  <>
                    {data.contact.name} &middot; {data.contact.email}
                  </>
                )) || <None />}
              </td>
            </tr>
            <tr>
              <td>People</td>
              <td>
                {(data.people.length > 0 &&
                  data.people.map((person) => (
                    <div key={person.id}>
                      {person.name} &middot; {person.email}
                    </div>
                  ))) || <None />}
              </td>
            </tr>
            <tr>
              <td>Message</td>
              <td>{data.message || <None />}</td>
            </tr>
          </tbody>
        </table>
      </Fieldset>
      <hr />
      <h1>Wrap it up!</h1>
      <p>
        If everything looks good, click the button below to generate random
        matches and send emails to all participants.
      </p>
      <Button
        label="Match and send now"
        icon={<PaperAirplaneIcon className="w-5 h-5" />}
      />
    </>
  )
}
