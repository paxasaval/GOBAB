import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subindicator, SubindicatorID } from 'src/app/models/subindicators';
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
}
