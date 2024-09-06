'use client'

import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'
import Fieldset from '../fieldset'
import TextArea from '../ui/textArea'
import Button from '../ui/button'
import { getVectors } from '@/helpers/assign'
import { Exchange, Vector } from '@/types'
import axios from 'axios'
import useData from '@/hooks/useData'
import ContentBox from '../contentBox'
import Link from 'next/link'
import Loader from '../ui/loader'

const STATUSES = {
  assignError:
    "We weren't able to randomly assign matches in this exchange. Try removing some rules and making sure they're not too restrictive.",
  sendingEmails: 'Sending emails…',
  emailSuccess: "Emails have been sent! You're all done!",
  emailError: 'There was a problem sending the emails. Try again.',
}

export default function FinalizeForm() {
  const exchangeMessageTextareaRef = useRef<HTMLTextAreaElement>(null)

  const { isLoadingData, data, setData } = useData()

  const [status, setStatus] = useState<keyof typeof STATUSES | null>(null)
  const [messages, setMessages] = useState<ReactNode[]>([])
  const [problems, setProblems] = useState<ReactNode[]>([])
  const [isLoadingVerify, setIsLoadingVerify] = useState(true)
  const [isLoadingMatch, setIsLoadingMatch] = useState(false)

  useEffect(() => {
    if (!isLoadingData) {
      if (!data.exchange.message) exchangeMessageTextareaRef.current?.focus()
    }
  }, [isLoadingData])

  useEffect(() => {
    const _messages = []
    if (data.people.length < 3) {
      _messages.push(
        <>
          Start by adding at least three people to the exchange.{' '}
          <Link href="/people">Go to People</Link>
        </>,
      )
    }
    setMessages(_messages)

    if (_messages.length <= 0) {
      const _problems = []
      if (new Set(data.people.map((person) => person.email)).size < 3)
        _problems.push(
          <>
            Your exchange must have at least three different people, each with
            their own email address. <Link href="/people">Go to People</Link>
          </>,
        )
      if (!data.people.every((person) => !!person.name))
        _problems.push(
          <>
            Every person must have a name.{' '}
            <Link href="/people">Go to People</Link>
          </>,
        )
      if (!data.people.every((person) => !!person.email))
        _problems.push(
          <>
            Every person must have an email address.{' '}
            <Link href="/people">Go to People</Link>
          </>,
        )
      if (!getVectors({ people: data.people, rules: data.rules }))
        _problems.push(
          <>
            A conflict was detected in your rules. Try removing some rules.{' '}
            <Link href="/rules">Go to Rules</Link>
          </>,
        )
      setProblems(_problems)
    }

    setIsLoadingVerify(false)
  }, [data])

  function None() {
    return <span className="text-slate-500">None</span>
  }

  function EmptyPerson() {
    return <span className="text-slate-500">Empty person</span>
  }

  async function handleFinalize() {
    if (
      window.confirm(
        'Emails will automatically be sent to everyone with their matches. Are you sure?',
      )
    ) {
      setIsLoadingMatch(true)
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
            setStatus('emailSuccess')
          }
        } catch (error) {
          setStatus('emailError')
          console.error(error)
        }
      } else {
        setStatus('assignError')
      }
      setIsLoadingMatch(false)
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
    <div className="space-y-4">
      <ContentBox header="Finalize">
        <Fieldset legend="Info">
          <TextArea
            customRef={exchangeMessageTextareaRef}
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
            autoSave
            readOnly={isLoadingData}
          />
        </Fieldset>
        <Fieldset legend="Summary">
          <table className="table-auto w-full whitespace-nowrap">
            <tbody className="divide-y">
              <tr className="align-baseline">
                <td className="pr-4">Name</td>
                <td className="pb-2">{data.exchange.name || <None />}</td>
              </tr>
              <tr className="align-baseline">
                <td className="pr-4">Contact</td>
                <td className="py-2">
                  {data.exchange.contact.name || data.exchange.contact.email ? (
                    <div className="flex flex-col sm:flex-row">
                      {data.exchange.contact.name}
                      {data.exchange.contact.name &&
                        data.exchange.contact.email && <> &middot; </>}
                      {data.exchange.contact.email}
                    </div>
                  ) : (
                    <None />
                  )}
                </td>
              </tr>
              <tr className="align-baseline">
                <td className="pr-4">People</td>
                <td className="py-2">
                  {(data.people.length > 0 &&
                    data.people.map((person) => (
                      <div key={person.id}>
                        {person.name || person.email ? (
                          <>
                            {person.name}
                            {person.name && person.email && <> &middot; </>}
                            {person.email}
                          </>
                        ) : (
                          <EmptyPerson />
                        )}
                      </div>
                    ))) || <None />}
                </td>
              </tr>
              <tr className="align-baseline">
                <td className="pr-4">Rules</td>
                <td className="pt-2">
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
      </ContentBox>
      <ContentBox header="Match and send emails">
        {isLoadingVerify ? (
          <div>
            <Loader className="w-4 h-4 mx-auto" />
          </div>
        ) : messages.length > 0 ? (
          messages.map((message, index) => (
            <>
              <p key={index}>{message}</p>
            </>
          ))
        ) : problems.length > 0 ? (
          <>
            <p>
              Looks like there are some issues that would need to be fixed
              before continuing.
            </p>
            <Fieldset legend="Issues">
              <div className="divide-y">
                {problems.map((problem, index) => (
                  <div
                    key={index}
                    className={
                      problems.length === 1
                        ? ''
                        : index === 0
                        ? 'pb-2'
                        : index === problems.length - 1
                        ? 'pt-2'
                        : 'py-2'
                    }
                  >
                    {problem}
                  </div>
                ))}
              </div>
            </Fieldset>
          </>
        ) : (
          <>
            <p>Your inputs look good.</p>
            <p>Generate matches and send automatic emails out anytime.</p>
          </>
        )}
        <div className="flex justify-center gap-4">
          <Button
            label="Match and send emails…"
            onClick={handleFinalize}
            loading={isLoadingMatch}
            disabled={isLoadingData || problems.length > 0}
          />
          {status && <div>{STATUSES[status]}</div>}
        </div>
      </ContentBox>
    </div>
  )
}
