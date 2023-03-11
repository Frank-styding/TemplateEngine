import { Template } from "../../core/Template/Template";

export function stringHead(res: any, selector: string) {
  if (res != null) return res;
  if (selector != "head") return res;
  return new Template(document.head);
}
