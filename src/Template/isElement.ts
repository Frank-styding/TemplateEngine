// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isElement = (element: any): boolean =>
  element instanceof HTMLElement || element instanceof SVGElement
