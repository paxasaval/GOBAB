import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Evidence } from 'src/app/models/evidence';

interface FilesControlForm{
  nameControl:FormControl,
  fileControl:FormControl,
  observationControl:FormControl,
  linkControl:FormControl
  evidence?:File,
  flag:boolean,
  changeName:string
}
@Component({
  selector: 'app-input-evidence2',
  templateUrl: './input-evidence2.component.html',
  styleUrls: ['./input-evidence2.component.scss']
})
export class InputEvidence2Component implements OnInit {

  @Input() characteristic:CharacteristicID = {
    group:'',
    groupName:'',
    id:'',
    isRequired:true,
    name:'',
    required:true,
    tier:1,
    unique:true,
    allowed_formats:['.pdf']
  }
  @Output() evidenceEmit = new EventEmitter<Evidence[]>()

  nameControl = new FormControl('')
  fileControl = new FormControl(null)
  observationControl = new FormControl('')
  linkControl = new FormControl('')
  type1='enlace'
  type2='archivo'
  evidences:Evidence[]=[]
  arrayEvidence:FilesControlForm[] = [
    {
      nameControl:this.nameControl,
      fileControl:this.fileControl,
      observationControl:this.observationControl,
      linkControl:this.linkControl,
      changeName:'enlace',
      flag:true,
    }
  ]

  constructor() { }

  addFile(){
    const newNameControl = new FormControl('')
    const newFileControl = new FormControl('')
    const newObservationControl = new FormControl('')
    const newLinkControl = new FormControl('')

    this.arrayEvidence.push({
      nameControl:newNameControl,
      fileControl:newFileControl,
      observationControl:newObservationControl,
      linkControl:newLinkControl,
      changeName:'enlace',
      flag:true,
    })

  }

  changeName(evidence:FilesControlForm){
    evidence.flag=!evidence.flag
    if(evidence.linkControl.value!=''){
      evidence.linkControl.setValue('')
    }
    if(evidence.evidence){
      evidence.evidence=undefined
      evidence.fileControl =  new FormControl(null)
    }
    if(evidence.changeName==this.type1){
      evidence.changeName=this.type2
    }else if(evidence.changeName==this.type2){
      evidence.changeName=this.type1
    }
  }

  getFile(event:any,form:FilesControlForm){
    const file = event.target.files[0] as File
    form.evidence = file
    this.emitEvidence()
  }
  getName(event:any){
    this.emitEvidence()
  }
  getLink(event:any){
    this.emitEvidence()

  }
  getObservation(event:any){
    this.emitEvidence()

  }
  emitEvidence(){
    this.evidences = []
    this.arrayEvidence.forEach(formEvidence=>{
      if(formEvidence.evidence){
        const newEvidence:Evidence ={
          characteristicID:this.characteristic.id,
          name:formEvidence.nameControl.value,
          link:formEvidence.evidence,
          note:formEvidence.observationControl.value,
          subIndicatorID:'',
          verified:false
        }
        this.evidences.push(newEvidence)
      }else if(formEvidence.linkControl.value!=''){
        const newEvidence:Evidence ={
          characteristicID:this.characteristic.id,
          name:formEvidence.nameControl.value,
          link:formEvidence.linkControl.value,
          note:formEvidence.observationControl.value,
          subIndicatorID:'',
          verified:false
        }
        this.evidences.push(newEvidence)
      }
    })
    this.evidenceEmit.emit(this.evidences)
  }

  ngOnInit(): void {
  }

}
