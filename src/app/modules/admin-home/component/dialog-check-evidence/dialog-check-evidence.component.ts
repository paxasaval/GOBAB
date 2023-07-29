import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { title } from 'process';
import { Subscription } from 'rxjs';
import { CharacteristicID } from 'src/app/models/characteristic';
import { EvidenceID } from 'src/app/models/evidence';
import { UserID } from 'src/app/models/user';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialog-check-evidence',
  templateUrl: './dialog-check-evidence.component.html',
  styleUrls: ['./dialog-check-evidence.component.scss']
})
export class DialogCheckEvidenceComponent implements OnInit,OnChanges {

  isVisible =true
  @Input() evidence!:EvidenceID
  @Input() characteristic!:CharacteristicID
  evidenceSubscribe!:Subscription
  @Output() evidenceEmmit!: EventEmitter<EvidenceID>
  evidenceID!:EvidenceID

  qualifyControl = new FormControl(0)
  commitControl=new FormControl()

  constructor(
    private evidenceService:EvidenceService,
    private modal: NzModalRef
  ) { }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  qualify(){
    const qualify = this.qualifyControl.value
    const commit = this.commitControl.value
    Swal.fire({
      title:'Calificando',
      didOpen:()=>{
        Swal.showLoading()
      }
    })
    this.evidenceService.qualifyEvidence(this.evidence.id,qualify,commit).subscribe(
      evidence=>{
        Swal.close()
      }
    )

  }
  cancel(){
    this.modal.destroy({data:'destroy'})
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
