const path = "./day4/input.txt"
const file = Bun.file(path)

export type WordSearch = string[][]
export type Coordinate = { x: number; y: number }

export const DIRECTION = {
  NORTH: "NORTH",
  NORTH_EAST: "NORTH_EAST",
  EAST: "EAST",
  SOUTH_EAST: "SOUTH_EAST",
  SOUTH: "SOUTH",
  SOUTH_WEST: "SOUTH_WEST",
  WEST: "WEST",
  NORTH_WEST: "NORTH_WEST",
} as const

export type Direction = (typeof DIRECTION)[keyof typeof DIRECTION]

export const getWordSearch = async () => {
  const text = await file.text()
  const lines = text.split("\n")

  const wordSearch: WordSearch = []
  lines.forEach((line) => {
    wordSearch.push(line.split(""))
  })

  return wordSearch
}

export const getWordSearchBounds = (wordSearch: WordSearch) => {
  const HEIGHT = wordSearch.length
  const WIDTH = wordSearch[0].length
  return { WIDTH, HEIGHT }
}
