export function uuidv4(): string {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (
      (c as never) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> ((c as never) / 4)))
    ).toString(16)
  )
}
