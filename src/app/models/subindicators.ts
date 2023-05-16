import { CommitID } from "./commit";
import { EvidenceID } from "./evidence";
import { IndicatorInstanceID } from "./indicatorInstance";
import { Pagination } from "./pagination";
import { TypeID } from "./type";
import { User } from "./user";

export interface Subindicator{
  indicadorID:string | IndicatorInstanceID,
  requireCover?:boolean,
  cover?:string,
  observationCover?:string,
  typeID:string | TypeID,
  name: string,
  responsible:string,
  qualification:number,
  created:Date,
  lastUpdate:Date,
  state:boolean,
  commits:string[] | CommitID[],
  evidences:string[] | EvidenceID[]
}
export interface SubindicatorID extends Subindicator{
  id:string,
  createdBy:string|User
}
export interface SubindicatorIDWithPagination{
  pagination:Pagination
  docs:SubindicatorID[]
}
