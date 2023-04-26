import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Evidence } from 'src/app/models/evidence';
import { TypeID } from 'src/app/models/type';
import { TypeService } from 'src/app/services/type/type.service';

@Component({
  selector: 'app-add-subindicator',
  templateUrl: './add-subindicator.component.html',
  styleUrls: ['./add-subindicator.component.scss']
})
export class AddSubindicatorComponent implements OnInit {

  portada:CharacteristicID={
    group:'0',
    groupName:'Suba la infografia/portada del proyecto',
    id:'',
    isRequired:true,
    name:'Portada',
    required:true,
    tier:1,
    unique:true
  }
  nameControl = new FormControl('')
  typeControl = new FormGroup({
    type:new FormControl()
  })
  responsibleControl = new FormControl('')
  types:TypeID[]=[]
  arrayEvidence:Evidence[] = []
  characteristics:CharacteristicID[] = []
  group1:CharacteristicID[] = []
  group2:CharacteristicID[] = []
  group3:CharacteristicID[] = []
  constructor(
    private typeService:TypeService
  ) { }

  groupCharacteristics(characteristics:CharacteristicID[]){
    this.group1=[]
    this.group2=[]
    this.group3=[]
    characteristics.map(characteristic=>{
      if(characteristic.group==='1'){
        this.group1.push(characteristic)
      }
      if(characteristic.group==='2'){
        this.group2.push(characteristic)
      }
      if(characteristic.group==='3'){
        this.group3.push(characteristic)
      }
    })
  }

  selectChanges(event:any){
    const type = event as TypeID
    this.characteristics = type.characteristics as CharacteristicID[]
    this.groupCharacteristics(this.characteristics)
  }

  addEvidence(event: Evidence[]) {
    //console.log(event)
    event.map(evidence => {
      const found = this.arrayEvidence.findIndex(e => e.name == evidence.name)
      if (found == -1) {
        this.arrayEvidence.push(evidence)
      }else{
        this.arrayEvidence[found] = evidence
      }
    })
  }
  saveEvidence() {
    console.log(this.arrayEvidence)
  }
  cancelEvidence() {
    window.location.reload()
  }

  ngOnInit(): void {
    this.typeService.getTypeByMandatory(false).subscribe(
      types=>{
        this.types=types
      }
    )
  }

}
