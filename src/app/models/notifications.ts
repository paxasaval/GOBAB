import { EvidenceID } from "./evidence";
import { IndicatorInstanceID } from "./indicatorInstance";
import { SubindicatorID } from "./subindicators";
import { UserID } from "./user";

export interface Notifications{
  type:number,
  from:UserID|string,
  sendTo:UserID|string,
  content:string,
  itemType:number,
  itemID:IndicatorInstanceID|SubindicatorID|EvidenceID|string,
  date:Date,
  state:number
}
export interface NotificationsID extends Notifications{id:string}
