import { Gad } from "./gad";
import { User } from "./user";

export interface Period{
  year:string,
  gad:string|Gad
  createdBy:string|User
}
export interface PeriodID extends Period{id:string}
