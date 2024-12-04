import { getCorruptedMemory } from "./utils"

const isValidMemory = (value: string, cursor: number) => {
  if (cursor === 0 && value === "m") return true
  if (cursor === 1 && value === "u") return true
  if (cursor === 2 && value === "l") return true
  if (cursor === 3 && value === "(") return true
  if (cursor > 3) return true
  return false
}

const reset = ["", "", 0] as const

export const parseMemory = (memory: string) => {
  let sum = 0

  let first = ""
  let second = ""
  let cursor = 0

  memory.split("").forEach((value) => {
    if (isValidMemory(value, cursor)) {
      if (cursor < 4) {
        cursor++
      } else if (cursor === 4) {
        if (Number.isSafeInteger(+value)) {
          first += value
        } else if (first.length > 0 && value === ",") {
          cursor++
        } else {
          ;[first, second, cursor] = reset
        }
      } else if (cursor === 5) {
        if (Number.isSafeInteger(+value)) {
          second += value
        } else if (second.length > 0 && value === ")") {
          sum += +first * +second
          ;[first, second, cursor] = reset
        } else {
          ;[first, second, cursor] = reset
        }
      } else {
        throw new Error(`should not get here, ${cursor}`)
      }
    } else {
      ;[first, second, cursor] = reset
    }
  })

  return sum
}

export async function partOne() {
  const memory = await getCorruptedMemory()
  return parseMemory(memory)
}
