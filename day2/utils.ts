const path = "./day2/input.txt"
const file = Bun.file(path)

export const getReports = async () => {
  const text = await file.text()

  const lines = text.split("\n")
  const reports: number[][] = []

  lines.forEach((line) => {
    reports.push(line.split(" ").map(Number))
  })

  return reports
}
