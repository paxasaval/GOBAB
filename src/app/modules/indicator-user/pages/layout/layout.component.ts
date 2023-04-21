import { mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IndicatorID } from 'src/app/models/indicator';
import { DataSlide } from 'src/app/shared/components/semaphore/semaphore.component';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { of } from 'rxjs';
import { SubindicatorID } from 'src/app/models/subindicators';
import { TypeService } from 'src/app/services/type/type.service';
import { TypeID } from 'src/app/models/type';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  title= ''
  indicator!:IndicatorID
  id!:string
  color!:string
  qualification!:number
  lastUpdate!:Date
  subindicators: string[] |SubindicatorID[]=[]
  generalTypes: TypeID[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instanceIndicatorService: IndicatorInstanceService,
    private typeService:TypeService
    ) { }


  fetchTypeMandatory(){
    this.typeService.getTypeByMandatory(true).subscribe(types=>{
      this.generalTypes=types
    }
    )
  }

  ngOnInit(): void {
    this.instanceIndicatorService.getIndicatorInstance().subscribe(res=>console.log(res))
    this.fetchTypeMandatory()
    this.route.params.pipe(
      mergeMap((params:Params)=>{
        this.id=params['id']
        return this.instanceIndicatorService.getIndicatorByID(this.id).pipe(
          mergeMap(indicator=>{
            this.instanceIndicatorService.setIndicatorInstance(indicator)
            //console.log(this.instanceIndicatorService.IndicatorSelected.getValue())
            return of(indicator)
          })
        )
      })
    ).subscribe(indicatorInstance=>{
      this.indicator = indicatorInstance.indicatorID as IndicatorID
      this.title = `${this.indicator.number}. ${this.indicator.name}`
      this.qualification = indicatorInstance.qualification
      this.lastUpdate = indicatorInstance.lastUpdate
      this.subindicators = indicatorInstance.subindicators
    })
  }

}
