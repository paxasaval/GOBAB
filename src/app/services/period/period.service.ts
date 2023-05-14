import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private periodSelected = new BehaviorSubject<string>('')


  constructor() { }

  getPeriodSelected(){
    return this.periodSelected.asObservable()
  }
  setPeriodSelected(period:string){
    this.periodSelected.next(period)
  }
}
