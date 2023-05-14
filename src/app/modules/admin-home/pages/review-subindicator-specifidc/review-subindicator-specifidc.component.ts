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

@Component({
  selector: 'app-review-subindicator-specifidc',
  templateUrl: './review-subindicator-specifidc.component.html',
  styleUrls: ['./review-subindicator-specifidc.component.scss']
})
export class ReviewSubindicatorSpecifidcComponent implements OnInit {

  id!:string

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
        return this.subindicatorService.getSubindicatorByID(params['id'])
      })).subscribe(
        subindicator=>{
          const indicator = subindicator.indicadorID as IndicatorInstanceID
          const type = subindicator.typeID as TypeID
          this.indicatorInstanceService.setIndicatorInstance(indicator)
          this.typeService.setTypeSelected(type)
          this.subindicatorService.setSelectedSubindicator(subindicator)
          const indicatorCatalog =indicator.indicatorID as IndicatorID
          this.titleService.setTitle([indicatorCatalog.quadrantName,indicatorCatalog.name,'Subindicadores Especificos',subindicator.name])

        }
      )

  }

}
