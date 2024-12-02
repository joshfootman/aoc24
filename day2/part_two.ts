import { isValidReport } from "./part_one"
import { getReports } from "./utils"

const isValidReportWithProblemDampener = (report: number[]) => {
  if (isValidReport(report)) {
    return true
  }

  for (let i = 0; i < report.length; i++) {
    const newReport = [...report]
    newReport.splice(i, 1)

    if (isValidReport(newReport)) {
      return true
    }
  }

  return false
}

export async function partTwo() {
  const reports = await getReports()

  let validReports = 0

  reports.forEach((report, i) => {
    if (isValidReportWithProblemDampener(report)) {
      validReports++
    }
  })

  return validReports
}
