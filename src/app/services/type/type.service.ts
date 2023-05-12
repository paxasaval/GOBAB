
import { Type, TypeID } from './../../models/type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiUrl = `${environment.API_URL}/api/type`
  private typeSelected = new BehaviorSubject<TypeID>({
    name: '',
    red: '',
    yellow: '',
    green: '',
    mandatory: false,
    characteristics: [],
    id:''
  })
  constructor(
    private http: HttpClient
  ) {}

  setTypeSelected(type:TypeID){
    this.typeSelected.next(type)
  }
  getTypeSelected(){
    return this.typeSelected.asObservable()
  }
  getTypeById(id: string): Observable<TypeID> {
    return this.http.get<TypeID>(`${this.apiUrl}/${id}`)
  }
  getTypeByMandatory(mandatory: boolean) {
    return this.http.get<TypeID[]>(`${this.apiUrl}?mandatory=${mandatory}`)

  }
}
