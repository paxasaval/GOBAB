import { Type, TypeID } from './../../models/type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiUrl = `${environment.API_URL}/api/type`

  constructor(
    private http: HttpClient
  ) {

   }
   getTypeById(id:string): Observable<TypeID> {
      return this.http.get<TypeID>(`${this.apiUrl}/${id}`)
   }
}
