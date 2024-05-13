import { Data } from '@/types'

export function save(data: Data) {
  sessionStorage.setItem('data', JSON.stringify(data))
}
