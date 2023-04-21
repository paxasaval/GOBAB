import { UserID } from './user';
export interface Commit{
  autor:string | UserID,
  body:string,
  created:Date,
  lastUpdate:Date
}
export interface CommitID extends Commit{id:string}
