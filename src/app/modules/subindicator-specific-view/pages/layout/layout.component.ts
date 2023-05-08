import { CharacteristicID, CharacteristicWithEvidence } from './../../../../models/characteristic';
import { mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CharacteristicsService } from 'src/app/services/characteristics/characteristics.service';
import { TypeService } from 'src/app/services/type/type.service';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { SubindicatorID } from 'src/app/models/subindicators';
import { TypeID } from 'src/app/models/type';
import { Evidence, EvidenceID } from 'src/app/models/evidence';
import { DocumentService } from 'src/app/services/document/document.service';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { IndicatorID } from 'src/app/models/indicator';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  id=''
  characteristicsList:CharacteristicID[]=[]
  evidenceList:EvidenceID[]=[]
  subindicator!:SubindicatorID
  typeID:string|TypeID=''
  characteristicWithEvidence:CharacteristicWithEvidence[]=[]
  titleIndicator=''
  portadaURL:string=''
  constructor(
    private typeService:TypeService,
    private characteristicService:CharacteristicsService,
    private route:ActivatedRoute,
    private subindicatorService:SubindicatorService,
    private documentService:DocumentService
    ) { }


  setPortada(){
    this.documentService.setDocumentSelected(this.portadaURL)
  }

  filterEvidences(characteristics:CharacteristicID[],evidences:EvidenceID[]):CharacteristicWithEvidence[]{
    return characteristics.map(characteristic=>{
      const evidencesFounded = evidences.filter(evidence=>evidence.characteristicID==characteristic.id)
      return {characteristic:characteristic,evidences:evidencesFounded}
    })
  }
  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap((params:Params)=>{
        return this.subindicatorService.getSubindicatorByID(params['id'])
      })
    ).subscribe(
      subindicator=>{
        this.subindicator=subindicator
        this.typeID = subindicator.typeID as TypeID
        this.characteristicsList = this.typeID.characteristics as CharacteristicID[]
        this.evidenceList = subindicator.evidences as EvidenceID[]
        const indicatorInstanceID = subindicator.indicadorID as IndicatorInstanceID
        const indicatorID =indicatorInstanceID.indicatorID as IndicatorID
        this.titleIndicator = `${indicatorID.quadrant}.${indicatorID.number} ${indicatorID.name}`
        if(subindicator.requireCover){
          this.portadaURL = subindicator.cover!
          this.documentService.setDocumentSelected(this.portadaURL)
        }
        this.characteristicWithEvidence=this.filterEvidences(this.characteristicsList,this.evidenceList)
      }
    )

  }

}
