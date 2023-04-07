export interface Evidence{
  characteristicID:string,
  subIndicatorID:string,
  name:string,
  link:string,
  note:string,
  verified:string
}
export interface EvidenceID extends Evidence{id:string}
