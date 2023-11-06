import {
  IndicatorInstance,
  IndicatorInstanceID,
} from './../../../../models/indicatorInstance';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { IndicatorID } from 'src/app/models/indicator';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { PeriodService } from 'src/app/services/period/period.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-quadrant',
  templateUrl: './quadrant.component.html',
  styleUrls: ['./quadrant.component.scss'],
})
export class QuadrantComponent implements OnInit, OnChanges {
  id = '1';
  title = 'DESARROLLO INSTITUCIONAL PARA UN BUEN GOBIERNO';
  indicators: IndicatorInstanceID[] = [];
  subscribe!: Subscription;
  observers: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private indicatorInstanceService: IndicatorInstanceService,
    private periodService: PeriodService,
    private indicatorService:IndicatorsService,
    private titleService:TitleService
  ) { }

  ngOnChanges() { }
  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params=>{
        this.id = params['quadrantNumber']
        return this.indicatorService.getIndicatorsByQuadrant(params['quadrantNumber'])
        .pipe(
          catchError((error) => {
            console.log('Error al obtener los indicadores por cuadrante', error);
            this.router.navigate([''])
            return EMPTY;
          })
        );
      })  
    ).subscribe(
      indicators=>{
        this.title = indicators[0].quadrantName
        this.titleService.setTitle([this.title])
      },
      (error)=>{
        console.log('Error al suscribirse a los indicadores', error);
      }
    )
  }
}
