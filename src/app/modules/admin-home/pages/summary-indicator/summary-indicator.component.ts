import { Component, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { IndicatorID } from 'src/app/models/indicator';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { SubindicatorID } from 'src/app/models/subindicators';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-summary-indicator',
  templateUrl: './summary-indicator.component.html',
  styleUrls: ['./summary-indicator.component.scss']
})
export class SummaryIndicatorComponent implements OnInit {

  title!:string
  indicator!:IndicatorInstanceID
  subscription!:Subscription
  generalSubindicators!:SubindicatorID[]
  specificSubindicators!:SubindicatorID[]
  evidences=0
  constructor(
    private indicatorInstanceService:IndicatorInstanceService,
    private titleService:TitleService
  ) { }

  clasifySuindicators(subindicators:SubindicatorID[]){
    let general:SubindicatorID[]=[]
    let specific:SubindicatorID[]=[]
    this.evidences=0
    subindicators.forEach(s=>{
      this.evidences+=s.evidences.length
      if(s.requireCover){
        specific.push(s)
      }else{
        general.push(s)
      }
    })
    return {general,specific}
  }

  ngOnInit(): void {
    combineLatest([
      this.indicatorInstanceService.getIndicatorInstance(),
    ]).subscribe(
     ([indicator])=>{
        this.indicator=indicator
        const indicatorCatalog = indicator.indicatorID as IndicatorID
        this.title=indicatorCatalog.name
        const subindicators = indicator.subindicators as SubindicatorID[]
        let {general,specific} = this.clasifySuindicators(subindicators)
        this.generalSubindicators=general
        this.specificSubindicators=specific
        this.titleService.setRoute([
          {
            name:indicatorCatalog.quadrantName,
            route:`/admin/quadrant/${indicatorCatalog.quadrant}`
          },
          {
            name:indicatorCatalog.name,
            route:`/admin/quadrant/${indicatorCatalog.quadrant}/indicator/${indicatorCatalog.number}/${indicator.id}`
          },
        ])
      }
    )
  }

}
