import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { JwtHelperService } from '@auth0/angular-jwt'
import { NotificationService } from '../notification/notification.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api`


  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private notificationService:NotificationService,
    private jwtHelper:JwtHelperService
  ) { }

  login(mail: string, password: string) {
    console.log(mail,password)
    return this.http.post<any>(`${this.apiUrl}/login/`, { mail: mail, password: password })
  }

  async loggedIn() {
    const userID = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if(userID && token){
      const user = await this.userService.userById(userID).toPromise()
      const numberNotifications = await this.notificationService.getNumberOfUnreadNoticationsByUser(userID).toPromise()
      this.userService.setUserSesion(user)
      this.notificationService.setUnread(numberNotifications)
      const flag = this.jwtHelper.isTokenExpired(token)
      return Promise.resolve(!flag)
    }else{
      return Promise.resolve(false)
    }

  }
  getToken(){
    return localStorage.getItem(  'token')
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    window.location.reload()
  }

}
