import { Component } from "./Component/Component";

export function render(components: Component | Component[]) {
  if (Array.isArray(components)) {
    components.forEach((components) => components.elementInDom());
    return;
  }

  components.elementInDom();
}
