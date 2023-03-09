import { IDynamicStatic } from "../types/IDynamicStatic";
import { dynamicValue } from "../util/dynamicValue";
import { BaseClass } from "./BaseClass";
export class Show extends BaseClass<boolean> {
  data: boolean = false;
  setShow(show: boolean) {
    if (this.template.parent == undefined) return;

    this.data = show;

    if (show) {
      const childs = this.template.parent.childs.filter(
        (item) => item.show || item == this.template
      );

      const idx = childs.indexOf(this.template);

      if (childs.length == 1) {
        this.template.parent.element.appendChild(this.template.element);
        return;
      }

      if (idx == 0) {
        this.template.parent.element.insertBefore(
          this.template.element,
          childs[1].element
        );
        return;
      }

      if (idx == childs.length - 1) {
        this.template.parent.element.appendChild(this.template.element);
        return;
      }
      this.template.parent.element.insertBefore(
        this.template.element,
        childs[idx + 1].element
      );
      return;
    }

    this.template.parent.element.removeChild(this.template.element);
  }

  dynamicShow(show: IDynamicStatic<boolean>) {
    const target = this;
    dynamicValue(show, this.template, {
      deleteValue() {},
      setValue(value) {
        target.setShow(value);
      },
    });
  }
}
