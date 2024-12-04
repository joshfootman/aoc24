import { type Coordinate, getWordSearch, getWordSearchBounds } from "./utils"

export async function partTwo() {
  const wordSearch = await getWordSearch()

  const { HEIGHT, WIDTH } = getWordSearchBounds(wordSearch)

  const checkCentreOfMAS = ({ x, y }: Coordinate) => {
    if (y === 0) return 0
    if (x === WIDTH - 1) return 0
    if (y === HEIGHT - 1) return 0
    if (x === 0) return 0

    // M.S
    // .A.
    // M.S

    if (wordSearch[y][x] !== "A") return 0

    const first = wordSearch[y - 1][x - 1] + wordSearch[y][x] + wordSearch[y + 1][x + 1]
    const second = wordSearch[y - 1][x + 1] + wordSearch[y][x] + wordSearch[y + 1][x - 1]

    if ((first === "MAS" || first === "SAM") && (second === "MAS" || second === "SAM")) {
      return 1
    } else {
      return 0
    }
  }

  let found = 0

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      found += checkCentreOfMAS({ x, y })
    }
  }

  return found
}
