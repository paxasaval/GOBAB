import { catchError, switchMap, tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { GadID } from 'src/app/models/gad';
import { IndicatorID } from 'src/app/models/indicator';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { Rol, RolID } from 'src/app/models/rol';
import { User } from 'src/app/models/user';
import { GadService } from 'src/app/services/gad/gad.service';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { TitleService } from 'src/app/services/title/title.service';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  user: User | null = null
  userDefault = "../../../../assets/userDefault-2.png"
  rol: RolID = { description: '', name: '', id: '' }
  arrayIndicadores: IndicatorID[] = []
  gad!: GadID
  quadrant1: IndicatorID[] = []
  quadrant2: IndicatorID[] = []
  quadrant3: IndicatorID[] = []
  quadrant4: IndicatorID[] = []

  arrayQuadrant: IndicatorID[][] = []
  numberOfUnreadNotifications:number=0
  isExpanded = false

  auth = false

  constructor(
    private titleService: TitleService,
    private indicatorService: IndicatorsService,
    private userService: UserService,
    private gadService: GadService,
    private notificationService:NotificationService
  ) { }

  filterQuadrants(arrayIndicators: IndicatorID[]) {
    this.quadrant1 = []
    this.quadrant2 = []
    this.quadrant3 = []
    this.quadrant4 = []
    this.arrayQuadrant = []
    arrayIndicators.map(indicator => {
      if (indicator.quadrant == 1) {
        this.quadrant1.push(indicator)
      }
      if (indicator.quadrant == 2) {
        this.quadrant2.push(indicator)
      }
      if (indicator.quadrant == 3) {
        this.quadrant3.push(indicator)
      }
      if (indicator.quadrant == 4) {
        this.quadrant4.push(indicator)
      }
    })
    this.arrayQuadrant = [
      this.quadrant1,
      this.quadrant2,
      this.quadrant3,
      this.quadrant4
    ]
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token')
    const idUser = localStorage.getItem('user')
    this.gadService.getGadSelected().subscribe(
      gad => {
        this.gad = gad
      }
    )

    this.userService.getUserSesion().pipe(
      switchMap(user => {
        this.user = user;
        if (user.name !== '') {
          this.rol = this.user?.rol as RolID;
          this.auth = this.rol.name === environment.ROL_ADMIN;
          return this.notificationService.getUnread().pipe(
            tap(result => {
              this.numberOfUnreadNotifications = result;
              // Hacer algo con el resultado si es necesario
            }),
            catchError(error => {
              console.error('Error en getNumberOfUnreadNoticationsByUser:', error);
              return of(null);
            })
          );
        } else if (idUser) {
          return this.userService.userById(idUser).pipe(
            switchMap(userBD => {
              this.userService.setUserSesion(userBD);
              return this.notificationService.getNumberOfUnreadNoticationsByUser(userBD.id).pipe(
                tap(result => {
                  this.numberOfUnreadNotifications = result;
                  // Hacer algo con el resultado si es necesario
                }),
                catchError(error => {
                  console.error('Error en getNumberOfUnreadNoticationsByUser:', error);
                  return of(null);
                })
              );
            }),
            catchError(error => {
              console.error('Error en userById:', error);
              return of(null);
            })
          );
        }
        return of(null); // En caso de que ninguna condición se cumpla, devuelve un observable vacío
      }),
      catchError(error => {
        console.error('Error en getUserSesion:', error);
        return of(null);
      })
    ).subscribe();
    this.indicatorService.getAllIndicators().subscribe(
      indicators => {
        this.arrayIndicadores = indicators
        this.filterQuadrants(indicators)
      }
    )
  }




}
