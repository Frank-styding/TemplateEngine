// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DynamicList<H, T extends H[] | Set<H> = H[] | Set<H>> {
  constructor(
    private data: T,
    private removeCallback?: (list: H[]) => void,
    private setCallback?: (list: H[]) => void
  ) {}

  has(value: H): boolean {
    if (this.data instanceof Set) return this.data.has(value)
    return this.data.indexOf(value) != -1
  }

  push(value: H | H[]): DynamicList<H, T> {
    const data = this.data
    if (data instanceof Set) {
      if (Array.isArray(value)) {
        const n_value = value.filter((x) => !data.has(x))
        n_value.forEach((x) => data.add(x))
        if (this.setCallback) this.setCallback(n_value)
      } else if (!data.has(value)) {
        data.add(value)
        if (this.setCallback) this.setCallback([value])
      }
      return this
    }

    if (Array.isArray(value)) {
      data.push(...value)
      if (this.setCallback) this.setCallback(value)
    } else {
      data.push(value)
      if (this.setCallback) this.setCallback([value])
    }

    return this
  }

  remove(value: H | H[]): DynamicList<H, T> {
    const data = this.data
    if (data instanceof Set) {
      if (Array.isArray(value)) {
        const deleted_value = value.filter((x) => data.has(x))
        deleted_value.forEach((x) => data.delete(x))
        if (this.removeCallback) this.removeCallback(deleted_value)
      } else if (data.has(value)) {
        data.delete(value)
        if (this.removeCallback) this.removeCallback([value])
      }
      return this
    }
    if (Array.isArray(value)) {
      this.data = data.filter((x) => value.indexOf(x) !== -1) as T
      if (this.removeCallback) this.removeCallback(value)
      return this
    } else {
      this.data = data.filter((x) => x != value) as T
      if (this.removeCallback) this.removeCallback([value])
    }
    return this
  }

  get(): T {
    return this.data
  }
}
