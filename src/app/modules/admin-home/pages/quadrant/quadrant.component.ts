import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/services/title/title.service';
import { catchError, switchMap } from 'rxjs/operators'
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { IndicatorID } from 'src/app/models/indicator';
import { PeriodService } from 'src/app/services/period/period.service';
import { of, throwError } from 'rxjs'

export interface Data {
  date: Date,
  numberIndicator: number,
  subindicadorName: string,
  responsible: string,
  numberEvidences: number,
  numberCharacteristics: number
  state: number
}

@Component({
  selector: 'app-quadrant',
  templateUrl: './quadrant.component.html',
  styleUrls: ['./quadrant.component.scss']
})
export class QuadrantComponent implements OnInit {

  id!: string
  data: Data[] = [
    {
      date: new Date(),
      numberIndicator: 1,
      subindicadorName: '1. Instancia Responsable',
      responsible: 'Paul X. Sanchez  V',
      numberEvidences: 75,
      numberCharacteristics: 80,
      state: 1
    },
    {
      date: new Date(),
      numberIndicator: 1,
      subindicadorName: '1. Instancia Responsable',
      responsible: 'Paul X. Sanchez  V',
      numberEvidences: 75,
      numberCharacteristics: 80,
      state: 1
    }
  ]
  indicators: IndicatorInstanceID[] = []

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute,
    private indicatorInstanceService: IndicatorInstanceService,
    private periodService: PeriodService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.id = params.id //quadrantNumber
        //console.log(this.id)
        this.indicators = []
        return this.periodService.getPeriodSelected().pipe(
          switchMap(period => {
            if (period.id !== '') {
              return this.indicatorInstanceService.getIndicatorsByPeriodAndQuadrant(period.id, params.id)

            } else {
              const array: IndicatorInstanceID[] = []
              return of(array)
            }
          })
        )
      })
    ).subscribe(arrayIndicatorInstances => {
      if (arrayIndicatorInstances.length>0) {
        this.indicators = arrayIndicatorInstances
        const indicatorCatalogo = this.indicators[0].indicatorID as IndicatorID
        //this.titleService.setTitle([indicatorCatalogo.quadrantName])
        this.titleService.setRoute([
          {
            name: indicatorCatalogo.quadrantName,
            route: `admin/quadrant/${indicatorCatalogo.quadrant}`
          }
        ])
      }

    }
    )
  }

}
