export interface Valuation{
  name:string,
  category:string,
  maxValue:number
}
export interface ValuationID extends Valuation{id:string}
