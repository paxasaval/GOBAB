import { IndicatorInstanceID, IndicatorInstanceIDWithCatalog } from './../../../../models/indicatorInstance';
import { concatMap } from 'rxjs/operators';
import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { GadID } from 'src/app/models/gad';
import { GadService } from 'src/app/services/gad/gad.service';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { PeriodService } from 'src/app/services/period/period.service';
import { TitleService } from 'src/app/services/title/title.service';
import { IndicatorInstance } from 'src/app/models/indicatorInstance';
import { SubindicatorID } from 'src/app/models/subindicators';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ExportPdfService } from 'src/app/services/export-pdf/export-pdf.service';

interface ExtraData {
  data: number | string,
  label: string
}
interface SummaryInfo {
  quadrantName: string,
  qualify_0: number,
  qualify_1: number,
  qualify_2: number,
  qualify_3: number,
}
interface SummarySubindicators {
  qualify_0: number,
  qualify_1: number,
  qualify_2: number,
  qualify_3: number,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit {

  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;
  gad!: GadID
  semaphoreColor=[
    '#D9D9D9bf',
    '#E00613bf',
    '#FCEA00bf',
    '#009640bf'
  ]
  semaphoreColor2=[
    '#D9D9D9',
    '#E00613',
    '#FCEA00',
    '#009640'
  ]
  titleReport = 'Reporte de prueba'
  sourceReport = 'Test'
  codigoReport = 'Test001'
  summary: SummaryInfo[] = []
  infoExtra: ExtraData[] = [
    {
      data: 171.356,
      label: 'Poblacion proyectada (2022)'
    },
    {
      data: 0.5901,
      label: 'Indice de Desarrollo Humano'
    },
    {
      data: '77.09 años',
      label: 'Esperanza de vida al nacer'
    },
    {
      data: '70.95%',
      label: 'Con educacion secundaria completa'
    },
    {
      data: 9.37,
      label: 'Años de educación (Pob. de 25 y más)'
    },
  ]
  percentRegister: number = 0
  totalSubindicators: number = 0
  totalSubindicatorsEvaluated: number = 0
  summarySubindicators!: SummarySubindicators
  quadrant1: IndicatorInstanceIDWithCatalog[] = []
  quadrant2: IndicatorInstanceIDWithCatalog[] = []
  quadrant3: IndicatorInstanceIDWithCatalog[] = []
  quadrant4: IndicatorInstanceIDWithCatalog[] = []
  sub_q1: SubindicatorID[] = []
  sub_q2: SubindicatorID[] = []
  sub_q3: SubindicatorID[] = []
  sub_q4: SubindicatorID[] = []
  summary_q1!: SummarySubindicators
  summary_q2!: SummarySubindicators
  summary_q3!: SummarySubindicators
  summary_q4!: SummarySubindicators
  flag=false
   public pieChartOptions: ChartConfiguration<any>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
      tooltip:{
        enabled:true
      },
    },
    animation:false,
    cutout:'80%'
  };
  public pieChartData: ChartData<'doughnut', number[], string | string[]> = {
    labels: ['2','3'],
    datasets: [{
      data: [4,10],
    }],

  };
  public pieChartType: ChartType = 'doughnut';

  allSummary = [
    this.summary_q1,
    this.summary_q2,
    this.summary_q3,
    this.summary_q4,
  ]

  allQuadrant = [
    this.quadrant1,
    this.quadrant2,
    this.quadrant3,
    this.quadrant4,
  ]
  constructor(
    private title: TitleService,
    private gadService: GadService,
    private periodService: PeriodService,
    private indicatorInstanceService: IndicatorInstanceService,
    private exportPdfService:ExportPdfService
    ) { }

  dowloadReport() {
    let name = `Report ${new Date()}`
    this.exportPdfService.createPdfs(name,'report')
  }

  getDataDonut(quadrant: SummarySubindicators) {
      const doughtChartData: ChartData<'doughnut'> = {
      labels: ['1','2,','3','4'],
      datasets: [
        {
          data: [
            quadrant.qualify_0,
            quadrant.qualify_1,
            quadrant.qualify_2,
            quadrant.qualify_3
          ],
          backgroundColor:this.semaphoreColor,
          borderColor:this.semaphoreColor,
          hoverBackgroundColor:this.semaphoreColor2,
          hoverBorderColor:['#000']
        }
      ]
    }
    this.charts.forEach(c=>{
      c.update()
    })
    this.flag=true

    return doughtChartData
  }

  getQualifyColor(qualifyValue: number): string {
    if (qualifyValue === 0) {
      return '#D9D9D9'; // Gris
    } else if (qualifyValue < 2) {
      return '#E00613'; // Rojo
    } else if (qualifyValue < 3) {
      return '#FCEA00'; // Amarillo
    } else {
      return '#009640'; // Verde
    }
  }
  getSubEval(quadrant: SummarySubindicators) {
    return quadrant.qualify_1 + quadrant.qualify_2 + quadrant.qualify_3
  }
  getTotal(quadrant: SummarySubindicators) {
    return quadrant.qualify_0 + quadrant.qualify_1 + quadrant.qualify_2 + quadrant.qualify_3
  }
  getWidhtColor(qualifyValue: number, data: SummaryInfo) {
    const total = data.qualify_0 + data.qualify_1 + data.qualify_2 + data.qualify_3
    //console.log('total',total,'percernt:',(qualifyValue/total)*100)
    return (qualifyValue / total) * 100
  }
  ngOnInit(): void {
    this.title.setRoute([
      {
        name: 'Inicio',
        route: 'admin/home'
      }
    ])
    combineLatest([
      this.gadService.getGadSelected(),
      this.periodService.getPeriodSelected()
    ]).pipe(
      concatMap(([gad, period]) => {
        this.gad = gad
        //console.log(period)
        if (period.id !== '') {
          return combineLatest([
            this.indicatorInstanceService.getSummaryIndicators(period.id),
            this.indicatorInstanceService.getSummarySubindicators(period.id),
            this.indicatorInstanceService.getIndicatorsByPeriodAndQuadrant(period.id, '1'),
            this.indicatorInstanceService.getIndicatorsByPeriodAndQuadrant(period.id, '2'),
            this.indicatorInstanceService.getIndicatorsByPeriodAndQuadrant(period.id, '3'),
            this.indicatorInstanceService.getIndicatorsByPeriodAndQuadrant(period.id, '4')

          ])
        } else {
          return combineLatest([of(null), of(null)])
        }
      })
    ).subscribe(
      ([res, res2, quadrant1, quadrant2, quadrant3, quadrant4]) => {
        console.log(res)
        this.summary = res!
        if (res2 != null) {
          this.summarySubindicators = res2 as SummarySubindicators
          //console.log(this.summarySubindicators)
          this.totalSubindicators = this.summarySubindicators.qualify_0 + this.summarySubindicators.qualify_1 + this.summarySubindicators.qualify_2 + this.summarySubindicators.qualify_3
          this.totalSubindicatorsEvaluated = this.summarySubindicators.qualify_1 + this.summarySubindicators.qualify_2 + this.summarySubindicators.qualify_3
          this.percentRegister = (this.totalSubindicatorsEvaluated / this.totalSubindicators) * 100
          this.sub_q1 = []
          this.sub_q2 = []
          this.sub_q3 = []
          this.sub_q4 = []
          console.log(quadrant1)
          quadrant1?.forEach(ind => {
            this.sub_q1 = this.sub_q1.concat(ind.subindicators as SubindicatorID[])
          })
          quadrant2?.forEach(ind => {
            this.sub_q2 = this.sub_q2.concat(ind.subindicators as SubindicatorID[])
          })
          quadrant3?.forEach(ind => {
            this.sub_q3 = this.sub_q3.concat(ind.subindicators as SubindicatorID[])
          })
          quadrant4?.forEach(ind => {
            this.sub_q4 = this.sub_q4.concat(ind.subindicators as SubindicatorID[])
          })
          this.summary_q1 = {
            qualify_0: 0,
            qualify_1: 0,
            qualify_2: 0,
            qualify_3: 0
          }
          this.sub_q1.forEach(sub => {
            if (sub.qualification == 0) {
              this.summary_q1.qualify_0++
            }
            if (sub.qualification == 1) {
              this.summary_q1.qualify_1++
            }
            if (sub.qualification == 2) {
              this.summary_q1.qualify_2++
            }
            if (sub.qualification == 3) {
              this.summary_q1.qualify_3++
            }
          })
          //q2
          this.summary_q2 = {
            qualify_0: 0,
            qualify_1: 0,
            qualify_2: 0,
            qualify_3: 0
          }
          this.sub_q2.forEach(sub => {
            if (sub.qualification == 0) {
              this.summary_q2.qualify_0++
            }
            if (sub.qualification == 1) {
              this.summary_q2.qualify_1++
            }
            if (sub.qualification == 2) {
              this.summary_q2.qualify_2++
            }
            if (sub.qualification == 3) {
              this.summary_q2.qualify_3++
            }
          })
          //q3
          this.summary_q3 = {
            qualify_0: 0,
            qualify_1: 0,
            qualify_2: 0,
            qualify_3: 0
          }
          this.sub_q3.forEach(sub => {
            if (sub.qualification == 0) {
              this.summary_q3.qualify_0++
            }
            if (sub.qualification == 1) {
              this.summary_q3.qualify_1++
            }
            if (sub.qualification == 2) {
              this.summary_q3.qualify_2++
            }
            if (sub.qualification == 3) {
              this.summary_q3.qualify_3++
            }
          })
          //q4
          this.summary_q4 = {
            qualify_0: 0,
            qualify_1: 0,
            qualify_2: 0,
            qualify_3: 0
          }
          this.sub_q4.forEach(sub => {
            if (sub.qualification == 0) {
              this.summary_q4.qualify_0++
            }
            if (sub.qualification == 1) {
              this.summary_q4.qualify_1++
            }
            if (sub.qualification == 2) {
              this.summary_q4.qualify_2++
            }
            if (sub.qualification == 3) {
              this.summary_q4.qualify_3++
            }
          })
          this.allQuadrant = [
            quadrant1! as IndicatorInstanceIDWithCatalog[],
            quadrant2! as IndicatorInstanceIDWithCatalog[],
            quadrant3! as IndicatorInstanceIDWithCatalog[],
            quadrant4! as IndicatorInstanceIDWithCatalog[]
          ]
          this.allSummary = [
            this.summary_q1,
            this.summary_q2,
            this.summary_q3,
            this.summary_q4,
          ]
          this.flag=true
          }
      }
    )
  }
  see(){
    this.flag=false
    this.charts.forEach(chart => {
      chart?.update();
    })
    console.log(this.pieChartData)
    this.flag=true
  }
  ngAfterViewInit(): void {
    this.charts.forEach(chart => {
      chart?.update();
    })
  }



}
