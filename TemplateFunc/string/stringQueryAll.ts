import { Template } from "../../core/Template/Template";

export function stringQueryAll(res: any, selector: string) {
  if (res != null) return res;
  if (!selector.startsWith("qAll:")) return res;

  const element = document.querySelectorAll(selector.replace("qAll:", ""));
  if (element == null) {
    throw new Error(`Element not found: ${selector}`);
  }

  return Array.from(element).map(
    (_element) => new Template(_element as HTMLElement)
  );
}
