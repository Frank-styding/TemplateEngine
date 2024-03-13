export const validateChange = (pre_value: unknown, new_value: unknown): boolean => {
  let pre_v = pre_value
  let pre_n = new_value
  if (typeof pre_v == 'object') {
    if (pre_value instanceof Date) {
      pre_v = pre_value.getTime()
    } else {
      pre_v = JSON.stringify(pre_value)
    }
  }

  if (typeof pre_n == 'object') {
    if (new_value instanceof Date) {
      pre_n = new_value.getTime()
    } else {
      pre_n = JSON.stringify(new_value)
    }
  }

  return pre_v !== pre_n
}
