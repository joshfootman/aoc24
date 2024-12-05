import { getPageOrderingRulesAndOrders, parsePageOrderingRules, validatePageNumbersAgainstRules } from "./utils"

export async function partOne() {
  const { rules, orders } = await getPageOrderingRulesAndOrders()
  const map = parsePageOrderingRules(rules)

  let sumOfMiddlePages = 0

  orders.forEach((order) => {
    const pageNumbers = order.split(",").map(Number)

    let validOrder = true

    validatePageNumbersAgainstRules(pageNumbers, map, () => {
      validOrder = false
    })

    if (validOrder) {
      const middleIndex = (pageNumbers.length - 1) / 2
      sumOfMiddlePages += pageNumbers[middleIndex]
    }
  })

  return sumOfMiddlePages
}
