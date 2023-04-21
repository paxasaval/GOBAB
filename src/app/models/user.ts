export interface User{
  name: string,
  mail:string,
  password:string,
  rol:string,
  created:Date,
  lastUpdate:Date,
  state:boolean
}
export interface UserID extends User {id:string}
