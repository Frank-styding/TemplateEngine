import { Template } from "../../core/Template/Template";

export function stringId(res: any, selector: string) {
  if (res != null) return res;
  if (!selector.startsWith("#")) return res;

  const element = document.getElementById(selector.replace("#", ""));
  if (element == null) {
    throw new Error(`Element not found: ${selector}`);
  }

  const template = new Template(element);

  return template;
}
