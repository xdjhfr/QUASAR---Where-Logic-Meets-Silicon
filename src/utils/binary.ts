export interface BinaryAddition {
  a: number
  b: number
  result: number
  aBits: number[]
  bBits: number[]
  resultBits: number[]
  carryBits: number[]
}

function toBits(n: number, width = 8): number[] {
  const bits: number[] = []
  for (let i = width - 1; i >= 0; i--) {
    bits.push((n >> i) & 1)
  }
  return bits
}

export function generateAddition(): BinaryAddition {
  const a = Math.floor(Math.random() * 120) + 1
  const b = Math.floor(Math.random() * (255 - a - 1)) + 1
  const result = a + b

  const aBits = toBits(a)
  const bBits = toBits(b)
  const resultBits = toBits(result > 255 ? result & 0xff : result)

  // compute carry bits at each position (carry INTO that position)
  const carries: number[] = new Array(8).fill(0)
  let carry = 0
  for (let i = 7; i >= 0; i--) {
    const sum = aBits[i] + bBits[i] + carry
    carries[i] = carry
    carry = sum >= 2 ? 1 : 0
  }

  return { a, b, result, aBits, bBits, resultBits, carryBits: carries }
}
