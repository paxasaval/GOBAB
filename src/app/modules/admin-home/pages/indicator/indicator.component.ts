import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { TypeService } from 'src/app/services/type/type.service';
import { switchMap } from 'rxjs/operators'
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { TitleService } from 'src/app/services/title/title.service';
import { IndicatorID } from 'src/app/models/indicator';
@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnInit {

  id=''
  indicator!:IndicatorInstanceID

  constructor(
    private indicatorInstanceService:IndicatorInstanceService,
    private typeService:TypeService,
    private route:ActivatedRoute,
    private titleService:TitleService
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params=>{
        this.id=params.id
        return this.indicatorInstanceService.getIndicatorByID(this.id)
      })
    ).subscribe(indicator=>{
      this.indicator = indicator
      const indicatorCatalog = indicator.indicatorID as IndicatorID
      this.indicatorInstanceService.setIndicatorInstance(indicator)
      const title =  `${indicatorCatalog.quadrant}.${indicatorCatalog.number} ${indicatorCatalog.name}`
      this.titleService.setTitle(title)
    })
  }

}
