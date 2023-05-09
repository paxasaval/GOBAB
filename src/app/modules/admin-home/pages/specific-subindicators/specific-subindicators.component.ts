import { mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubindicatorID } from 'src/app/models/subindicators';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';

@Component({
  selector: 'app-specific-subindicators',
  templateUrl: './specific-subindicators.component.html',
  styleUrls: ['./specific-subindicators.component.scss']
})
export class SpecificSubindicatorsComponent implements OnInit {

  indicator!:IndicatorInstanceID

  constructor(
    private route: ActivatedRoute,
    private indicatorService:IndicatorInstanceService
  ) { }

  ngOnInit(): void {
    this.indicatorService.getIndicatorInstance().subscribe(
      indicator=>{
        this.indicator=indicator
      }
    )
  }

}
