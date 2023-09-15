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
  const randomizedPeople = randomize(people) as Person[]

  let vectors: Vector[] = []

  rules.inclusions.forEach((inclusion) => {
    vectors.push({ from: inclusion.from, to: inclusion.to })
  })

  let excluded = false
  let matched = false
  let iterations = 0
  let person2: Person
  let index2

  randomizedPeople.forEach((person1, index1) => {
    // for (let [index1, person1] of randomizedPeople.entries()) {
    matched = false
    iterations = 0
    if (!vectors.some((vector) => vector.from === person1)) {
      // if (!vectors.some((vector) => vector.from === person1.email)) {
      if (index1 === randomizedPeople.length - 1) {
        index2 = 0
      } else {
        index2 = index1 + 1
        // index2 = parseInt(index1) + 1
      }
      while (!matched) {
        if (iterations < randomizedPeople.length * 2) {
          excluded = false
          person2 = randomizedPeople[index2]
          if (person2 === person1) {
            if (index2 >= randomizedPeople.length - 1) {
              index2 = 0
            } else {
              index2++
            }
            iterations++
          } else if (vectors.some((vector) => vector.to === person2)) {
            // } else if (vectors.some((vector) => vector.to === person2.email)) {
            if (index2 >= randomizedPeople.length - 1) {
              index2 = 0
            } else {
              index2++
            }
            iterations++
          } else {
            for (const exclusion of rules.exclusions) {
              if (
                exclusion.from === person1 &&
                exclusion.to === person2
                // exclusion.from === person1.email &&
                // exclusion.to === person2.email
              ) {
                excluded = true
                break
              }
            }
            if (excluded) {
              if (index2 >= randomizedPeople.length - 1) {
                index2 = 0
              } else {
                index2++
              }
              iterations++
            } else {
              vectors.push({ from: person1, to: person2 })
              // vectors.push({ from: person1.email, to: person2.email })
              matched = true
            }
          }
        } else {
          return
        }
      }
    }
  })
  // }
  return vectors
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
