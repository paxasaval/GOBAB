export interface Indicator {
  name: string,
  description:string,
  number:number,
  quadrant:string,
  quadrantName:string,
  red:string,
  yellow:string,
  green:string,
  qualification:number,
  ods:string[]
}
export interface IndicatorID extends Indicator{id:string}
