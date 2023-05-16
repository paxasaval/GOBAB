import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subindicator, SubindicatorID, SubindicatorIDWithPagination } from 'src/app/models/subindicators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubindicatorService {

  private apiUrl = `${environment.API_URL}/api/subIndicators`

  private subindicatorSelected = new BehaviorSubject<SubindicatorID>({
    indicadorID: '',
    typeID: '',
    name: '',
    responsible: '',
    qualification: 0,
    created: new Date(),
    lastUpdate: new Date(),
    state: false,
    createdBy: '',
    commits: [],
    evidences: [],
    id: ''
  })

  constructor(
    private http: HttpClient
  ) { }

  getSelectedSubindicator() {
    return this.subindicatorSelected.asObservable()
  }
  getSelectObserverSubindicator() {
    if (this.subindicatorSelected.value.id !== '') {

      const subindicatorObserver = this.getSubindicatorByID(this.subindicatorSelected.value.id)
      return subindicatorObserver
    }
    return this.subindicatorSelected.asObservable()

  }
  setSelectedSubindicator(subindicator: SubindicatorID) {
    this.subindicatorSelected.next(subindicator)
  }

  addSubindicator(subindicator: Subindicator) {
    return this.http.post<SubindicatorID>(`${this.apiUrl}/newSubindicator `, subindicator)
  }

  getAllSubindicators() {
    return this.http.get<SubindicatorID[]>(`${this.apiUrl}/all`)
  }

  getSubindicatorsByPag(page: number, size: number) {
    return this.http.get<SubindicatorID[]>(`${this.apiUrl}?page=${page}&size=${size}`)
  }

  getSubindicatorsByIndicator(id: string) {
    return this.http.get<SubindicatorID[]>(`${this.apiUrl}/indicator/${id}`)
  }

  getSubindicatorGeneralByIndicator(id: string) {
    return this.http.get<SubindicatorID[]>(`${this.apiUrl}/indicator/${id}/generalSubindicators`)
  }

  getSubindicatorSpecificByIndicator(id: string, page: number, size: number) {
    return this.http.get<SubindicatorIDWithPagination>(`${this.apiUrl}/indicator/${id}/subindicatorsSpecific?page=${page}&size=${size}`)
  }

  getSubindicatorByID(id: string) {
    return this.http.get<SubindicatorID>(`${this.apiUrl}/${id}`)
  }

  getSubindicatorByIndicatorIDandTypeID(indicatorID: string, typeID: string) {
    return this.http.get<SubindicatorID>(`${this.apiUrl}/indicator/${indicatorID}/type/${typeID}`)
  }


}
