import { Indicator, IndicatorID } from './../../models/indicator';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {

  private apiUrl = `${environment.API_URL}/api/indicators`

  constructor(
    private http: HttpClient
  ) {

   }
   getIndicatorsByQuadrant(quadrant:string){
      return this.http.get<IndicatorID[]>(`${this.apiUrl}?quadrant=${quadrant}`)
   }
   getAllIndicators(){
    return this.http.get<IndicatorID[]>(`${this.apiUrl}`)
   }
   getIndicatorByQuadrantAndNumber(quadrant:Number,number:Number){
    return this.http.get<IndicatorID>(`${this.apiUrl}/byQuadrantAndNumber?quadrant=${quadrant}&number=${number}`)
   }

}
