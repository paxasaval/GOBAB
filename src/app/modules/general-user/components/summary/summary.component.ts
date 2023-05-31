import { switchMap, map, concatMap } from 'rxjs/operators';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { from } from 'rxjs';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnChanges {

  @Input() indicators: IndicatorInstanceID[] = []

  evaluated = 9
  totalIndicators = 10

  totalEvidences = 210

  evaluatedSub = 75
  totalSubindicators = 100

  red = 10
  yellow = 20
  green = 30
  grey = 40



  constructor(
    private subindicatorService: SubindicatorService,
    private evidenceService: EvidenceService

  ) { }

  getSubindicators() {
    if (this.indicators) {
      this.totalSubindicators = 0
      this.evaluatedSub = 0
      this.red = 0
      this.yellow = 0
      this.green = 0
      this.grey = 0
      this.totalEvidences=0
      from(this.indicators).pipe(
        concatMap(i => {
          const indicator:IndicatorInstanceID = i
          const j = i as any
          indicator.id = j._id
          console.log(indicator)
          return this.subindicatorService.getAllSubindicatorsByIndicator(indicator.id )
        })
      ).pipe(
        concatMap(subindicators => {
          subindicators.forEach(sub => {
            this.totalSubindicators += 1
            if (sub.qualification == 0) {
              this.grey += 1
            }
            if (sub.qualification>0){
              this.evaluatedSub+=1
            }
            if (sub.qualification == 1) {
              this.red += 1
            }
            if (sub.qualification == 2) {
              this.yellow += 1
            }
            if (sub.qualification == 3) {
              this.green += 1
            }
          })
          return from(subindicators)
        })
      )
      .pipe(
        concatMap(subindicator=>{
          return this.evidenceService.getEvidencesBySubindicatorID(subindicator.id)
        })
      )
      .subscribe(evidences=>{
        this.totalEvidences+=evidences.length
      })
    }


  }

  getIndicatorsEvaluated() {
    this.totalIndicators = this.indicators.length
    this.evaluated = 0
    this.indicators.forEach(indicator => {
      if (indicator.qualification > 0) {
        this.evaluated += 1
      }
    })
  }
  ngOnChanges(simpleChanges: SimpleChanges) {
    this.getIndicatorsEvaluated()
    if (this.indicators) {
      this.getSubindicators()

    }
  }

  ngOnInit(): void {
  }

}
