import { getListsOfLocationsIDs } from "./utils"

const removeSmallestValueFromList = (list: number[]) => {
  let value = Infinity

  if (list.length === 0) {
    return value
  }

  list.forEach((item) => {
    if (item < value) {
      value = item
    }
  })

  list.splice(list.indexOf(value), 1)

  return value
}

export async function partOne() {
  const [listOneLocationIDs, listTwoLocationIDs] = await getListsOfLocationsIDs()

  const difference: number[] = []

  for (let i = 0; i < 1000; i++) {
    const listOneSmallestValue = removeSmallestValueFromList(listOneLocationIDs)
    const listTwoSmallestValue = removeSmallestValueFromList(listTwoLocationIDs)

    difference.push(Math.abs(listOneSmallestValue - listTwoSmallestValue))
  }

  const sum = difference.reduce((acc, curr) => acc + curr, 0)

  return sum
}
