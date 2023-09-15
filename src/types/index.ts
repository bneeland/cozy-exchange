export type SaveEvent = FocusEvent | KeyboardEvent

export type Person = { id: string; name: string; email: string }

export type Vector = { from: Person; to: Person }

export type Rules = {
  inclusions: Vector[]
  exclusions: Vector[]
}

export type Data = {
  exchange: {
    name: string
  }
  contact: {
    name: string
    email: string
  }
  people: Person[]
  rules: Rules
  message: string
}
