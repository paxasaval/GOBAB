import { Evidence } from './../../../../models/evidence';
import { combineLatest, from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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
export class IndicatorGeneralComponent implements OnInit {

  type!: TypeID
  indicator!: IndicatorInstanceID
  flag:boolean=false
  subIndicator!: SubindicatorID | undefined
  characteristics: CharacteristicID[] = []
  id = ''
  arrayEvidence: Evidence[] = []
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


  findSubindicator(type: TypeID, subindicators: SubindicatorID[]) {
    return subindicators.find(subindicator => subindicator.typeID == type.id)
  }

  addEvidence(event: Evidence[]) {
    console.log(event)
    event.map(evidence => {
      evidence.subIndicatorID=this.subIndicator?.id!
      const found = this.arrayEvidence.findIndex(e => e.name == evidence.name)
      if (found == -1) {
        this.arrayEvidence.push(evidence)
      }else{
        this.arrayEvidence[found] = evidence
      }
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogAbstractComponent,{
      data:{
        evidence:this.arrayEvidence,
        type:this.type
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        console.log('saving Evidence...')
        this.saveEvidence()
      }
    })
  }

  saveEvidence() {
    from(this.arrayEvidence).pipe(
      concatMap(evidence=>{
        return this.evidenceService.addEvidence(evidence)
        })
      ).subscribe(saveEvidence=>{
        console.log(saveEvidence)
      },error=>{
        console.log(error)
      })
  }
  cancelEvidence() {
    window.location.reload()
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.data.typeID
    combineLatest([this.typeService.getTypeById(this.id), this.indicatorInstanceService.getIndicatorInstance()]).subscribe(
      ([type, indicator]) => {
        this.type = type
        this.indicator=indicator
        if(indicator.id!=''){
          this.flag=true
        }
        const indicatorCatalog = indicator.indicatorID as IndicatorID
        this.subIndicator = this.findSubindicator(type, indicator.subindicators as SubindicatorID[])
        if (this.subIndicator) {
          this.characteristics = type.characteristics as CharacteristicID[]
          this.titleService.setTitle([indicatorCatalog.quadrantName,indicatorCatalog.name,this.subIndicator.name])
        }
      }
    )

  }

}
