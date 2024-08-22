import { Data } from '@/types'
import { promisify } from 'util'
import zlib from 'zlib'

export function save(data: Data) {
  sessionStorage.setItem('data', JSON.stringify(data))
}

const deflateBuffer = promisify(zlib.deflate)
const inflateBuffer = promisify(zlib.inflate)

export async function deflate(inflatedString: string) {
  const inflatedBuffer = Buffer.from(inflatedString, 'utf-8')
  const deflatedBuffer = await deflateBuffer(inflatedBuffer)
  const deflatedString = deflatedBuffer.toString('base64')
  return deflatedString
}

export async function inflate(deflatedString: string) {
  const deflatedBuffer = Buffer.from(deflatedString, 'base64')
  const inflatedBuffer = await inflateBuffer(deflatedBuffer)
  const inflatedString = inflatedBuffer.toString('utf-8')
  return inflatedString
}
