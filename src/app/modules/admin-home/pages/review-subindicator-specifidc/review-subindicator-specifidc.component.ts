import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { TypeService } from 'src/app/services/type/type.service';
import { switchMap } from 'rxjs/operators';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { TypeID } from 'src/app/models/type';
import { TitleService } from 'src/app/services/title/title.service';
import { IndicatorID } from 'src/app/models/indicator';
import { SubindicatorID } from 'src/app/models/subindicators';

@Component({
  selector: 'app-review-subindicator-specifidc',
  templateUrl: './review-subindicator-specifidc.component.html',
  styleUrls: ['./review-subindicator-specifidc.component.scss']
})
export class ReviewSubindicatorSpecifidcComponent implements OnInit {

  id!:string
  subindicator!:SubindicatorID
  constructor(
    private route: ActivatedRoute,
    private subindicatorService:SubindicatorService,
    private indicatorInstanceService:IndicatorInstanceService,
    private typeService:TypeService,
    private titleService:TitleService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params=>{
        return this.subindicatorService.getSubindicatorByID(params['id']).pipe(
          switchMap(subindicator=>{
            this.subindicator=subindicator
            const indicatorID = subindicator.indicadorID as IndicatorInstanceID
            const type = subindicator.typeID as TypeID
            this.typeService.setTypeSelected(type)
            this.subindicatorService.setSelectedSubindicator(subindicator)
            return this.indicatorInstanceService.getIndicatorByID(indicatorID.id)
          })
        )
      })).subscribe(
        indicator=>{
          this.indicatorInstanceService.setIndicatorInstance(indicator)
          const indicatorCatalog =indicator.indicatorID as IndicatorID
          //this.titleService.setTitle([indicatorCatalog.quadrantName,indicatorCatalog.name,'Subindicadores Especificos',this.subindicator.name])
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
            },
            {
              name:this.subindicator.name,
              route:this.subindicator.id
            }
          ])
        }
      )

  }

}
