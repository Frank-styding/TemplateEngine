import { State } from '../State/State'
import { Template } from '../Template/Template'
import { uuidv4 } from '../uuid/uuid'

export class GlobalStyle {
  private static globalStyles: Record<string, string> = {}
  private static innerHTML = new State('')
  private static template: Template = new Template({
    element: document.getElementById('global-style') as HTMLStyleElement,
    innerHTML: this.innerHTML
  })

  private constructor() {
    return
  }

  static updateInnerHTMLGLobalStyle(): void {
    GlobalStyle.innerHTML.value = Object.values(GlobalStyle.globalStyles).join('\n')
  }

  static createStyleSelector(data: string, name?: string): string {
    const uuid = (name || '') + '_' + uuidv4()
    const text = `.${uuid}{
      ${data}
    }`
    GlobalStyle.globalStyles[uuid] = text
    this.updateInnerHTMLGLobalStyle()
    return uuid
  }
}
