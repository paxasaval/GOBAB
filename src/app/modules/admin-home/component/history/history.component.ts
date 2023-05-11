import { CharacteristicID,CharacteristicWithEvidence } from './../../../../models/characteristic';
import { Subscription, Observable } from 'rxjs';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EvidenceID } from 'src/app/models/evidence';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { map, retry } from 'rxjs/operators';
import { TypeID } from 'src/app/models/type';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit,OnChanges {

  @Input() indicatorID=''
  @Input() typeID!:TypeID
  evidences:EvidenceID[]=[]
  type!:TypeID
  dataSource!:Observable<CharacteristicWithEvidence[]>
  groupEvidence!:CharacteristicWithEvidence[] | null
  displayedColumns:string[]=[]
  subscribe1!:Subscription
  constructor(
    private subindicatorService:SubindicatorService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.indicatorID,this.typeID)
      if(this.subscribe1){
        this.subscribe1.unsubscribe()
        this.fetchSubindicator()
      }else{
        this.fetchSubindicator()
      }
  }

  groupCharacteristics(){
      const characteristics = this.typeID.characteristics as CharacteristicID[]
      return characteristics.map((characteristic)=>{
        const evidenceArray = this.evidences.filter(evidence=>{
          const characteristicID = evidence.characteristicID as CharacteristicID
          return characteristicID.id==characteristic.id})

        return {characteristic:characteristic,evidences:evidenceArray}
      })
  }
  changeValidate(evidence:EvidenceID){

  }
  fetchSubindicator(){
    this.subindicatorService.getSubindicatorByIndicatorIDandTypeID(this.indicatorID,this.typeID.id).pipe(
      map(subindicator=>{
        this.evidences=subindicator.evidences as EvidenceID[]
        this.displayedColumns = Object.keys(this.evidences[0])
        this.displayedColumns.splice(1,1)
        this.displayedColumns.pop()
        this.displayedColumns.push('Calificar')
        this.type=subindicator.typeID as TypeID
        return this.groupCharacteristics()
      })
    ).subscribe(res=>{
      this.groupEvidence = res
      console.log(res)
    })
  }

  ngOnInit(): void {
    if(this.indicatorID && this.typeID){
      this.fetchSubindicator()
    }
  }

}
