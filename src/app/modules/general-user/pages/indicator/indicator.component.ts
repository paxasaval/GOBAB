import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { IndicatorID } from 'src/app/models/indicator';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { PeriodService } from 'src/app/services/period/period.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnInit, AfterViewInit,OnDestroy {

  indicatorInstance!: IndicatorInstanceID
  subscribe!:Subscription
  constructor(
    private route: ActivatedRoute,
    private indicatorInstanceService: IndicatorInstanceService,
    private indicatorService: IndicatorsService,
    private periodService: PeriodService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
      if(this.subscribe){
        this.subscribe.unsubscribe()

      }
  }
  ngOnInit(): void {
    this.route.parent?.params.pipe(
      switchMap((paramsParent) => {
        const quadrant = paramsParent['quadrantNumber'] as number;
        return this.route.params.pipe(
          switchMap((params) => {
            const number = params['indicatorNumber'] as number;
            return this.loadIndicatorInstance(quadrant, number);
          })
        );
      }),
      catchError((error) => {
        this.router.navigate([''])
        console.log('Error al obtener la instancia del indicador', error);
        return EMPTY;
      })
    ).subscribe(
      (indicatorInstance) => {
        this.indicatorInstance = indicatorInstance;
        this.indicatorInstanceService.setIndicatorInstance(indicatorInstance);

        if (this.indicatorInstance) {
          const indicatorCatalog = this.indicatorInstance.indicatorID as IndicatorID;
          this.router.navigateByUrl(`user/quadrant/${indicatorCatalog.quadrant}/indicator/${indicatorCatalog.number}/${indicatorInstance.id}`);
        }
      },
      (error) => {
        console.log('Error al suscribirse a la instancia del indicador', error);
      }
    )!;
  }

  private loadIndicatorInstance(quadrant: number, number: number) {
    return this.indicatorService.getIndicatorByQuadrantAndNumber(quadrant, number).pipe(
      switchMap((indicator) => {
        return this.periodService.getPeriodSelected().pipe(
          switchMap((period) => {
            return this.indicatorInstanceService.getIndicatorByIndicatorIDandPeriod(indicator.id, period);
          })
        );
      })
    );
  }

}
