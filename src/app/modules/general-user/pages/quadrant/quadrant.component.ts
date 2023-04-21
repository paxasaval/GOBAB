import { IndicatorInstance, IndicatorInstanceID } from './../../../../models/indicatorInstance';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable,Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators'
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';

@Component({
  selector: 'app-quadrant',
  templateUrl: './quadrant.component.html',
  styleUrls: ['./quadrant.component.scss']
})
export class QuadrantComponent implements OnInit,OnChanges {
  id = '1'
  title = 'DESARROLLO INSTITUCIONAL PARA UN BUEN GOBIERNO'
  indicators:IndicatorInstanceID[] = []
  subscribe!:Subscription
  observers:Subscription[]=[]
  constructor(
    private route: ActivatedRoute,
    private indicatorInstanceService:IndicatorInstanceService
    ) { }


  ngOnChanges(){

  }
  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap((params:Params)=>{
        this.id = params['id']
        this.indicators = []
        return this.indicatorInstanceService.getIndicatorsByPeriodAndQuadrant('2022',this.id).pipe(
          mergeMap(res=>{
            this.indicators=res
            return res
          })
        )
      })
    ).subscribe(indicator=>{
      //console.log(indicator)
    })
  }

}
