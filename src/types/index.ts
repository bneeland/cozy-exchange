export type SaveEvent = FocusEvent | KeyboardEvent

export type Exchange = {
  name: string
  contact: {
    name: string
    email: string
  }
  message: string
}

export type Person = { id: string; name: string; email: string }

export type Vector = { id?: string; from: Person; to: Person }

export type Rules = {
  inclusions: Vector[]
  exclusions: Vector[]
}

export type Data = {
  exchange: Exchange
  people: Person[]
  rules: Rules
}
