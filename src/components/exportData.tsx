import Button from '@/components/ui/button'
import { deflate } from '@/helpers'
import useData from '@/hooks/useData'
import { Data } from '@/types'

async function exportData(data: Data) {
  const jsonData = JSON.stringify(data)
  const deflatedData = await deflate(jsonData)
  await navigator.clipboard.writeText(
    `${window.location.origin}/?d=${encodeURIComponent(deflatedData)}`,
  )
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
