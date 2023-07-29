import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorID } from './../../../../models/indicator';
import { SubindicatorID } from './../../../../models/subindicators';
import { CharacteristicID } from './../../../../models/characteristic';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CharacteristicsService } from 'src/app/services/characteristics/characteristics.service';
import { TypeService } from 'src/app/services/type/type.service';
import { switchMap } from 'rxjs/operators';
import { TypeID } from 'src/app/models/type';
import { EvidenceID } from 'src/app/models/evidence';
export interface EvidenceCharacteristics{
  characteristic:CharacteristicID,
  evidence:EvidenceID[]
}
@Component({
  selector: 'app-sub-indicator-general',
  templateUrl: './sub-indicator-general.component.html',
  styleUrls: ['./sub-indicator-general.component.scss']
})

export class SubIndicatorGeneralComponent implements OnInit, OnChanges {
  title = ''
  id=''
  subindicator:SubindicatorID={
    commits:[],
    created:new Date(),
    createdBy:'',
    evidences:[],
    id:'',
    indicadorID:'',
    lastUpdate:new Date(),
    state:false,
    name:'',
    qualification:0,
    responsible:'',
    typeID:''
  }
  characteristics:CharacteristicID[] =[]
  characteristicsID:string[] = []
  indicatorID!:IndicatorID
  characteristicsEvidence: EvidenceCharacteristics[] = []
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private typeService:TypeService,
    private characteriscticService: CharacteristicsService,
    private indicatorInstanceService:IndicatorInstanceService
    ) { }


  ngOnChanges(changes: SimpleChanges): void {

  }

  matcherEvidencesCharacteristic(characteristics:CharacteristicID[],evidences:EvidenceID[]):EvidenceCharacteristics[]{
    return characteristics.map(characteristic=>{
      const newCharacterEvidence:EvidenceCharacteristics = {evidence:[],characteristic:characteristic}
      newCharacterEvidence.evidence = evidences.filter(evidence=>evidence.characteristicID == characteristic.id)
      return newCharacterEvidence
    })
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.data.typeID
    combineLatest([this.typeService.getTypeById(this.id),this.indicatorInstanceService.getIndicatorInstance()]).subscribe(
      ([type,indicator])=>{
        const arraySubindicators = indicator.subindicators as SubindicatorID[]
        this.characteristics = type.characteristics as CharacteristicID[]
        const subindicatorSelected = arraySubindicators.find(subindicator=>subindicator.typeID == type.id)
        if(subindicatorSelected){
          const arrayEvidences = subindicatorSelected.evidences as EvidenceID[]
          this.title = subindicatorSelected.name
          this.characteristicsEvidence = this.matcherEvidencesCharacteristic(this.characteristics,arrayEvidences)
          
        }
      }
    )
  }

}
