export type IStyle = {
  [K in keyof Omit<
    ElementCSSInlineStyle['style'],
    'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty' | number
  >]: string | number
}
