import { getReports } from "./utils"

export const isValidReport = (report: number[]) => {
  let isValid = true
  const initialOrder = report[0] - report[1] < 0

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i] - report[i + 1]
    const order = diff < 0

    if (order !== initialOrder) {
      isValid = false
    }

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      isValid = false
    }
  }

  return isValid
}

export async function partOne() {
  const reports = await getReports()

  let validReports = 0

  reports.forEach((report) => {
    if (isValidReport(report)) {
      validReports++
    }
  })

  return validReports
}
