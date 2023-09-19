import { config } from '@/config'
import { Person, Rules, Vector } from '@/types'

function randomize(arrayIn: any[]) {
  let arrayOut: any[] = []
  for (let i in arrayIn) {
    let randomIndex = Math.floor(Math.random() * arrayIn.length)
    while (arrayOut.includes(arrayIn[randomIndex])) {
      randomIndex = Math.floor(Math.random() * arrayIn.length)
    }
    arrayOut[i] = arrayIn[randomIndex]
  }
  return arrayOut
}

function generateVectors({
  people,
  rules,
}: {
  people: Person[]
  rules: Rules
}) {
  const _people = randomize(people) as Person[]

  const _vectors: Vector[] = []

  rules.inclusions.forEach((inclusion) => {
    _vectors.push({ from: inclusion.from, to: inclusion.to })
  })

  let excluded = false
  let isMatched = false
  let iterations = 0
  let person2: Person
  let index2

  _people.forEach((person1, index1) => {
    isMatched = false
    iterations = 0
    if (!_vectors.some((vector) => vector.from.id === person1.id)) {
      if (index1 === _people.length - 1) {
        index2 = 0
      } else {
        index2 = index1 + 1
      }
      while (!isMatched) {
        if (iterations < _people.length * 2) {
          excluded = false
          person2 = _people[index2]
          if (person2 === person1) {
            if (index2 >= _people.length - 1) {
              index2 = 0
            } else {
              index2++
            }
            iterations++
          } else if (_vectors.some((vector) => vector.to.id === person2.id)) {
            if (index2 >= _people.length - 1) {
              index2 = 0
            } else {
              index2++
            }
            iterations++
          } else {
            rules.exclusions.forEach((exclusion) => {
              if (
                exclusion.from.id === person1.id &&
                exclusion.to.id === person2.id
              ) {
                excluded = true
                return
              }
            })
            if (excluded) {
              if (index2 >= _people.length - 1) {
                index2 = 0
              } else {
                index2++
              }
              iterations++
            } else {
              _vectors.push({ from: person1, to: person2 })
              isMatched = true
            }
          }
        } else {
          return
        }
      }
    }
  })
  return _vectors
}

function validateVectors({
  vectors,
  people,
}: {
  vectors: Vector[]
  people: Person[]
}) {
  if (vectors.length !== people.length) {
    console.warn('There is a match missing or there is an extra match')
    return false
  }
  if (vectors.length !== new Set(vectors).size) {
    console.warn('There are duplicate matches')
    return false
  }
  if (
    !people
      .map((person) => person.id)
      .every((personId) =>
        vectors.map((vector) => vector.to.id).includes(personId),
      )
  ) {
    console.warn('A person does not have a match')
    return false
  }
  return true
}

export function getVectors({
  people,
  rules,
}: {
  people: Person[]
  rules: Rules
}) {
  let attemptNumber = 1
  let vectors: Vector[] | undefined
  while (attemptNumber <= config.MAX_ATTEMPTS) {
    vectors = generateVectors({ people, rules })
    const areVectorsValid = validateVectors({ vectors, people })
    if (areVectorsValid) {
      return vectors
    }
    attemptNumber++
  }
  return
}