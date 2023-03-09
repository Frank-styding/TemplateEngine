import { Template } from "../../core/Template/Template";
import { IDynamicStruct } from "../../core/Template/types/IDynamicStruct";
import { IArgAString } from "./IArgAString";

export type IArgA = IDynamicStruct | IArgAString | HTMLElement | Template;
