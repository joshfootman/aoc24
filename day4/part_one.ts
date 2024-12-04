import {
  type Coordinate,
  type Direction,
  DIRECTION,
  getWordSearch,
  getWordSearchBounds,
  type WordSearch,
} from "./utils"

const GOAL_WORD = "XMAS"

const isDirectionValid = (wordSearch: WordSearch, { x, y }: Coordinate, direction: Direction) => {
  const { HEIGHT, WIDTH } = getWordSearchBounds(wordSearch)

  if (direction === DIRECTION.NORTH) {
    return y >= 3
  } else if (direction === DIRECTION.NORTH_EAST) {
    return y >= 3 && x < WIDTH - 3
  } else if (direction === DIRECTION.EAST) {
    return x < WIDTH - 3
  } else if (direction === DIRECTION.SOUTH_EAST) {
    return y < HEIGHT - 3 && x < WIDTH - 3
  } else if (direction === DIRECTION.SOUTH) {
    return y < HEIGHT - 3
  } else if (direction === DIRECTION.SOUTH_WEST) {
    return y < HEIGHT - 3 && x >= 3
  } else if (direction === DIRECTION.WEST) {
    return x >= 3
  } else if (direction === DIRECTION.NORTH_WEST) {
    return y >= 3 && x >= 3
  }

  throw new Error(`Direction not supported: ${direction}`)
}

const DIRECTION_MAP = {
  [DIRECTION.NORTH]: {
    x: [0, 0, 0, 0],
    y: [0, -1, -2, -3],
  },
  [DIRECTION.NORTH_EAST]: {
    x: [0, 1, 2, 3],
    y: [0, -1, -2, -3],
  },
  [DIRECTION.EAST]: {
    x: [0, 1, 2, 3],
    y: [0, 0, 0, 0],
  },
  [DIRECTION.SOUTH_EAST]: {
    x: [0, 1, 2, 3],
    y: [0, 1, 2, 3],
  },
  [DIRECTION.SOUTH]: {
    x: [0, 0, 0, 0],
    y: [0, 1, 2, 3],
  },
  [DIRECTION.SOUTH_WEST]: {
    x: [0, -1, -2, -3],
    y: [0, 1, 2, 3],
  },
  [DIRECTION.WEST]: {
    x: [0, -1, -2, -3],
    y: [0, 0, 0, 0],
  },
  [DIRECTION.NORTH_WEST]: {
    x: [0, -1, -2, -3],
    y: [0, -1, -2, -3],
  },
}

export async function partOne() {
  const wordSearch = await getWordSearch()

  const { HEIGHT, WIDTH } = getWordSearchBounds(wordSearch)

  const checkDirection = (direction: Direction) => (coordinate: Coordinate) => {
    if (!isDirectionValid(wordSearch, coordinate, direction)) {
      return 0
    }

    let word = ""
    word += wordSearch[coordinate.y + DIRECTION_MAP[direction].y[0]][coordinate.x + DIRECTION_MAP[direction].x[0]]
    word += wordSearch[coordinate.y + DIRECTION_MAP[direction].y[1]][coordinate.x + DIRECTION_MAP[direction].x[1]]
    word += wordSearch[coordinate.y + DIRECTION_MAP[direction].y[2]][coordinate.x + DIRECTION_MAP[direction].x[2]]
    word += wordSearch[coordinate.y + DIRECTION_MAP[direction].y[3]][coordinate.x + DIRECTION_MAP[direction].x[3]]

    return word === GOAL_WORD ? 1 : 0
  }

  const checkNorth = checkDirection(DIRECTION.NORTH)
  const checkNorthEast = checkDirection(DIRECTION.NORTH_EAST)
  const checkEast = checkDirection(DIRECTION.EAST)
  const checkSouthEast = checkDirection(DIRECTION.SOUTH_EAST)
  const checkSouth = checkDirection(DIRECTION.SOUTH)
  const checkSouthWest = checkDirection(DIRECTION.SOUTH_WEST)
  const checkWest = checkDirection(DIRECTION.WEST)
  const checkNorthWest = checkDirection(DIRECTION.NORTH_WEST)

  let found = 0

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      found += checkNorth({ x, y })
      found += checkNorthEast({ x, y })
      found += checkEast({ x, y })
      found += checkSouthEast({ x, y })
      found += checkSouth({ x, y })
      found += checkSouthWest({ x, y })
      found += checkWest({ x, y })
      found += checkNorthWest({ x, y })
    }
  }

  return found
}
