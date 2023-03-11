import { Template } from "../../core/Template/Template";
import { ISelectorList } from "./IArgAString";
export type TFunc<T> = T extends ISelectorList ? Template[] : Template;
