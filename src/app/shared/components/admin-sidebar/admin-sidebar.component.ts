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

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  user:User|null=null
  userDefault = "../../../../assets/userDefault-2.png"
  rol:RolID={description:'',name:'',id:''}
  arrayIndicadores: IndicatorID[] = []
  gad!:GadID
  quadrant1: IndicatorID[] = []
  quadrant2: IndicatorID[] = []
  quadrant3: IndicatorID[] = []
  quadrant4: IndicatorID[] = []

  arrayQuadrant: IndicatorID[][] = []

  isExpanded = false

  auth=false

  constructor(
    private titleService: TitleService,
    private indicatorService: IndicatorsService,
    private userService:UserService,
    private gadService:GadService
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
    //  console.log(this.arrayQuadrant)
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token')
    const idUser = localStorage.getItem('user')
    this.gadService.getGadSelected().subscribe(
      gad=>{
        this.gad=gad
      }
    )

    this.userService.getUserSesion().subscribe(
      user=>{
        this.user=user
        if(user.name!==''){
          this.rol = this.user?.rol as RolID
          if(this.rol.name===environment.ROL_ADMIN){
            this.auth=true
            console.log('Bienvenido admin')

          }
        }else if(idUser){
          this.userService.userById(idUser).toPromise().then(
            userBD=>{
              this.userService.setUserSesion(userBD)
            }
          )
        }
      }
    )
    this.indicatorService.getAllIndicators().subscribe(
      indicators=>{
        this.arrayIndicadores=indicators
        this.filterQuadrants(indicators)
      }
    )
  }




}
