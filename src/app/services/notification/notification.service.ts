import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsID } from 'src/app/models/notifications';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = `${environment.API_URL}/api/notifications`


  constructor(
    private http:HttpClient
  ) { }

  getAllNoticationByUser(userID:string){
    return this.http.get<NotificationsID[]>(`${this.apiUrl}?userID=${userID}`)

  }
}
