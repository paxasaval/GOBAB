import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RolID } from 'src/app/models/rol';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  userIsLogged: boolean = false
  imageDefault = '../../../../assets/userDefault.png'
  mail = 'paxasaval1003@gmail.com'
  rol = 'ciudadano'

  searchControl = new FormControl('')

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

}
