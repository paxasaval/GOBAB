import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { SubindicatorID } from 'src/app/models/subindicators';
import { DocumentService } from 'src/app/services/document/document.service';
import { CharacteristicID, CharacteristicWithEvidence } from 'src/app/models/characteristic';
import { EvidenceID } from 'src/app/models/evidence';
import { TypeID } from 'src/app/models/type';
import { IndicatorID } from 'src/app/models/indicator';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { TitleService } from 'src/app/services/title/title.service';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';

@Component({
  selector: 'app-subindicator',
  templateUrl: './subindicator.component.html',
  styleUrls: ['./subindicator.component.scss']
})
export class SubindicatorComponent implements OnInit {

  subindicator!:SubindicatorID
  portadaURL:string=''
  evidenceList:EvidenceID[]=[]
  typeID:string|TypeID=''
  characteristicWithEvidence:CharacteristicWithEvidence[]=[]
  characteristicsList:CharacteristicID[]=[]
  indicatorCatalog!:IndicatorID
  constructor(
    private route:ActivatedRoute,
    private subindicatorService:SubindicatorService,
    private documentService:DocumentService,
    private indicatorService:IndicatorInstanceService,
    private titleService:TitleService
  ) { }

  setPortada(){
    console.log(this.portadaURL)
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
      switchMap(params=>{
        return this.subindicatorService.getSubindicatorByID(params['subindicatorID'])
      })
    ).pipe(
      switchMap(
      subindicator=>{
        this.subindicator=subindicator
        this.typeID = subindicator.typeID as TypeID
        this.characteristicsList = this.typeID.characteristics as CharacteristicID[]
        this.evidenceList = subindicator.evidences as EvidenceID[]
        if(subindicator.requireCover){
          console.log(subindicator.cover)
          this.portadaURL = subindicator.cover!
          this.documentService.setDocumentSelected(this.portadaURL)
        }
        this.characteristicWithEvidence=this.filterEvidences(this.characteristicsList,this.evidenceList)
        return this.indicatorService.getIndicatorInstance()
      })
    ).subscribe(indicatorInstance=>{
      this.indicatorCatalog = indicatorInstance.indicatorID as IndicatorID
      this.titleService.setRoute([
        {
          name:this.indicatorCatalog.quadrantName,
          route:`/user/quadrant/${this.indicatorCatalog.quadrant}`
        },
        {
          name:this.indicatorCatalog.name,
          route:`/user/quadrant/${this.indicatorCatalog.quadrant}/indicator/${this.indicatorCatalog.number}/${indicatorInstance.id}`
        },
        {
          name:this.subindicator.name,
          route:`/user/quadrant/${this.indicatorCatalog.quadrant}/indicator/${this.indicatorCatalog.number}/${indicatorInstance.id}/${this.subindicator.id}`
        }
      ])
    })
  }

}
