import { IndicatorInstanceID } from './../../../models/indicatorInstance';
import { SimpleChanges, AfterViewInit, Component, ElementRef, Inject, Input, NgZone, OnInit, PLATFORM_ID, ViewChild, OnChanges } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import { isPlatformBrowser } from '@angular/common';
import * as am5percent from "@amcharts/amcharts5/percent";
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { IndicatorID } from 'src/app/models/indicator';
import { OdsID } from 'src/app/models/ods';
export interface DataSlide extends IndicatorInstanceID {
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
  navigationExtras: NavigationExtras = {
    state: {}
  }

  colorRed = '#E00613'
  colorYellow = '#FCEA00'
  colorGreen = '#009640'
  colorGrey = '#D9D9D9'
  @Input() data: IndicatorInstanceID[] = []
  @Input() quadrant: string = '1'
  @Input() period: string = '2022'
  @Input() scale = 1
  startAngle = 0
  endAngle = 0
  centerY = 0
  centerX = 0

  @ViewChild('chartContainer') chartContainer!: ElementRef
  @ViewChild('chartdiv') chartDiv!: ElementRef

  root!: am5.Root
  contador = 1
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private indicadorService: IndicatorsService,
    private router: Router,
    private meta: Meta,
    private route: ActivatedRoute
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

  generateHTML(dataContext: DataSlide) {
    //console.log(dataContext)
    let html = ''
    if (dataContext) {
      dataContext.indicatorID = dataContext.indicatorID as IndicatorID
      dataContext.indicatorID.ods.forEach((ods) => {
        ods = ods as OdsID
        html += `<img src=${ods.img} width=\"${32*this.scale}\" height=\"${32*this.scale}\">`
      })
      html += `<span style=\"font-size:${this.scale}em\">${dataContext.indicatorID.number}. ${dataContext.name}</span>`
    }
    return '<p style=\"display:flex;align-items:center;gap:0.2em;overflow:visible;\">' + html + '</p>';
  }

  renderChart() {
    //this.root.container.children.dispose()
    console.log(this.data)
    this.root.dispose()
    this.root = am5.Root.new("chartdiv");
    this.root.container.children.clear()
    let chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        startAngle: this.startAngle,
        endAngle: this.endAngle,
        width:1100*this.scale,
        innerRadius: am5.percent(10),
        centerY: this.centerY,
        centerX: this.centerX,
      })
    );
    chart.series.clear()
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
    series.slices.template.setAll({
      fillOpacity: 0.5,
      stroke: am5.color(0xffffff),
      strokeWidth: 5,
    });
    let indicators = this.data.map((indicatorInstance: IndicatorInstanceID) => {
      let indicator = indicatorInstance.indicatorID as IndicatorID
      let obj: DataSlide = { ...indicatorInstance, name: indicator.name }
      switch (indicatorInstance.qualification) {
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
      return obj
    })
    series.slices.clear()
    series.slices.template.events.enableType("click")
    series.slices.template.events.on("click", (e) => {
      const obj = e.target.dataItem?.dataContext as DataSlide
      this.navigationExtras.state = obj

      this.router.navigate(['./indicator',obj.id],{relativeTo:this.route})
    })
    series.labels.clear()
    series.labels.template.set("forceHidden", true);
    series.labels.template.adapters.add("html", (html, target) => {
      const dataContext = target.dataItem?.dataContext as DataSlide
      return this.generateHTML(dataContext)
    })
    series.labels.template.set("forceHidden", false);
    series.data.setAll(indicators)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInitialized && this.data.length > 0) {
      //window.location.reload()
      if (this.quadrant === '1') {
        this.startAngle = -90
        this.endAngle = -180
        this.centerX = -300 + (1-this.scale)*400
        this.centerY = 0
        this.chartContainer.nativeElement.style.flexDirection = 'row'

      }
      if (this.quadrant === '2') {
        this.startAngle = -90
        this.endAngle = 0
        this.centerX = 225 - (1-this.scale)*500
        this.centerY = 0
        this.chartContainer.nativeElement.style.flexDirection = 'row-reverse'

      }
      if (this.quadrant === '3') {
        this.startAngle = -360
        this.endAngle = -270
        this.centerX = 250 - (1-this.scale)*500
        this.centerY = 60
        this.chartContainer.nativeElement.style.flexDirection = 'row-reverse'

      } if (this.quadrant === '4') {
        this.startAngle = -180
        this.endAngle = -270
        this.centerX =-250 - (1-this.scale)*150
        this.centerY = 25
        this.chartContainer.nativeElement.style.flexDirection = 'row'

      }
      this.renderChart()
    }
  }

  ngAfterViewInit(): void {
    this.isInitialized = true
    if (this.quadrant === '1') {
      this.startAngle = -90
      this.endAngle = -180
      this.centerX = -250
      this.centerY = 0
      this.chartContainer.nativeElement.style.flexDirection = 'row'

    }
    if (this.quadrant === '2') {
      this.startAngle = -90
      this.endAngle = 0
      this.centerX = 225
      this.centerY = 0
      this.chartContainer.nativeElement.style.flexDirection = 'row-reverse'

    }
    if (this.quadrant === '3') {
      this.startAngle = -360
      this.endAngle = -270
      this.centerX = 225
      this.centerY = 50
      this.chartContainer.nativeElement.style.flexDirection = 'row-reverse'

    } if (this.quadrant === '4') {
      this.startAngle = -180
      this.endAngle = -270
      this.centerX =-250
      this.centerY = 25
      this.chartContainer.nativeElement.style.flexDirection = 'row'

    }
    this.root = am5.Root.new("chartdiv");
  }
}
