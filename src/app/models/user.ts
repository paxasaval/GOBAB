import { Rol, RolID } from "./rol";

export interface User{
  name: string,
  mail:string,
  password:string,
  rol:string|RolID,
  created:Date,
  lastUpdate:Date,
  state:boolean
}
export interface UserID extends User {id:string}
export interface UserIDwithRolID extends User{
  id:string,
  rol:RolID
}
