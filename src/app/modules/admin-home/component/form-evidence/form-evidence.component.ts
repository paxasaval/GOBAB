import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Evidence, EvidenceID } from 'src/app/models/evidence';
import { SubindicatorID } from 'src/app/models/subindicators';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { TypeService } from 'src/app/services/type/type.service';

export interface ContinueEvidences {
  flag?: boolean,
  evidences?: Evidence[]
}
export interface ContinueExtraInfo {
  flag?: boolean,
  extras?: ExtraInfoContinue[]
}
export interface ExtraInfo {
  clave?: string,
  tipo?: string,
  valor?: any
}
export interface ExtraInfoContinue{
  clave: string | undefined, valor: any
}
@Component({
  selector: 'app-form-evidence',
  templateUrl: './form-evidence.component.html',
  styleUrls: ['./form-evidence.component.scss']
})
export class FormEvidenceComponent implements OnInit {

  characteristics!: CharacteristicID[]
  subIndicator!: SubindicatorID
  arrayEvidence: Evidence[] = []
  extraInfo!: any
  flagExtra = false
  //extraInfor
  extraFormGroup: FormGroup = new FormGroup({})
  inputs:ExtraInfo[]=[]
  radioBtn:ExtraInfo[]=[]
  multiInput:ExtraInfo[]=[]
  corresponsables:string[]=[]
  corresponsablesForm:FormControl[]=[new FormControl('')]
  @Output() evidencesEvent = new EventEmitter<ContinueEvidences>()
  @Output() extraInfoEvent = new EventEmitter<ContinueExtraInfo>()

  constructor(
    private subindicatorService: SubindicatorService,
    private typeService: TypeService,
  ) { }

  addEvidence(event: Evidence[]) {
    event.map(evidence => {
      evidence.subIndicatorID = this.subIndicator?.id!
      const found = this.arrayEvidence.findIndex(e => e.name == evidence.name)
      if (found == -1) {
        this.arrayEvidence.push(evidence)
      } else {
        this.arrayEvidence[found] = evidence
      }
    })
  }
  continue(): void {
    const flag = true
    console.log(this.arrayEvidence)
    this.evidencesEvent.emit({ flag: flag, evidences: this.arrayEvidence })
    const extraArray:ExtraInfoContinue[]  = []
    this.inputs.forEach(i=>{
      const extra = {clave:i.clave,valor:this.extraFormGroup.get(i.clave!)?.value}
      extraArray.push(extra)
    })
    this.radioBtn.forEach(i=>{
      const extra = {clave:i.clave,valor:this.extraFormGroup.get(i.clave!)?.value}
      extraArray.push(extra)
    })
    this.multiInput.forEach(i=>{
      let array:string[] = []
      let extra = {clave:i.clave,valor:array}
      this.corresponsablesForm.forEach(x=>{
        const value = x.get(i.clave!)?.value as string
        array.push(value)
      })
      extra.valor=array
      extraArray.push(extra)
    })
    console.log(extraArray)
    this.extraInfoEvent.emit({flag:true,extras:extraArray})
  }
  //Extraer las X(3) opciones que existen para extra info: 0:string, 1:single_Option, 2:Array<String>
  mapExtraInfo(objeto: any) {
    let inputs: ExtraInfo[] =[]
    let radioBtn: ExtraInfo[]=[]
    let multiInput: ExtraInfo[]=[]
    const result = Object.entries(objeto).map(([clave, valor]) => {
      const value = valor as string[]
      return {
        clave,
        tipo: value[0],
        valor: value[1]
      }
    })
    this.corresponsables = []
    result.forEach(res=>{
      if(res.tipo==='String'){
        inputs.push(res)
        this.extraFormGroup.addControl(res.clave,new FormControl(''))
      }
      if(res.tipo==='single option'){
        radioBtn.push(res)
        this.extraFormGroup.addControl(res.clave,new FormControl(''))

      }
      if(res.tipo==='Array<String>'){
        multiInput.push(res)
        //this.extraFormGroup.get(res.clave)?.value
        this.corresponsables.push('')
        console.log('agregado')

      }
    })
    return [inputs,radioBtn,multiInput]
  }

  addInput(clave:string){
    this.corresponsables.push('')
    this.corresponsablesForm.push(new FormControl(''))
  }

  ngOnInit(): void {
    combineLatest([this.subindicatorService.getSelectedSubindicator(), this.typeService.getTypeSelected()])
      .subscribe(([subindicator, type]) => {
        if (type.extraInfo) {
          this.flagExtra = true
          const extract=this.mapExtraInfo(type.extraInfo)
          this.inputs=extract[0]
          this.radioBtn=extract[1]
          this.multiInput=extract[2]
        }
        this.extraInfo = type.extraInfo
        this.characteristics = type.characteristics as CharacteristicID[]
        this.subIndicator = subindicator
      })
  }

}
