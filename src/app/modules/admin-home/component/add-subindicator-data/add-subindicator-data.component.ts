import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Evidence } from 'src/app/models/evidence';
import { TypeID } from 'src/app/models/type';
import { TypeService } from 'src/app/services/type/type.service';

export interface dataSubindicator {
  flag: boolean,
  data: {
    name: string,
    type: TypeID,
    responsible: string,
    portada?: Evidence[]
  }
}

@Component({
  selector: 'app-add-subindicator-data',
  templateUrl: './add-subindicator-data.component.html',
  styleUrls: ['./add-subindicator-data.component.scss']
})
export class AddSubindicatorDataComponent implements OnInit,OnChanges {
  //Portada
  portada: CharacteristicID = {
    group: '0',
    groupName: 'Suba la infografia/portada del proyecto',
    id: '',
    isRequired: true,
    name: 'Portada',
    required: true,
    tier: 1,
    unique: true,
    allowed_formats:['.pdf']
  }
  nameControl = new FormControl('')
  typeControl = new FormGroup({
    type: new FormControl()
  })
  responsibleControl = new FormControl('')
  portadaArray: Evidence[] = []
  //si volvemos
  @Input() nameState!:string
  @Input() typeState!:TypeID
  @Input() responsibleState!:string
  @Input() portadaState!:Evidence[]
  //
  arrayEvidence: Evidence[] = []
  types: TypeID[] = []
  //emmit
  @Output() dataEvent = new EventEmitter<dataSubindicator>()
  constructor(
    private typeService: TypeService,
  ) { }

  selectChanges(event: any) {
    const type = event as TypeID
    this.typeControl.setValue({ type: type })
  }

  handlePortada(event: Evidence[]) {
    this.portadaArray = event
  }

  continue() {
    const flag = true
    const dataSend:dataSubindicator={
      flag:flag,
      data:{
        name:this.name,
        type:this.type,
        responsible:this.responsible,
        portada:this.portadaArray
      }
    }
    this.dataEvent.emit(dataSend)
  }

  ngOnChanges(changes:SimpleChanges){
    if(this.typeState){
      this.nameControl.setValue(this.nameState)
      this.typeControl.controls['type'].setValue(this.typeState)
      console.log(this.type)
      this.responsibleControl.setValue(this.responsibleState)
      this.portadaArray=this.portadaState
    }
  }
  compareFn(x:TypeID,y:TypeID){
    return x && y ? x.id===y.id:x===y
  }
  ngOnInit(): void {
    combineLatest([
      this.typeService.getTypeByMandatory(false)
    ]).subscribe(([types]) => {
      this.types = types
    })
  }

  get name() {
    return this.nameControl.value
  }

  get type() {
    return this.typeControl.get('type')?.value
  }
  get responsible() {
    return this.responsibleControl.value
  }
}
