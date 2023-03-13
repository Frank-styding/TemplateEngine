import { State } from "../State";
import { processStyleKey } from "./processStyleKey";
import { StyleStruct } from "./StyleStruct";

export function getStatesAndStyle(
  struct: StyleStruct,
  context: { text: string; statesKeys: string[] },
  classNamePath: string
) {
  const structKeys: string[] = Object.keys(struct);

  context.text += classNamePath + " {\n";

  structKeys.forEach((key) => {
    if (struct[key] == undefined || key == "_") return;
    const value = struct[key];

    if (value instanceof State) {
      context.statesKeys.push(key);
      return;
    }

    context.text += `${processStyleKey(key)}: ${value};\n`;
  });
  context.text += "}\n";

  if (
    structKeys.filter((item) => context.statesKeys.indexOf(item) == -1)
      .length == 0
  ) {
    context.text = "";
  }
}
