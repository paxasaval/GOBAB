import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IndicatorID } from 'src/app/models/indicator';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { SubindicatorID } from 'src/app/models/subindicators';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-indicator-summary',
  templateUrl: './indicator-summary.component.html',
  styleUrls: ['./indicator-summary.component.scss']
})
export class IndicatorSummaryComponent implements OnInit {

  indicator!:IndicatorInstanceID
  indicatorCatalog!:IndicatorID
  generalidades:SubindicatorID[]=[]
  specifics:SubindicatorID[]=[]
  constructor(
    private titleService:TitleService,
    private indicatorInstanceService:IndicatorInstanceService,
    private subindicatorService:SubindicatorService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params=>{
        return this.indicatorInstanceService.getIndicatorByID(params['id']).pipe(
          switchMap(indicatorInstance=>{
            this.indicator=indicatorInstance
            this.indicatorCatalog = indicatorInstance.indicatorID as IndicatorID
            this.indicatorInstanceService.setIndicatorInstance(indicatorInstance)
            return this.subindicatorService.getSubindicatorGeneralByIndicator(indicatorInstance.id)
          })
        ).pipe(
          switchMap(subindicators=>{
            this.titleService.setRoute([
              {
                name:this.indicatorCatalog.quadrantName,
                route:`/user/quadrant/${this.indicatorCatalog.quadrant}`
              },
              {
                name:this.indicatorCatalog.name,
                route:`/user/quadrant/${this.indicatorCatalog.quadrant}/indicator/${this.indicatorCatalog.number}`
              }
            ])
            this.generalidades = subindicators
            //return this.subindicatorService.getOWL('Book')
            return this.subindicatorService.getSubindicatorSpecificByIndicator(this.indicator.id,0,10)
          })
        )
      })
    ).subscribe(data=>{
      if(data){
        this.specifics = data.docs
        //console.log(this.specifics)
      }

    })

  }

}
