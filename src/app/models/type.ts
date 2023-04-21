import { CharacteristicID } from "./characteristic";

export interface Type{
  name:string,
  red:string,
  yellow:string,
  green:string,
  mandatory:boolean,
  characteristics:string[] | CharacteristicID[]
}
export interface TypeID extends Type{id:string}
