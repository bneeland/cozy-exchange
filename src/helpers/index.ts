import { Data } from '@/types'

export function save(data: Data) {
  localStorage.setItem('data', JSON.stringify(data))
}
