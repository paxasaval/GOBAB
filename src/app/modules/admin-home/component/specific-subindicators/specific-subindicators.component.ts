import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { SubindicatorID, SubndicatorWithTypeID } from 'src/app/models/subindicators';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';
import { RolID } from 'src/app/models/rol';

@Component({
  selector: 'app-specific-subindicators',
  templateUrl: './specific-subindicators.component.html',
  styleUrls: ['./specific-subindicators.component.scss']
})
export class SpecificSubindicatorsTableComponent implements OnInit {

  specificSubindicators!:SubndicatorWithTypeID[]
  auth=false;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private subindicatorService: SubindicatorService,
    private indicatorInstanceService:IndicatorInstanceService,
    private userService: UserService,

    ) { }

  addSubindicator() {
    this.router.navigate(['add-subindicator'], { relativeTo: this.route })
  }

  deleteSubindicator(id:string){

    this.subindicatorService.deleteSubindicator(id).subscribe(res=>{

    })
  }

  ngOnInit(): void {
    combineLatest([
      this.indicatorInstanceService.getIndicatorInstance(),
      this.userService.getUserSesion()

    ]).pipe(
      switchMap(([indicator,user])=>{
        const rol = user.rol as RolID
        this.auth = (rol.name === (environment.ROL_ADMIN || environment.ROL_RESPONSIBLE));
        if(indicator.id!==''){
          return this.subindicatorService.getSubindicatorSpecificByIndicator(indicator.id,0,10)

        }else{
          return of(null)
        }
      })
    ).subscribe(
      subindicators=>{
        if(subindicators){
          this.specificSubindicators=subindicators.docs as SubndicatorWithTypeID[]

        }

      }
    )

  }

}
