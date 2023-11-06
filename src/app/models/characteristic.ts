import { Evidence, EvidenceID } from "./evidence"
import { Valuation, ValuationID } from "./valuation"

export interface Characteristic{
  name:string,
  group:string,
  groupName:string,
  help?:string,
  type?:number,
  format?:string,
  isRequired:boolean,
  required:boolean,
  score?:number,
  tier:number,
  unique:boolean,
  allowed_formats:string[]
  extras?:any
  valuation?:ValuationID[]
}
export interface CharacteristicID extends Characteristic{id:string}
export interface CharacteristicWithEvidence{
  characteristic:CharacteristicID
  evidences:EvidenceID[] | Evidence[]
}
export interface CharacteristicWithEvidenceID{
  characteristic:CharacteristicID
  evidences:EvidenceID[]
}
