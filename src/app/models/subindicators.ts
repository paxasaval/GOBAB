import { CommitID } from "./commit";
import { EvidenceID } from "./evidence";
import { IndicatorID } from "./indicator";
import { TypeID } from "./type";
import { User } from "./user";

export interface Subindicator{
  indicadorID:string | IndicatorID,
  typeID:string | TypeID,
  name: string,
  responsible:string,
  qualification:number,
  created:Date,
  lastUpdate:Date,
  createdBy:string|User
  commits:string[] | CommitID[],
  evidences:string[] | EvidenceID[]
}
export interface SubindicatorID extends Subindicator{id:string}
