'use client'

import { DataContext } from '@/contexts/data'
import { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react'
import Fieldset from '../fieldset'
import TextArea from '../ui/textArea'
import Button from '../ui/button'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { getVectors } from '@/helpers/assign'
import { Exchange, Vector } from '@/types'
import axios from 'axios'

const statuses = {
  assignError:
    "There was a issue trying to randomly assign matches in this exchange. Try removing some rules, and making sure they're not too restrictive.",
  sendingEmails: 'Sending emails…',
  emailsSuccess: "Emails have been sent! You're all done!",
  emailsError: 'There was a problem sending the emails. Try again.',
}

export default function FinalizeForm() {
  const { data, setData } = useContext(DataContext)

  const [status, setStatus] = useState<keyof typeof statuses | null>(null)

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

  async function handleFinalize() {
    if (
      window.confirm(
        'Are you sure? This will automatically send emails to everyone with their matches.',
      )
    ) {
      const vectors = getVectors({ people: data.people, rules: data.rules })
      if (vectors) {
        try {
          setStatus('sendingEmails')
          const apiResponse = await sendEmails({
            exchange: data.exchange,
            vectors,
          })
          const { emailResponse } = apiResponse?.data
          if (
            emailResponse.every(
              (response: { Message: string }) => response.Message === 'OK',
            )
          ) {
            setStatus('emailsSuccess')
          }
        } catch (error) {
          setStatus('emailsError')
          console.error(error)
        }
      } else {
        setStatus('assignError')
      }
    }
  }

  async function sendEmails({
    exchange,
    vectors,
  }: {
    exchange: Exchange
    vectors: Vector[]
  }) {
    try {
      const result = await axios({
        method: 'post',
        url: '/api/send-email',
        data: {
          exchange,
          vectors,
        },
      })
      return result
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Fieldset legend="Info">
        <TextArea
          id="message"
          label="Message"
          placeholder="Write an optional message, including any special guidelines or details that you'd like everyone to know."
          value={data.exchange.message}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({
              ...data,
              exchange: { ...data.exchange, message: e.target.value },
            })
          }
          autoFocus
          autoSave
        />
      </Fieldset>
      <Fieldset legend="Summary">
        <table className="table-auto w-full whitespace-nowrap">
          <tbody className="divide-y">
            <tr className="align-baseline">
              <td>Name</td>
              <td>{data.exchange.name || <None />}</td>
            </tr>
            <tr className="align-baseline">
              <td>Contact</td>
              <td>
                {(data.exchange.contact.name && data.exchange.contact.email && (
                  <div className="flex flex-col sm:flex-row">
                    {data.exchange.contact.name} &middot;{' '}
                    {data.exchange.contact.email}
                  </div>
                )) || <None />}
              </td>
            </tr>
            <tr className="align-baseline">
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
            <tr className="align-baseline">
              <td>Rules</td>
              <td>
                {((data.rules.exclusions.length > 0 ||
                  data.rules.inclusions.length > 0) && (
                  <>
                    {data.rules.exclusions.map((vector) => (
                      <div key={vector.id}>
                        {vector.from.name} must not give to {vector.to.name}
                      </div>
                    ))}
                    {data.rules.inclusions.map((vector) => (
                      <div key={vector.id}>
                        {vector.from.name} must give to {vector.to.name}
                      </div>
                    ))}
                  </>
                )) || <None />}
              </td>
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
        onClick={handleFinalize}
      />
      {status && <div>{statuses[status]}</div>}
    </>
  )
}
