import { getListsOfLocationsIDs } from "./utils"

const getSimilarityScore = (value: number, list: number[]) => {
  return value * list.filter((item) => item === value).length
}

export async function partTwo() {
  const [listOneLocationIDs, listTwoLocationIDs] = await getListsOfLocationsIDs()

  const scores: number[] = []

  for (let i = 0; i < 1000; i++) {
    const listOneValue = listOneLocationIDs.pop()!
    const similarityScore = getSimilarityScore(listOneValue, listTwoLocationIDs)
    scores.push(similarityScore)
  }

  const sum = scores.reduce((acc, curr) => acc + curr, 0)

  return sum
}
