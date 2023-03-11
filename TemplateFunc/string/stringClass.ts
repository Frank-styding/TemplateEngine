import { Template } from "../../core/Template/Template";

export function stringClass(res: any, selector: string) {
  if (res != null) return res;
  if (!selector.startsWith(".")) return res;

  const element = document.getElementsByClassName(selector.replace(".", ""));
  if (element == null) {
    throw new Error(`Element not found: ${selector}`);
  }

  return Array.from(element).map(
    (_element) => new Template(_element as HTMLElement)
  );
}
