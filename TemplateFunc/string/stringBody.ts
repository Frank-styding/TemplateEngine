import { Template } from "../../core/Template/Template";

export function stringBody(res: any, selector: string) {
  if (res != null) return res;
  if (selector != "body") return res;
  return new Template(document.body);
}
