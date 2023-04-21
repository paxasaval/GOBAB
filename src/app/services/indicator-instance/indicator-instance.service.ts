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

  IndicatorSelected = new BehaviorSubject<IndicatorInstanceID>({
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
    return this.http.get<IndicatorInstanceID[]>(`${this.apiUrl}?period=${period}&quadrant=${quadrant}`)
  }
  getIndicatorByID(id: string) {
    return this.http.get<IndicatorInstanceID>(`${this.apiUrl}/${id}`)
  }

  getIndicatorInstance(){
    return this.IndicatorSelected.asObservable();
  }

  setIndicatorInstance(indicator:IndicatorInstanceID){
    this.IndicatorSelected.next(indicator)
  }
}
