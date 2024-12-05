const path = "./day5/input.txt"
const file = Bun.file(path)

export const getPageOrderingRulesAndOrders = async () => {
  const text = await file.text()
  const lines = text.split("\n")

  const endOfRulesIndex = lines.indexOf("")

  const rules = lines.slice(0, endOfRulesIndex)
  const orders = lines.slice(endOfRulesIndex + 1)

  return { rules, orders }
}

export const parsePageOrderingRules = (rules: string[]) => {
  const map = new Map<number, number[]>()

  rules.forEach((rule) => {
    const [x, y] = rule.split("|").map(Number)
    const rulesForX = map.get(x)
    map.set(x, rulesForX ? [...rulesForX, y] : [y])
  })

  return map
}

export const validatePageNumbersAgainstRules = (
  pageNumbers: number[],
  map: Map<number, number[]>,
  onInvalidPageNumber: (indexToCheck: number, indexToCheckAgainst: number) => void
) => {
  let escape = false
  for (let i = pageNumbers.length - 1; i >= 0; i--) {
    if (escape) break
    const valueToCheck = pageNumbers[i]
    if (i > 0) {
      for (let j = i - 1; j >= 0; j--) {
        if (escape) break
        const valueToCheckAgainst = pageNumbers[j]
        const validOrdersForValueToCheck = map.get(valueToCheck)
        if (validOrdersForValueToCheck?.includes(valueToCheckAgainst)) {
          onInvalidPageNumber(i, j)
          escape = true
        }
      }
    }
  }
}
