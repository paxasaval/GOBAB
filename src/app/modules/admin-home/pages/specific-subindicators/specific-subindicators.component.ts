import { mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubindicatorID } from 'src/app/models/subindicators';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { TitleService } from 'src/app/services/title/title.service';
import { IndicatorID } from 'src/app/models/indicator';

@Component({
  selector: 'app-specific-subindicators',
  templateUrl: './specific-subindicators.component.html',
  styleUrls: ['./specific-subindicators.component.scss']
})
export class SpecificSubindicatorsComponent implements OnInit {

  indicator!:IndicatorInstanceID

  constructor(
    private route: ActivatedRoute,
    private indicatorService:IndicatorInstanceService,
    private titleService:TitleService,
    private subindicatorService:SubindicatorService
  ) { }

  ngOnInit(): void {
    this.indicatorService.getIndicatorInstance().subscribe(
      indicator=>{
        this.indicator=indicator
        const indicatorCatalog = indicator.indicatorID as IndicatorID
        //this.titleService.setTitle([indicatorCatalog.quadrantName,indicatorCatalog.name,'Subindicadores Especificos'])
        this.titleService.setRoute([
          {
            name:indicatorCatalog.quadrantName,
            route:`/admin/quadrant/${indicatorCatalog.quadrant}`
          },
          {
            name:indicatorCatalog.name,
            route:`/admin/quadrant/${indicatorCatalog.quadrant}/indicator/${indicatorCatalog.number}`
          },
          {
            name:'Subindicadores especificos',
            route:`/admin/quadrant/${indicatorCatalog.quadrant}/indicator/${indicatorCatalog.number}/${indicator.id}/Subindicadores-Especificos`
          }
        ])
      }
    )
  }

}
