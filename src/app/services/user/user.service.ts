import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserID } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.API_URL}/api/users`
  private userSubject = new BehaviorSubject<UserID>({
    created:new Date(),
    lastUpdate:new Date(),
    mail:'',
    name:'',
    password:'',
    rol:'',
    state:true,
    id:''
  })
  private user$ = this.userSubject.asObservable()
  constructor(
    private http:HttpClient
  ) { }

  getUserSesion(){
    return this.user$
  }

  setUserSesion(user:UserID){
    this.userSubject.next(user)
  }
  userById(id:string){
    return this.http.get<UserID>(`${this.apiUrl}/${id}`)
  }

}
