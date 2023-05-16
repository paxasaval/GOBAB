import { Evidence, EvidenceID } from "./evidence"

export interface Characteristic{
  name:string,
  group:string,
  groupName:string,
  help?:string
  isRequired:boolean,
  required:boolean,
  score?:number,
  tier:number,
  unique:boolean,
  allowed_formats:string[]
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
