import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacteristicID } from 'src/app/models/characteristic';
import { IndicatorInstance } from 'src/app/models/indicatorInstance';
import { SubindicatorID } from 'src/app/models/subindicators';
import { TypeID } from 'src/app/models/type';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { TypeService } from 'src/app/services/type/type.service';

@Component({
  selector: 'app-indicator-general',
  templateUrl: './indicator-general.component.html',
  styleUrls: ['./indicator-general.component.scss']
})
export class IndicatorGeneralComponent implements OnInit {

  type!:TypeID
  indicator!:IndicatorInstance
  subIndicator!:SubindicatorID | undefined
  characteristics:CharacteristicID[] =[]
  id=''
  constructor(
    private indicatorInstanceService:IndicatorInstanceService,
    private subIndicatorService:SubindicatorService,
    private route:ActivatedRoute,
    private typeService:TypeService
  ) { }


  findSubindicator(type:TypeID,subindicators:SubindicatorID[]){
    return subindicators.find(subindicator=>subindicator.typeID==type.id)
  }

  saveEvidence(){

  }
  cancelEvidence(){

  }

  ngOnInit(): void {
    this.id=this.route.snapshot.data.typeID
    combineLatest([this.typeService.getTypeById(this.id),this.indicatorInstanceService.getIndicatorInstance()]).subscribe(
      ([type,indicator])=>{
        this.subIndicator = this.findSubindicator(type,indicator.subindicators as SubindicatorID[])
        if(this.subIndicator){
          this.characteristics = type.characteristics as CharacteristicID[]
        }
      }
    )

  }

}
