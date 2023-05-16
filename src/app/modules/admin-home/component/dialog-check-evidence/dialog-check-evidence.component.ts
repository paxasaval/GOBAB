import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvidenceID } from 'src/app/models/evidence';
import { UserID } from 'src/app/models/user';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';

@Component({
  selector: 'app-dialog-check-evidence',
  templateUrl: './dialog-check-evidence.component.html',
  styleUrls: ['./dialog-check-evidence.component.scss']
})
export class DialogCheckEvidenceComponent implements OnInit,OnChanges {

  isVisible =true
  @Input()evidence!:EvidenceID
  evidenceSubscribe!:Subscription

  evidenceID!:EvidenceID
  constructor(
    private evidenceService:EvidenceService
  ) { }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  evidenceAuthor(evidence:EvidenceID){
    console.log(evidence.author)
    return evidence.author as UserID
  }

  ngOnChanges(change:SimpleChanges){
    if(this.evidenceSubscribe){
      this.evidenceSubscribe.unsubscribe()
    }
    this.evidenceSubscribe = this.evidenceService.getEvidenceByID(this.evidence.id).subscribe(
      evidence=>{
        this.evidenceID=evidence
      }
    )
  }

  ngOnInit(): void {
    if(this.evidenceSubscribe){
      this.evidenceSubscribe.unsubscribe()
    }
    this.evidenceSubscribe = this.evidenceService.getEvidenceByID(this.evidence.id).subscribe(
      evidence=>{
        this.evidenceID=evidence
      }
    )

  }

}
