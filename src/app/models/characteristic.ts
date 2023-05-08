import { EvidenceID } from "./evidence"

export interface Characteristic{
  name:string,
  group:string,
  groupName:string,
  isRequired:boolean,
  required:boolean,
  tier:number,
  unique:boolean
}
export interface CharacteristicID extends Characteristic{id:string}
export interface CharacteristicWithEvidence{
  characteristic:CharacteristicID
  evidences:EvidenceID[]
}
