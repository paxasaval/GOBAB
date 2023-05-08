import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolID } from 'src/app/models/rol';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-info-bar',
  templateUrl: './user-info-bar.component.html',
  styleUrls: ['./user-info-bar.component.scss']
})
export class UserInfoBarComponent implements OnInit {

  userIsLogged: boolean = false
  image = '../../../../assets/userDefault.png'
  mail = 'paxasaval1003@gmail.com'
  rol = 'ciudadano'
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.loggedIn().then(
      flag => {
        if (flag) {
          this.userIsLogged = true
          this.userService.getUserSesion().subscribe(
            user => {
              console.log(user)
              if (user.name !== '') {
                this.mail = user.mail
                const rol = user.rol as RolID
                this.rol = rol.name
              }
            }
          )
        }
      }
    )

  }

  loggOut() {
    this.authService.logout()

  }
  loggIn() {
    this.router.navigate(['./login'])
  }
}
