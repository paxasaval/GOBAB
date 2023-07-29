import { Evidence } from './../../../../models/evidence';
import { Subscription, combineLatest, from } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacteristicID } from 'src/app/models/characteristic';
import { IndicatorInstance, IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { SubindicatorID } from 'src/app/models/subindicators';
import { TypeID } from 'src/app/models/type';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { TypeService } from 'src/app/services/type/type.service';
import { concatMap } from 'rxjs/operators'
import { EvidenceService } from 'src/app/services/evidence/evidence.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAbstractComponent } from '../dialog-abstract/dialog-abstract.component';
import { TitleService } from 'src/app/services/title/title.service';
import { IndicatorID } from 'src/app/models/indicator';

@Component({
  selector: 'app-indicator-general',
  templateUrl: './indicator-general.component.html',
  styleUrls: ['./indicator-general.component.scss']
})
export class IndicatorGeneralComponent implements OnInit,OnDestroy {

  type!: TypeID
  indicator!: IndicatorInstanceID
  flag:boolean=false
  subIndicator!: SubindicatorID
  characteristics: CharacteristicID[] = []
  id = ''
  arrayEvidence: Evidence[] = []
  subscription!:Subscription
  constructor(
    private indicatorInstanceService: IndicatorInstanceService,
    private subIndicatorService: SubindicatorService,
    private route: ActivatedRoute,
    private typeService: TypeService,
    private router: Router,
    private evidenceService:EvidenceService,
    private dialog:MatDialog,
    private titleService:TitleService
  ) { }


  findSubindicator(type: TypeID, subindicators: SubindicatorID[],indicatorCatalog:IndicatorID) {

    const subidicator = subindicators.find(subindicator => subindicator.typeID == type.id)
    if(subidicator){
    this.subIndicatorService.getSubindicatorByID(subidicator?.id!).subscribe(
      subindicator=>{
        this.subIndicator=subindicator
        this.subIndicatorService.setSelectedSubindicator(subindicator)
        this.characteristics = type.characteristics as CharacteristicID[]
        //this.titleService.setTitle([indicatorCatalog.quadrantName,indicatorCatalog.name,this.subIndicator.name])
        const name = this.subIndicator.name.replace(' ','-')
       const indicatorID = this.subIndicator.indicadorID as IndicatorInstanceID
        this.titleService.setRoute([
          {
            name:indicatorCatalog.quadrantName,
            route:`/admin/quadrant/${indicatorCatalog.quadrant}`
          },
          {
            name:indicatorCatalog.name,
            route:`/admin/quadrant/${indicatorCatalog.quadrant}/indicator/${indicatorCatalog.number}`
          },
          {
            name:this.subIndicator.name,
            route:`/admin/quadrant/${indicatorCatalog.quadrant}/indicator/${indicatorCatalog.number}/${indicatorID.id}/${name}`
          }
        ])
      }
    )}
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.data.typeID
    this.subscription=combineLatest([
      this.typeService.getTypeById(this.id),
      this.indicatorInstanceService.getIndicatorInstance()]).subscribe(
      ([type, indicator]) => {
        if(type){
          this.typeService.setTypeSelected(type)
        }
        if(indicator.id!=''){
          this.flag=true
        }
        const indicatorCatalog = indicator.indicatorID as IndicatorID
        this.findSubindicator(type, indicator.subindicators as SubindicatorID[],indicatorCatalog)



      }
    )

  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
