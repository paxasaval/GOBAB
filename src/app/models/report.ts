export interface Info{
  label:string,
  data:string
}
export interface Report{
  info:Info[]
  source:string,
  period:string
}
export interface ReportID extends Report{_id:string}
