import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IndicatorID } from 'src/app/models/indicator';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { Pagination } from 'src/app/models/pagination';
import { Subindicator, SubindicatorID } from 'src/app/models/subindicators';
import { TypeID } from 'src/app/models/type';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorsService } from 'src/app/services/indicators/indicators.service';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { TypeService } from 'src/app/services/type/type.service';
interface Food {
  value: string;
  viewValue: string;
}
interface Eje {
  quadrantName:string,
  quadrant:number
}

@Component({
  selector: 'app-search-specific-subindicator',
  templateUrl: './search-specific-subindicator.component.html',
  styleUrls: ['./search-specific-subindicator.component.scss']
})
export class SearchSpecificSubindicatorComponent implements OnInit,OnChanges {

  @Input() rol:string='user'
  @Input() indicator:IndicatorInstanceID|null = null
  arrayEjes:Eje[]=[
    {
      quadrant:1,
      quadrantName:'Desarrollo institucional para un buen gobierno'
    },
    {
      quadrant:2,
      quadrantName:'Desarrollo económico sostenible '
    },
    {
      quadrant:3,
      quadrantName:'Desarrollo ambiental sostenible'
    },
    {
      quadrant:4,
      quadrantName:'Desarrollo social incluyente'
    }
  ]
  allIndicators:IndicatorID[]=[]
  arrayIndicator:IndicatorID[]=[]
  arrayType:TypeID[]=[]
  arrayState=[]
  //var-pagination
  page=0
  size=5
  pagination:Pagination={}
  //subscribe
  subcriptionSubIndicators:Subscription|null=null

  arraySubindicators:SubindicatorID[]=[]
  myContol = new FormControl('')
  ejeControl = new FormControl('')
  indicatorControl = new FormControl('')
  options:string[]=['One', 'Two', 'Three'];
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  displayedColumns: string[] = ['name', 'type', 'state', 'dateUpdate','responsibles','actions'  ];
  dataSource:SubindicatorID[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private indicatorService: IndicatorsService,
    private indicatorInstanceService:IndicatorInstanceService,
    private subindicatorService: SubindicatorService,
    private typeService:TypeService
  ) { }

  ngOnInit(): void {
    this.indicatorService.getAllIndicators().subscribe(
      indicators=>{
        this.allIndicators=indicators
        this.arrayIndicator=this.allIndicators
      }
    )
    if(!this.subcriptionSubIndicators){
      this.subcriptionSubIndicators = this.subindicatorService.getAllSubindicators().subscribe(
        subindicators=>{
          this.dataSource = subindicators
        }
      )
    }
    this.fetchType()
  }
  ngOnChanges(changes:SimpleChanges) {
    console.log(changes)
      if(this.indicator!.id){
        const indicatorCatalog = this.indicator!.indicatorID as IndicatorID
        const group = indicatorCatalog.quadrant
        this.arrayIndicator=this.filterIndicatorsByQuadrant(group)
        this.ejeControl.setValue(group)
        this.indicatorControl.setValue(indicatorCatalog.number)
        if(this.subcriptionSubIndicators){
          console.log(this.indicator?.id)
          this.subcriptionSubIndicators.unsubscribe()
          this.subcriptionSubIndicators = this.subindicatorService.getSubindicatorSpecificByIndicator(this.indicator!.id,this.page,this.size).subscribe(
            result=>{
              this.pagination = result.pagination
              this.dataSource = result.docs
            }
          )
        }else{
          this.subcriptionSubIndicators = this.subindicatorService.getSubindicatorSpecificByIndicator(this.indicator!.id,this.page,this.size).subscribe(
            result=>{
              this.pagination = result.pagination
              this.dataSource = result.docs
            }
          )
          console.log(this.indicator)
        }
      }
  }
  addSubindicator(){
    this.router.navigate(['add-subindicator'],{relativeTo:this.route})
  }
  filterIndicatorsByQuadrant(quadrant:number){
    return this.allIndicators.filter(indicator=>indicator.quadrant==quadrant)
  }
  //fetchs
  fetchIndicators(){

  }
  fetchSubindicators(eje?:number,){

  }
  handleIndicator(event:any){

  }
  fetchEje(){

  }
  handleEje(event:any){
    const value = event.value
    this.indicatorControl.setValue('')
    this.arrayIndicator=this.filterIndicatorsByQuadrant(value)
  }
  fetchType(){
    this.typeService.getTypeByMandatory(false).subscribe(
      types=>{
        this.arrayType=types
      }
    )
  }
  fetchStates(){

  }

  search(){

  }
  cleanFilters(){

  }
  viewSubindicator(id:string){
    this.router.navigate([`${this.rol}/subindicator-view/${id}`])
   }

}
