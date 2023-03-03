import { State } from "../../../State";
import { DynamicStaticState } from "../../../types/DynamicStaticState";
import { UpdateFunction } from "../../UpdateFunction";
import { Base } from "./Base";

export class ID extends Base<string | undefined> {
  protected data: string | undefined;
  setId(id: string) {
    if (id == "") {
      return;
    }
    this.data = id;
    this.template.element.id = id;
  }

  setDynamicID(id: DynamicStaticState<string>) {
    if (id instanceof State) {
      this.setId(id.value);
      id.callback = (value) => {
        this.setId(value);
      };
      return;
    }

    if (typeof id === "function") {
      const func = new UpdateFunction<string>((prev) => {
        const _value = id();
        if (prev == _value) return _value;
        this.setId(_value);

        return _value;
      });
      func.call();

      this.template.updateFuncs.push(func);
      return;
    }

    this.setId(id);
  }
}
