import { CharacteristicID,CharacteristicWithEvidence } from './../../../../models/characteristic';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EvidenceID } from 'src/app/models/evidence';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { map, retry } from 'rxjs/operators';
import { TypeID } from 'src/app/models/type';
import { SubindicatorID } from 'src/app/models/subindicators';
import { TypeService } from 'src/app/services/type/type.service';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit,OnChanges {

  indicatorID=''
  typeID!:TypeID
  evidences:EvidenceID[]=[]
  type!:TypeID
  dataSource!:Observable<CharacteristicWithEvidence[]>
  groupEvidence!:CharacteristicWithEvidence[] | null
  displayedColumns:string[]=[]
  subscribe1!:Subscription
  constructor(
    private subindicatorService:SubindicatorService,
    private typeService:TypeService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  groupCharacteristics(typeID:TypeID,evidences:EvidenceID[]){
      const characteristics = typeID.characteristics as CharacteristicID[]
      return characteristics.map((characteristic)=>{
        const evidenceArray = evidences.filter(evidence=>{
          const characteristicID = evidence.characteristicID
          return characteristicID==characteristic.id})

        return {characteristic:characteristic,evidences:evidenceArray}
      })
  }
  changeValidate(evidence:EvidenceID){

  }
  setColumns(subindicator:SubindicatorID){
    this.evidences=subindicator.evidences as EvidenceID[]
        this.displayedColumns = Object.keys(this.evidences[0])
        this.displayedColumns.splice(1,1)
        this.displayedColumns.pop()
        this.displayedColumns.push('Calificar')
        this.type=subindicator.typeID as TypeID
  }

  ngOnInit(): void {
    combineLatest([this.typeService.getTypeSelected(),this.subindicatorService.getSelectedSubindicator()])
      .subscribe(([type,subindicator])=>{
        this.typeID=type
        this.groupEvidence = this.groupCharacteristics(type,subindicator.evidences as EvidenceID[])
        console.log(this.groupEvidence)
      })
  }

}
