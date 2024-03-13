export function setPrecision(value: number, digi = 2): number {
  const divisor = Math.pow(10, digi)
  return Math.round(value * divisor) / divisor
}
