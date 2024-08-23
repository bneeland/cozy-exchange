import Button from '@/components/ui/button'
import { deflate } from '@/helpers'
import useData from '@/hooks/useData'
import { Data } from '@/types'
import toast from 'react-hot-toast'

async function exportData(data: Data) {
  const jsonData = JSON.stringify(data)
  const deflatedData = await deflate(jsonData)
  await navigator.clipboard.writeText(
    `${window.location.origin}/?data=${encodeURIComponent(deflatedData)}`,
  )
  toast('A link with your data was copied')
}

export default function ExportData() {
  const { data } = useData()

  return (
    <Button
      label="Export"
      full
      focus={false}
      onClick={() => exportData(data)}
    />
  )
}
