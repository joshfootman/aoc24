import { partOne } from "./part_one"
import { partTwo } from "./part_two"

async function main() {
  const partOneAnswer = await partOne()

  console.log("\n")
  console.log("======== PART ONE ========")
  console.log(partOneAnswer)

  const partTwoAnswer = await partTwo()

  console.log("======== PART TWO ========")
  console.log(partTwoAnswer)
  console.log("\n")
}

main()
