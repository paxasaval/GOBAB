import { Component, OnInit } from '@angular/core';
import { Type, TypeID } from '../../../../models/type';
import { TypeService } from 'src/app/services/type/type.service';
interface routeType{
  type:TypeID,
  route:string
}
@Component({
  selector: 'app-navbar-indicators',
  templateUrl: './navbar-indicators.component.html',
  styleUrls: ['./navbar-indicators.component.scss']
})
export class NavbarIndicatorsComponent implements OnInit {

  generalSubIndicators:TypeID[] = []
  routes:routeType[]=[]

  constructor(
    private typeService:TypeService,

    ) { }

  ngOnInit(): void {
    this.typeService.getTypeByMandatory(true).subscribe(types=>{
      this.generalSubIndicators=types
      this.routes = types.map(type=>{
        let route = type.name.replace(' ','-')  
        console.log(route)
        return {type:type,route:route}
      })
    })
  }

}
