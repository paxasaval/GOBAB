import { Component, OnInit, Input } from '@angular/core';
import { IndicatorID } from 'src/app/models/indicator';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';

@Component({
  selector: 'app-quadrant-section',
  templateUrl: './quadrant-section.component.html',
  styleUrls: ['./quadrant-section.component.scss']
})
export class QuadrantSectionComponent implements OnInit {

  @Input() quadrantNumber:string = '1'
  quadrantName:string=''
  arrayIndicators:IndicatorID[]=[]

  @Input() style2=false
  constructor(
    private indicatorInstanceService:IndicatorInstanceService,
    private indicatorService:IndicatorsService
  ) { }

  ngOnInit(): void {
    this.indicatorService.getIndicatorsByQuadrant(this.quadrantNumber).subscribe(
      indicators=>{
        this.arrayIndicators=indicators
      }
    )
  }

}
