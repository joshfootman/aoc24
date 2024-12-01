const path = "./day1/input.txt"
const file = Bun.file(path)

export const getListsOfLocationsIDs = async (): Promise<[number[], number[]]> => {
  const text = await file.text()

  const lines = text.split("\n")

  const listOneLocationIDs: number[] = []
  const listTwoLocationIDs: number[] = []

  lines.forEach((line) => {
    const [listOneLocationID, listTwoLocationID] = line.split("   ")
    listOneLocationIDs.push(+listOneLocationID)
    listTwoLocationIDs.push(+listTwoLocationID)
  })

  return [listOneLocationIDs, listTwoLocationIDs]
}
