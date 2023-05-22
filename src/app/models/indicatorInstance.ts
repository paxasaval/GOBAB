import { GadID } from './gad';
import { UserID } from './user';
import { IndicatorID } from "./indicator";
import { SubindicatorID } from "./subindicators";

export interface IndicatorInstance{
  indicatorID:string | IndicatorID,
  gadID:string|GadID
  qualification:number,
  period:string,
  create:Date,
  lastUpdate:Date,
  year:string,
  createBy:string | UserID,
  subindicators:string[] | SubindicatorID[]
}
export interface IndicatorInstanceID extends IndicatorInstance{id:string}
