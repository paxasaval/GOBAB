import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IndicatorID } from 'src/app/models/indicator';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { PeriodService } from 'src/app/services/period/period.service';

@Component({
  selector: 'app-layout-indicator',
  templateUrl: './layout-indicator.component.html',
  styleUrls: ['./layout-indicator.component.scss']
})
export class LayoutIndicatorComponent implements OnInit {

  indicatorInstance!: IndicatorInstanceID

  constructor(
    private route: ActivatedRoute,
    private indicatorInstanceService: IndicatorInstanceService,
    private indicatorService: IndicatorsService,
    private periodService: PeriodService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const quadrant = params['quadrantNumber']
        const number = params['number']
        return this.indicatorService.getIndicatorByQuadrantAndNumber(quadrant, number).pipe(
          switchMap(indicator => {
            return this.periodService.getPeriodSelected().pipe(
              switchMap(period => {
                return this.indicatorInstanceService.getIndicatorByIndicatorIDandPeriod(indicator.id, period)
              })
            )
          })
        )
      })
    ).subscribe(
      indicatorInstance => {
        this.indicatorInstance = indicatorInstance
        this.indicatorInstanceService.setIndicatorInstance(indicatorInstance)
        if (this.indicatorInstance) {
          const indicatorCatalog = this.indicatorInstance.indicatorID as IndicatorID
          this.router.navigateByUrl(`admin/quadrant/${indicatorCatalog.quadrant}/indicator/${indicatorCatalog.number}/${indicatorInstance.id}`)
        }
      }
    )
  }
}
