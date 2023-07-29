import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RolID } from 'src/app/models/rol';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  ADMIN_ROL = 'Administrador'
  RESPONSABLE_ROL = 'Responsable'
  USER_ROL = 'Ciudadano'

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }
  async canActivate(): Promise<boolean> {
    const flag = await this.authService.loggedIn()
    let auth=false
    if(flag){
      this.userService.getUserSesion().subscribe(
        user=>{
          if(user){
            const rol = user.rol as RolID
            if(rol.name===this.ADMIN_ROL || rol.name===this.RESPONSABLE_ROL){
              auth=true
            }
            if(rol.name===this.USER_ROL){
              this.router.navigate(['./user'])
              auth=false
            }
          }
        }
      )
    }
    if(auth){
      return Promise.resolve(auth)
    }else{
      this.router.navigate(['./login'])
      return Promise.resolve(auth)

    }
  }
}
