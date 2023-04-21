import { OdsID } from "./ods";

export interface Indicator {
  name: string,
  description:string,
  number:number,
  quadrant:string,
  quadrantName:string,
  red:string,
  yellow:string,
  green:string,
  ods:string[] | OdsID[]
}
export interface IndicatorID extends Indicator{id:string}
