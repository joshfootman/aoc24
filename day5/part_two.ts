import { getPageOrderingRulesAndOrders, parsePageOrderingRules, validatePageNumbersAgainstRules } from "./utils"

export async function partTwo() {
  const { rules, orders } = await getPageOrderingRulesAndOrders()
  const map = parsePageOrderingRules(rules)

  let sumOfMiddlePages = 0

  orders.forEach((order) => {
    const pageNumbers = order.split(",").map(Number)

    let invalidOrder = false

    const move = (fromIndex, toIndex) => {
      var element = pageNumbers[fromIndex]
      pageNumbers.splice(fromIndex, 1)
      pageNumbers.splice(toIndex, 0, element)
    }

    validatePageNumbersAgainstRules(pageNumbers, map, (i, j) => {
      invalidOrder = true
    })

    if (invalidOrder) {
      let movedPageNumber = true

      // if in doubt, brute force it out :)))))))))) (pls don't judge)
      while (movedPageNumber) {
        let snapshot = [...pageNumbers]

        validatePageNumbersAgainstRules(pageNumbers, map, (i, j) => {
          move(i, j)
        })

        if (JSON.stringify(snapshot) === JSON.stringify(pageNumbers)) {
          movedPageNumber = false
        }
      }

      const middleIndex = (pageNumbers.length - 1) / 2
      sumOfMiddlePages += pageNumbers[middleIndex]
    }
  })

  return sumOfMiddlePages
}
