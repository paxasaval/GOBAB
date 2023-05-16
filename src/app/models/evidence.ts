import { CharacteristicID } from "./characteristic";
import { CommitID } from "./commit";
import { SubindicatorID } from "./subindicators";
import { UserID } from "./user";

export interface Evidence{
  characteristicID:string | CharacteristicID,
  subIndicatorID:string | SubindicatorID,
  name:string,
  link:string | File,
  note:string,
  verified:boolean,
  qualification?:number,
  commits?:string[]|CommitID[]
}
export interface EvidenceID extends Evidence{
  id:string,
  author:string|UserID,
  commits:string[]|CommitID[]
}
