export interface Characteristic{
  typeID:string,
  name:string,
  group:string,
  groupName:string,
  required:boolean,
  tier:number,
  unique:boolean
}
export interface CharacteristicID extends Characteristic{id:string}
