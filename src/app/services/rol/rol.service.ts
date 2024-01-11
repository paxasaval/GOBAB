  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { RolID } from 'src/app/models/rol';
  import { environment } from 'src/environments/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class RolService {
    private apiUrl = `${environment.API_URL}/api/rols`

    constructor(
      private http:HttpClient
    ) { }

    getAllRol(){
      return this.http.get<RolID[]>(`${this.apiUrl}`)
    }



  }
