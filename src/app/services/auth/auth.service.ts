import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';
import { JwtHelperService } from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api`


  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private jwtHelper:JwtHelperService
  ) { }

  login(mail: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { mail: mail, password: password })
  }

  async loggedIn() {
    const userID = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if(userID && token){
      const user = await this.userService.userById(userID).toPromise()
      this.userService.setUserSesion(user)
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
    this.router.navigate(['./'])
  }

}
