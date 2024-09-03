'use client'

import ContentBox from '@/components/contentBox'
import Button from '@/components/ui/button'
import TextInput from '@/components/ui/textInput'
import { deflate } from '@/helpers'
import useData from '@/hooks/useData'
import { Data } from '@/types'
import { Square2StackIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Settings() {
  const { data } = useData()

  const [dataLink, setDataLink] = useState('')

  useEffect(() => {
    async function generateDataLink(data: Data) {
      const jsonData = JSON.stringify(data)
      const deflatedData = await deflate(jsonData)
      const dataLink = `${window.location.origin}/?data=${encodeURIComponent(
        deflatedData,
      )}`
      setDataLink(dataLink)
    }

    if (data) {
      generateDataLink(data)
    }
  }, [data])

  async function copyDataLink(dataLink: string) {
    await navigator.clipboard.writeText(dataLink)
    toast('Copied to clipboard')
  }

  return (
    <ContentBox header="Save Your Data">
      <p>Copy and paste this link somewhere safe to load your data later.</p>
      <div className="flex items-center gap-4">
        <TextInput value={dataLink} readOnly />
        <Button
          icon={<Square2StackIcon className="w-4 h-4" />}
          size="sm"
          onClick={() => copyDataLink(dataLink)}
        />
      </div>
    </ContentBox>
  )
}
