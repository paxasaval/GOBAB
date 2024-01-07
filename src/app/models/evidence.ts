import { CharacteristicID } from "./characteristic";
import { CommitID } from "./commit";
import { Rubric } from "./rubric";
import { ExtraInfo, SubindicatorID } from "./subindicators";
import { UserID } from "./user";

export interface Evidence{
  characteristicID:string | CharacteristicID,
  subIndicatorID:string | SubindicatorID,
  name:string,
  link:string | File,
  note:string,
  verified:boolean,
  qualification?:number,
  qualificationBy?:UserID|String,
  commits?:string[]|CommitID[]
  extras?:ExtraInfo[]
  rubric?:Rubric[]
}
export interface EvidenceID extends Evidence{
  id:string,
  author:string|UserID,
  commits:string[]|CommitID[]
}
