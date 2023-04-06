import { AfterViewInit, Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import { isPlatformBrowser } from '@angular/common';
import * as am5percent from "@amcharts/amcharts5/percent";
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { Indicator } from '../../../../models/indicator'
import { Router } from '@angular/router';
export interface DataSlide {
  name:string,
  value?:number,
  color?:string
}
@Component({
  selector: 'app-semaphore',
  templateUrl: './semaphore.component.html',
  styleUrls: ['./semaphore.component.scss']
})
export class SemaphoreComponent implements OnInit, AfterViewInit {

  private root!: am5.Root;
  data:DataSlide[]=[]
  colorRed='#E00613'
  colorYellow='#FCEA00'
  colorGreen='#009640'
  colorGrey='#D9D9D9'

  @Input() quadrant:string = '1'

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private indicadorService: IndicatorsService,
    private router: Router
    ) { }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let root = am5.Root.new("chartdiv");
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle:-90,
        endAngle:-180,
        innerRadius:am5.percent(10)
      })
    );
    am5.net.load('http://localhost:3001/api/indicators?quadrant=1').then((res)=>{
      let series = chart.series.push(
        am5percent.PieSeries.new(root,{
          name:'Cuadrante',
          categoryField:'name',
          valueField:"value",
          fillField:'color',
          startAngle:-90,
          endAngle:-180,
        })
      )
      series.slices.template.setAll({
        fillOpacity: 0.5,
        stroke: am5.color(0xffffff),
        strokeWidth: 5
      });
      series.slices.template.events.enableType("click")
      series.slices.template.events.on("click",(e)=>{
        const obj = e.target.dataItem?.dataContext as DataSlide
        console.log(obj)
        this.router.navigateByUrl('user/indicator')
      })
      this.data=[]
      let indicators = am5.JSONParser.parse(res.response!)
        indicators.map((indicator:Indicator)=>{
          let obj:DataSlide ={ ...indicator }
          console.log(indicator.qualification)
          switch (indicator.qualification) {
            case 1:
              obj.color=this.colorRed
              break;
            case 2:
              obj.color=this.colorYellow
              break;
            case 3:
              obj.color=this.colorGreen
              break;
            case 0:
              obj.color=this.colorGrey
              break;
          }
          obj.value=1
          this.data.push(obj)
        })
      series.data.setAll(this.data)

  })
}
}
