import { IArgAString } from "../types/IArgAString";
import { IArgB } from "../types/IArgB";
import { Template } from "../../core/Template/Template";
import { IEventFunc } from "../../core/Template/types/IEventFunc";

function macthAttribute(text: string, regex: RegExp, replace: string) {
  const macth = text.match(regex);
  if (macth == null) return;
  return macth[0].replace(replace, "");
}

export function stringAttributes(
  template: Template,
  argA: string,
  argB: IArgB<IArgAString>
) {
  const attriburesMacth = argA.match(/\((.|)+\)/g);
  const eventsMacth = argA.match(/\[(.|)+\]/g);

  if (attriburesMacth) {
    const attri = attriburesMacth[0].replace(/\(|\)/g, "");

    const id = macthAttribute(attri, /id=[a-zA-Z0-9_]+/g, "id=");
    if (id) template.id.setId(id);

    const className = macthAttribute(attri, /class=[a-zA-Z0-9_/]+/g, "class=");
    if (className) template.classList.addClassList(className.split("/"));

    const innerHTML = macthAttribute(attri, /&=[a-zA-Z0-9_]+/g, "&=");
    if (innerHTML) template.setInnerHTML(innerHTML);
  }

  if (eventsMacth && !argA.startsWith("[")) {
    const events = eventsMacth[0].replace(/\[|\]/g, "").split(",");

    if (
      Array.isArray(argB) &&
      argB.length > 0 &&
      typeof argB[0] == "function"
    ) {
      argB.forEach((item, idx) => {
        template.events.addEvent(
          events[idx] as keyof (HTMLElementEventMap & SVGElementEventMap),
          item as IEventFunc<keyof (HTMLElementEventMap & SVGElementEventMap)>
        );
      });
    }

    if (typeof argB == "function") {
      template.events.addEvent(
        events[0] as keyof (HTMLElementEventMap & SVGElementEventMap),
        argB
      );
    }
  }
}
