import { TemplateFunction } from "../../TemplateFunc/TemplateFunc";
import { State } from "../State";
import { Template } from "../Template/Template";
import { IDynamicStaticObject } from "../Template/types/IDynamicStaticObject";
import { getStyleInfo } from "./getStyleInfo";
import { IPath } from "./IPath";
import { IStyleInfo } from "./IStyleInfo";
import { processStyleKey } from "./processStyleKey";
import { StyleStruct } from "./StyleStruct";

export class Css {
  static template = TemplateFunction("style");
  static dynamicTemplate: Record<string, Template> = {};
  static componentInfo: Record<string, IStyleInfo> = {};

  struct?: StyleStruct;
  constructor(public componentId: string) {}
  setStyleStruct(struct: StyleStruct) {
    this.struct = struct;
  }
  memory: Record<string, any> = {};
  getFromPath(path: string): StyleStruct {
    if (this.memory[path]) return this.memory[path];
    if (path == "") return this.struct;
    const split = path.split("/").filter((x) => x.length > 0);
    if (split.length === 1) {
      this.memory[split[0]] = ((this.struct as StyleStruct)._ as StyleStruct)[
        split[0]
      ];
      return this.memory[split[0]];
    }

    const value = split.pop();
    return (
      this.getFromPath(split.join("/"))["_"] as Record<string, StyleStruct>
    )[value as string];
  }

  createStyle(data: IPath) {
    const current = [data];

    while (current.length > 0) {
      const path = current.pop() as IPath;
      if (path.statesKeys) {
        const template = TemplateFunction({
          tag: "style",
          innerHTML: () => {
            return (
              path.className +
              " {\n" +
              path.statesKeys
                ?.map(
                  (item) =>
                    `${processStyleKey(item)}:${(
                      this.getFromPath(path.path.substring(1))[item] as State
                    ).getString()};`
                )
                .join("\n") +
              "\n}"
            );
          },
          watchSates: path.statesKeys.map(
            (item) => this.getFromPath(path.path.substring(1))[item] as State
          ),
        });
        if (Css.dynamicTemplate[path.className] == undefined) {
          Css.dynamicTemplate[path.className] = template;
          TemplateFunction("head", [template]);
        }
      }

      if (path.childs) {
        current.push(...path.childs);
      }
    }
  }

  bind(template: Template, data: IStyleInfo) {
    if (data.path.statesKeys != undefined) {
      const style: IDynamicStaticObject<Record<string, string>> = {};
      for (const statekey of data.path.statesKeys) {
        style[processStyleKey(statekey)] = this.getFromPath(data.path.path)[
          statekey
        ] as State;
      }
      template.style.dynamicStyle(style);
    }

    if (data.path.childs) {
      data.path.childs.forEach((child) => {
        this.createStyle(child);
      });
    }
  }

  use(template: Template) {
    if (!this.struct) return;
    if (Css.componentInfo[this.componentId]) {
      this.bind(template, Css.componentInfo[this.componentId]);
      return;
    }
    const data = getStyleInfo(this.struct, "." + this.componentId);
    template.classList.addClassName(this.componentId);
    Css.template.setInnerHTML(
      Css.template.getInnerHTML() + "\n" + data.staticStyles
    );
    this.bind(template, data);
    Css.componentInfo[this.componentId] = data;
  }
}

if (
  TemplateFunction("head").childs.filter(
    (item) => item.uuid == Css.template.uuid
  ).length == 0
) {
  TemplateFunction("head").addChild(Css.template);
}
