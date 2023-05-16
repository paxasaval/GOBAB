import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PeriodID } from 'src/app/models/period';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private periodSelected = new BehaviorSubject<PeriodID>({
    createdBy:'',
    gad:'',
    id:'',
    year:''
  })

  private apiUrl = `${environment.API_URL}/api/period`

  constructor(
    private http:HttpClient
  ) { }

  getAllPeriod(){
    return this.http.get<PeriodID[]>(`${this.apiUrl}`)
  }

  getPeriodSelected(){
    return this.periodSelected.asObservable()
  }
  setPeriodSelected(period:PeriodID){
    this.periodSelected.next(period)
  }
}
