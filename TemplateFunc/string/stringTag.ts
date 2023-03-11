import { Template } from "../../core/Template/Template";

export function stringTag(res: any, selector: string) {
  if (res != null) return res;

  const element = document.createElement(selector.trim());
  if (element == null) {
    throw new Error(`Element not found: ${selector}`);
  }

  return new Template(element);
}
