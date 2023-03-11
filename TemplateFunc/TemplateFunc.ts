import { IDynamicStruct } from "../core/Template/types/IDynamicStruct";
import { IArgA } from "./types/IArgA";
import { IArgAString } from "./types/IArgAString";
import { IArgB } from "./types/IArgB";
import { IArgC } from "./types/IArgC";
import { funcStruct } from "./funcStruct";
import { funcHTML } from "./funcHTML";
import { funcString } from "./string/funcString";
import { funcTemplate } from "./funcTemplate";
import { Template } from "../core/Template/Template";
import { TFunc } from "./types/ITemplateFunction";

export function TemplateFunction<T extends IArgA>(
  argA: T,
  argB?: IArgB<T>,
  argC?: IArgC<T>
): TFunc<T> {
  let res: any = null;

  res = funcString(
    res,
    argA,
    argB as IArgB<IArgAString>,
    argC as IArgC<IArgAString>
  );

  res = funcHTML(
    res,
    argA,
    argB as IArgB<HTMLElement>,
    argC as IArgC<HTMLElement>
  );

  res = funcTemplate(
    res,
    argA,
    argB as IArgB<Template>,
    argC as IArgC<Template>
  );

  res = funcStruct(
    res,
    argA,
    argB as IArgB<IDynamicStruct>,
    argC as IArgC<IDynamicStruct>
  );

  return res;
}
