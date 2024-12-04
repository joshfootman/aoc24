import { parseMemory } from "./part_one"
import { getCorruptedMemory } from "./utils"

export async function partTwo() {
  const memory = await getCorruptedMemory()

  const blocks = memory.split("don't()")
  const validMemoryBlocks: string[] = []
  validMemoryBlocks.push(blocks[0])
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i]
    const validBlocks = block.split("do()")
    for (let j = 1; j < validBlocks.length; j++) {
      validMemoryBlocks.push(validBlocks[j])
    }
  }

  let sum = 0
  validMemoryBlocks.forEach((block) => {
    sum += parseMemory(block)
  })

  return sum
}
