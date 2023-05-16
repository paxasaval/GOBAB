import { User } from "./user";

export interface Gad{
  name:string,
  code:string,
  city:string,
  country:string,
  size:number,
  admin?:string[]|User[]
  staff?:string[]|User[]
  users?:string[]|User[]
  state:boolean
}
export interface GadID extends Gad{id:string}
