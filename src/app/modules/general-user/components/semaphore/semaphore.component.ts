import { SimpleChanges, AfterViewInit, Component, ElementRef, Inject, Input, NgZone, OnInit, PLATFORM_ID, ViewChild, OnChanges } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import { isPlatformBrowser } from '@angular/common';
import * as am5percent from "@amcharts/amcharts5/percent";
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { Indicator, IndicatorID } from '../../../../models/indicator'
import { NavigationExtras, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
export interface DataSlide extends IndicatorID {
  name: string,
  value?: number,
  color?: string,
}
@Component({
  selector: 'app-semaphore',
  templateUrl: './semaphore.component.html',
  styleUrls: ['./semaphore.component.scss']
})
export class SemaphoreComponent implements OnInit, AfterViewInit, OnChanges {

  private isInitialized = false;
  data: DataSlide[] = []
  navigationExtras: NavigationExtras = {
    state: {}
  }

  colorRed = '#E00613'
  colorYellow = '#FCEA00'
  colorGreen = '#009640'
  colorGrey = '#D9D9D9'

  @Input() quadrant: string = '4'
  startAngle = -90
  endAngle = -180

  @ViewChild('chartContainer') chartContainer!: ElementRef
  @ViewChild('chartdiv') chartDiv!: ElementRef

  root!: am5.Root

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private indicadorService: IndicatorsService,
    private router: Router,
    private meta: Meta
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

  generateHTML(dataContext: DataSlide){
    console.log(dataContext)
    let html = ''
    if(dataContext){
    html +=''
    + "<img src=\"../../../../../assets/OD 17.png\" width=\"32\" height=\"32\">"
    + "<img src=\"../../../../../assets/OD 17.png\" width=\"32\" height=\"32\">"
    + "<img src=\"../../../../../assets/OD 17.png\" width=\"32\" height=\"32\">"
    +`<span>${dataContext.number}. ${dataContext.name}</span>`
    }
    return '<p style=\"display:flex;align-items:center;gap:0.2em;overflow:visible;\">' + html + '</p>';
  }

  renderChart() {
    //this.root.container.children.dispose()
    this.root.dispose()
    this.root = am5.Root.new("chartdiv");
    this.root.container.children.clear()
    console.log(this.root.container.getTooltip())
    let chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        startAngle: this.startAngle,
        endAngle: this.endAngle,
        innerRadius: am5.percent(10),

      })
    );
    chart.series.dispose()
    chart.series.clear()
    am5.net.load(`http://localhost:3001/api/indicators?quadrant=${this.quadrant}`).then((res) => {
    let series = chart.series.push(
        am5percent.PieSeries.new(this.root, {
          name: 'Cuadrante',
          categoryField: 'name',
          valueField: "value",
          fillField: 'color',
          startAngle: this.startAngle,
          endAngle: this.endAngle,
        })
      )
      series.slices.clear()
      series.slices.template.setAll({
        fillOpacity: 0.5,
        stroke: am5.color(0xffffff),
        strokeWidth: 5,
      });
      this.data = []
      let indicators = am5.JSONParser.parse(res.response!)
      indicators.map((indicator: IndicatorID) => {
        let obj: DataSlide = { ...indicator }
        switch (indicator.qualification) {
          case 1:
            obj.color = this.colorRed
            break;
          case 2:
            obj.color = this.colorYellow
            break;
          case 3:
            obj.color = this.colorGreen
            break;
          case 0:
            obj.color = this.colorGrey
            break;
        }
        obj.value = 1
        this.data.push(obj)
      })
      series.slices.template.events.enableType("click")
      series.slices.template.events.on("click", (e) => {
        const obj = e.target.dataItem?.dataContext as DataSlide
        this.navigationExtras.state = obj
        this.router.navigate(['user/indicator', obj])
      })
      series.labels.template.set("forceHidden", true);
      series.labels.template.adapters.add("html", (html,target)=>{
        const dataContext = target.dataItem?.dataContext as DataSlide
        return this.generateHTML(dataContext)
      })
      series.labels.template.set("forceHidden", false);
      series.data.setAll(this.data)
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInitialized) {
      //window.location.reload()
      if (this.quadrant === '1') {
        this.startAngle = -90
        this.endAngle = -180
        this.chartContainer.nativeElement.style.flexDirection = 'row'
        this.chartDiv.nativeElement.style.transform = 'translate(12%)'
      }
      if (this.quadrant === '2') {
        this.startAngle = -90
        this.endAngle = 0
        this.chartContainer.nativeElement.style.flexDirection = 'row-reverse'
        this.chartDiv.nativeElement.style.transform = 'translate(-25%)'
      }
      if (this.quadrant === '3') {
        this.startAngle = -360
        this.endAngle = -270
        this.chartContainer.nativeElement.style.flexDirection = 'row-reverse'
        this.chartDiv.nativeElement.style.transform = 'translate(-25%)'
      } if (this.quadrant === '4') {
        this.startAngle = -180
        this.endAngle = -270
        this.chartContainer.nativeElement.style.flexDirection = 'row'
        this.chartDiv.nativeElement.style.transform = 'translate(12%)'
      }
      this.renderChart()
    }
  }

  ngAfterViewInit(): void {
    this.isInitialized = true
    if (this.quadrant === '1') {
      this.startAngle = -90
      this.endAngle = -180
      this.chartContainer.nativeElement.style.flexDirection = 'row'
      this.chartDiv.nativeElement.style.transform = 'translate(12%)'
    }
    if (this.quadrant === '2') {
      this.startAngle = -90
      this.endAngle = 0
      this.chartContainer.nativeElement.style.flexDirection = 'row-reverse'
      this.chartDiv.nativeElement.style.transform = 'translate(-25%)'
    }
    if (this.quadrant === '3') {
      this.startAngle = -360
      this.endAngle = -270
      this.chartContainer.nativeElement.style.flexDirection = 'row-reverse'
      this.chartDiv.nativeElement.style.transform = 'translate(-25%)'
    } if (this.quadrant === '4') {
      this.startAngle = -180
      this.endAngle = -270
    }
    this.root = am5.Root.new("chartdiv");
    this.renderChart()
  }
}
