import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subindicator, SubindicatorID, SubindicatorIDWithPagination } from 'src/app/models/subindicators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubindicatorService {

   private apiUrl = `${environment.API_URL}/api/subIndicators`

  constructor(
    private http:HttpClient
  ) { }

  addSubindicator(subindicator:Subindicator){
    return this.http.post<SubindicatorID>(`${this.apiUrl}/newSubindicator `,subindicator)
  }

  getAllSubindicators(){
    return this.http.get<SubindicatorID[]>(`${this.apiUrl}/all`)
  }

  getSubindicatorsByPag(page:number, size:number){
    return this.http.get<SubindicatorID[]>(`${this.apiUrl}?page=${page}&size=${size}`)
  }

  getSubindicatorsByIndicator(id:string){
    return this.http.get<SubindicatorID[]>(`${this.apiUrl}/indicator/${id}`)
  }

  getSubindicatorSpecificByIndicator(id:string,page:number, size:number){
    return this.http.get<SubindicatorIDWithPagination>(`${this.apiUrl}/indicator/${id}/subindicatorsSpecific?page=${page}&size=${size}`)
  }

  getSubindicatorByID(id:string){
    return this.http.get<SubindicatorID>(`${this.apiUrl}/${id}`)
  }



}
