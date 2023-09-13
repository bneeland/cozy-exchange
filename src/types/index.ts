export type SaveEvent = FocusEvent | KeyboardEvent

export type Person = { id: string; name: string; email: string }

export type Rule = { source: string; target: string }

export type Data = {
  exchange: {
    name: string
  }
  contact: {
    name: string
    email: string
  }
  people: Person[]
  rules: {
    inclusions: Rule[]
    exclusions: Rule[]
  }
  message: string
}
