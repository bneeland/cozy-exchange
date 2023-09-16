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

export function getVectors({
  people,
  rules,
}: {
  people: Person[]
  rules: Rules
}) {
  let attemptNumber = 0
  let vectors: Vector[] | undefined
  while (attemptNumber <= config.MAX_ATTEMPTS) {
    vectors = generateVectors({ people, rules })
    if (vectors) {
      return vectors
    }
    attemptNumber++
  }
  return
}
