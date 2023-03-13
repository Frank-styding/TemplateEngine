import { StyleStruct } from "./StyleStruct";
import { structData } from "./structData";
import { IPath } from "./IPath";
import { IStyleInfo } from "./IStyleInfo";
import { getStatesAndStyle } from "./getStatesAndStyle";
export function getStyleInfo(
  struct: StyleStruct,
  classNamePath: string,
  context: structData = {
    staticStyles: [],
  },
  path: IPath = { name: "", path: "", className: "" }
): IStyleInfo {
  const subContext: { text: string; statesKeys: string[] } = {
    text: "",
    statesKeys: [],
  };
  getStatesAndStyle(struct, subContext, classNamePath);

  const dynamicStyle: string[] = [];

  if (subContext.text.length > 0) {
    dynamicStyle.push(subContext.text);
    context.staticStyles.push(...dynamicStyle);
  }

  if (subContext.statesKeys.length > 0) {
    path.statesKeys = subContext.statesKeys;
  }

  path.className = classNamePath;

  const subStruct = struct["_"];
  if (!subStruct) return { path, staticStyles: context.staticStyles.join("") };

  const childs: IPath[] = [];

  Object.keys(subStruct).forEach((key) => {
    const aux = key
      .replace(/\$\_/g, "-")
      .replace(/\$/g, "> ")
      .replace(/__/g, " #")
      .replace(/_/g, " .");

    const subPath: IPath = {
      name: key,
      className: classNamePath + " " + aux,
      path: path.path + "/" + aux,
    };
    getStyleInfo(subStruct[key], classNamePath + " " + aux, context, subPath);
    if (subPath.statesKeys) {
      childs.push(subPath);
    }
  });

  if (childs.length > 0) {
    path.childs = childs;
  }

  return { path, staticStyles: context.staticStyles.join("") };
}
