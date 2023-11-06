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
  isPlanned?:boolean,
  isDiagnosed?:boolean,
  typeID:string | TypeID,
  name: string,
  responsible:string,
  qualification:number,
  created:Date,
  lastUpdate:Date,
  state:boolean,
  commits:string[] | CommitID[],
  evidences:string[] | EvidenceID[],
  extraInfo?:ExtraInfo[]  
}

export interface ExtraInfo{
  clave: string,
  valor: string|string[]
}

export interface SubindicatorID extends Subindicator{
  id:string,
  createdBy:string|User
}
export interface SubindicatorIDWithPagination{
  pagination:Pagination
  docs:SubindicatorID[]
}
export interface SubndicatorWithTypeID extends SubindicatorID{
  typeID:TypeID,
}
