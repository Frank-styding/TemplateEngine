import { Template } from "../../core/Template/Template";
export function stringQuery(res: any, selector: string) {
  if (res != null) return res;
  if (!selector.startsWith("q:")) return res;

  const element = document.querySelector(selector.replace("q:", ""));
  if (element == null) {
    throw new Error(`Element not found: ${selector}`);
  }

  return new Template(element as HTMLElement);
}
