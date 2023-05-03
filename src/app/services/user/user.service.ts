import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.API_URL}/api/users`
  private userSubject = new BehaviorSubject<User>({
    created:new Date(),
    lastUpdate:new Date(),
    mail:'',
    name:'',
    password:'',
    rol:'',
    state:true
  })
  private user$ = this.userSubject.asObservable()
  constructor(
    private http:HttpClient
  ) { }

  getUserSesion(){
    return this.user$
  }

  setUserSesion(user:User){
    this.userSubject.next(user)
  }
  userById(id:string){
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

}
