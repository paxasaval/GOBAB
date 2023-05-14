import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { PeriodService } from 'src/app/services/period/period.service';

@Component({
  selector: 'app-quadrant-summary',
  templateUrl: './quadrant-summary.component.html',
  styleUrls: ['./quadrant-summary.component.scss']
})
export class QuadrantSummaryComponent implements OnInit {

  indicators: IndicatorInstanceID[] = [];
  subscribe!: Subscription;
  observers: Subscription[] = [];
  id = '1';

  constructor(
    private route: ActivatedRoute,
    private indicatorInstanceService: IndicatorInstanceService,
    private periodService: PeriodService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.id = params['quadrantNumber'];
          this.indicators = [];
          return this.periodService.getPeriodSelected().pipe(
            switchMap((period) => {
              return this.indicatorInstanceService
                .getIndicatorsByPeriodAndQuadrant(period, params['quadrantNumber'])
                .pipe(
                  switchMap((res) => {
                    this.indicators = res;
                    return res;
                  })
                );
            })
          );
        })
      )
      .subscribe((indicator) => {
        //console.log(indicator)
      });
  }

}
