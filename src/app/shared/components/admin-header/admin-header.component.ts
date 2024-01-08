import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PeriodID } from 'src/app/models/period';
import { RolID } from 'src/app/models/rol';
import { UserID } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { PeriodService } from 'src/app/services/period/period.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit,AfterViewInit {

  userIsLogged: boolean = false
  imageDefault = '../../../../assets/userDefault.png'
  mail = 'paxasaval1003@gmail.com'
  rol = 'ciudadano'
  user!:UserID
  periods!:PeriodID[]
  numberOfUnreadNotifications:number=0
  searchControl = new FormControl('')
  periodControl = new FormControl('')
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private periodservice: PeriodService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  changePeriod(event:any){

  }
  logOut(){
    this.authService.logout()
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.notificationService.getUnread().subscribe(
      numberOfUnreadNotifications => {
        console.log('actualizando',numberOfUnreadNotifications)
        // Haz algo con el número de notificaciones no leídas (por ejemplo, asignarlo a una variable)
        this.numberOfUnreadNotifications = numberOfUnreadNotifications;
      },
      error => {
        console.error('Error al obtener el número de notificaciones no leídas:', error);
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
      }
    );
    this.authService.loggedIn().then(flag => {
      if (flag) {
        this.userIsLogged = true;
        this.userService.getUserSesion().subscribe(user => {
          if (user.name !== '') {
            this.user = user;
            this.mail = user.mail;
            const rol = user.rol as RolID;
            this.rol = rol.name;
            // Llamada al servicio para obtener el número de notificaciones no leídas
          }
        });
      }
    });
    this.periodservice.getAllPeriod().subscribe(
      periods=>{
        this.periods=periods
        this.periodservice.setPeriodSelected(periods[0])
        this.periodControl.setValue(periods[0])
      }
    )
  }

}
