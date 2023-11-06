import { concatMap } from 'rxjs/operators';
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
import { CharacteristicsService } from 'src/app/services/characteristics/characteristics.service';
import { Valuation, ValuationID } from 'src/app/models/valuation';
import { Rubric } from 'src/app/models/rubric';


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
  valuation: ValuationID[] =[]
  rubric: Rubric[]=[]

  qualifyControl = new FormControl(0)
  commitControl=new FormControl()

  constructor(
    private evidenceService:EvidenceService,
    private characteristicService:CharacteristicsService,
    private modal: NzModalRef
  ) { }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  qualify(){
    let qualify = 1
    this.rubric.forEach(r=>{
      if(r.qualify){
        qualify+=1
      }
    })
    const commit = ''
    Swal.fire({
      title:'Calificando',
      didOpen:()=>{
        Swal.showLoading()
      }
    })
    this.evidenceService.qualifyEvidence(this.evidence.id,qualify,commit).subscribe(
      evidence=>{
        Swal.close()
        this.modal.close()
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
    this.evidenceSubscribe = this.evidenceService.getEvidenceByID(this.evidence.id)
    .pipe(concatMap(evidence=>{
      this.evidenceID=evidence
      const characteristic = evidence.characteristicID as CharacteristicID
      const id = characteristic.id
      return(this.characteristicService.getValuationByCharacteristicID(id))
    }))
    .subscribe(chracteristic=>{
        this.valuation = chracteristic.valuation!
        this.rubric=[]
        let maxValue = 0
        this.valuation.forEach(v=>{
          maxValue+=v.maxValue
          this.rubric.push({
            valuation:v.id,
            qualify:false
          })
        })
        console.log(this.rubric)
      }
    )

  }

}
