import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CharacteristicID } from 'src/app/models/characteristic';
interface FilesControlForm{
  nameControl:FormControl,
  fileControl:FormControl,
  observationControl:FormControl
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
    unique:true
  }
  nameControl = new FormControl('')
  fileControl = new FormControl('')
  observationControl = new FormControl('')
  arrayEvidence:FilesControlForm[] = [
    {
      nameControl:this.nameControl,
      fileControl:this.fileControl,
      observationControl:this.observationControl
    }
  ]

  constructor() { }

  addFile(){
    const newNameControl = new FormControl('')
    const newFileControl = new FormControl('')
    const newObservationControl = new FormControl('')
    this.arrayEvidence.push({
      nameControl:newNameControl,
      fileControl:newFileControl,
      observationControl:newObservationControl
    })

  }

  ngOnInit(): void {
  }

}
