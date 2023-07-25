import { User } from "./user";
import {Report} from "./report"
export interface Gad{
  name:string,
  code:string,
  city:string,
  country:string,
  size:number,
  admin?:string[]|User[]
  staff?:string[]|User[]
  users?:string[]|User[]
  state:boolean,
  publishAuto?:boolean,
  report?:Report[]
  reportDefault?:Report|String
}
export interface GadID extends Gad{id:string}
