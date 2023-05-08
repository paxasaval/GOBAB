import { CharacteristicID } from "./characteristic";
import { SubindicatorID } from "./subindicators";

export interface Evidence{
  characteristicID:string | CharacteristicID,
  subIndicatorID:string | SubindicatorID,
  name:string,
  link:string | File,
  note:string,
  verified:boolean
}
export interface EvidenceID extends Evidence{id:string}
