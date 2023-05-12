import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { combineLatest } from 'rxjs';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Evidence, EvidenceID } from 'src/app/models/evidence';
import { SubindicatorID } from 'src/app/models/subindicators';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { TypeService } from 'src/app/services/type/type.service';

export interface ContinueEvidences{
  flag?:boolean,
  evidences?:Evidence[]
}
@Component({
  selector: 'app-form-evidence',
  templateUrl: './form-evidence.component.html',
  styleUrls: ['./form-evidence.component.scss']
})
export class FormEvidenceComponent implements OnInit {

  characteristics!:CharacteristicID[]
  subIndicator!:SubindicatorID
  arrayEvidence: Evidence[] = []
  @Output() evidencesEvent = new EventEmitter<ContinueEvidences>()
  constructor(
    private subindicatorService:SubindicatorService,
    private typeService:TypeService,
  ) { }

  addEvidence(event: Evidence[]) {
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
  continue(){
    const flag = true
    this.evidencesEvent.emit({flag:flag,evidences:this.arrayEvidence})
  }
  ngOnInit(): void {
    combineLatest([this.subindicatorService.getSelectedSubindicator(),this.typeService.getTypeSelected()])
      .subscribe(([subindicator,type])=>{
        this.characteristics=type.characteristics as CharacteristicID[]
        this.subIndicator=subindicator
      })
  }

}
