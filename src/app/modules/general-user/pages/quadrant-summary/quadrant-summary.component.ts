import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
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
    private router: Router,
    private indicatorInstanceService: IndicatorInstanceService,
    private periodService: PeriodService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.id = params['quadrantNumber']; // Parse as number
        this.indicators = [];
        return this.handleIndicators(params);
      }),
      catchError((error) => {
        console.log('Error al obtener los parámetros de la ruta', error);
        return EMPTY;
      })
    ).subscribe(
      (res) => {
        // Handle the result if needed
      },
      (error) => {
        console.log('Error al traer los subindicadores', error);
      }
    );
  }

  private handleIndicators(params: Params) {
    return this.periodService.getPeriodSelected().pipe(
      switchMap((period) => {
        if (period.id) {
          return this.indicatorInstanceService.getIndicatorsByPeriodAndQuadrant(period.id, params['quadrantNumber'])
            .pipe(
              switchMap((res) => {
                this.indicators = res;
                console.log(this.indicators);
                return res;
              }),
              catchError((error) => {
                console.log('Error al obtener los indicadores por período y cuadrante', error);
                return EMPTY;
              })
            );
        } else {
          return this.indicatorInstanceService.getIndicatorInstance()
            .pipe(
              catchError((error) => {
                console.log('Error al obtener la instancia del indicador', error);
                return EMPTY;
              })
            );
        }
      }),
      catchError((error) => {
        console.log('Error al obtener el período seleccionado', error);
        return EMPTY;
      })
    );
  }
}
