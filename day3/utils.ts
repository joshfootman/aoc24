const path = "./day3/input.txt"
const file = Bun.file(path)

export const getCorruptedMemory = async () => {
  const text = await file.text()
  return text.replace(/\n/g, "")
}
