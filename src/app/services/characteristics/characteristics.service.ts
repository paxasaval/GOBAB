import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class CharacteristicsService {
  private apiUrl = `${environment.API_URL}/api/characteristics`

  constructor(
    private http: HttpClient
  ) {

   }
   getCharacteristicsByType(type:string): Observable<CharacteristicID[]> {
      return this.http.get<CharacteristicID[]>(`${this.apiUrl}?type=${type  }`)
   }
   getCharacteristicID(id:string): Observable<CharacteristicID> {
    return this.http.get<CharacteristicID>(`${this.apiUrl}/${id}`)
 }
 getValuationByCharacteristicID(id:string): Observable<CharacteristicID> {
  return this.http.get<CharacteristicID>(`${this.apiUrl}/valuation?id=${id}`)
}
}
