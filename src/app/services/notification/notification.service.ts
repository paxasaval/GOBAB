import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationsID } from 'src/app/models/notifications';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = `${environment.API_URL}/api/notifications`

  private unreadNotifications = new BehaviorSubject<number>(0)
  private unreadNotifications$ = this.unreadNotifications.asObservable()
  constructor(
    private http:HttpClient
  ) { }

  getUnread(){
    return this.unreadNotifications$
  }

  setUnread(numberUnread:number){
    this.unreadNotifications.next(numberUnread)
  }

  getAllNoticationByUser(userID:string){
    return this.http.get<NotificationsID[]>(`${this.apiUrl}/allMyNotify?userID=${userID}`)
  }
  getNumberOfUnreadNoticationsByUser(userID:string){
    return this.http.get<number>(`${this.apiUrl}/numOfUnreadNotify?userID=${userID}`)
  }
  getUnreadNoticationByUser(userID:string){
    return this.http.get<NotificationsID[]>(`${this.apiUrl}/unreadNotify?userID=${userID}`)
  }
  readNotify(notificationID:string){
    return this.http.put<NotificationsID>(`${this.apiUrl}/checkNotify`,{id:notificationID})
  }
  unreadNotify(notificationID:string){
    return this.http.put<NotificationsID>(`${this.apiUrl}/uncheckNotify`,{id:notificationID})

  }
}
