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

  getAllUsers(){
    return this.http.get<UserID[]>(`${this.apiUrl}`)
  }

  newUser(name:string,mail:string,rol:string,pass:string){
    return this.http.post(`${this.apiUrl}/signUp`,{name,mail,rol,password:pass})
  }

  editUser(id:string,name:string,mail:string,rol:string,pass:string){
    return this.http.put(`${this.apiUrl}/${id}`,{name,mail,rol,password:pass})

  }
  deleteUser(id:string){
    console.log(id)
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
