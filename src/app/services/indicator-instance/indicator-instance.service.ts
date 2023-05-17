import { PeriodID } from './../../models/period';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndicatorInstance, IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicatorInstanceService {

  private apiUrl = `${environment.API_URL}/api/indicatorsInstance`

  private IndicatorSelected = new BehaviorSubject<IndicatorInstanceID>({
    id:'',
    create:new Date(),
    createBy:'',
    indicatorID:'',
    lastUpdate:new Date(),
    period: '',
    qualification: 0,
    subindicators: []
  })

  constructor(
    private http: HttpClient
  ) {

  }
  getIndicatorsByPeriod(period: string) {
    return this.http.get<IndicatorInstanceID[]>(`${this.apiUrl}?period=${period}`)
  }
  getIndicatorsByPeriodAndQuadrant(period: string, quadrant: string) {
    return this.http.get<IndicatorInstanceID[]>(`${this.apiUrl}/byQuadrantAndPeriod?period=${period}&quadrant=${quadrant}`)
  }
  getIndicatorByID(id: string) {
    return this.http.get<IndicatorInstanceID>(`${this.apiUrl}/${id}`)
  }

  getIndicatorInstance(){
    return this.IndicatorSelected.asObservable();
  }
  getIndicatorByIndicatorIDandPeriod(indicatorID:string,period:PeriodID){
    return this.http.get<IndicatorInstanceID>(`${this.apiUrl}/byIndicatorIDAndPeriod?indicatorID=${indicatorID}&period=${period.id} `)
  }
  setIndicatorInstance(indicator:IndicatorInstanceID){
    console.log(indicator)
    this.IndicatorSelected.next(indicator)
  }
}
