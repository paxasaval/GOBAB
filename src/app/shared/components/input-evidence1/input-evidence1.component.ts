import { Evidence } from './../../../models/evidence';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacteristicID } from 'src/app/models/characteristic';
import { UserID } from 'src/app/models/user';

interface FormEvidence {
  form: FormGroup,
  evidence?: File,
  flag: boolean,
  changeName: string
}
interface ExtraInput{
  clave:string,
  tipo:string,
  valor:any|any[]
}
@Component({
  selector: 'app-input-evidence1',
  templateUrl: './input-evidence1.component.html',
  styleUrls: ['./input-evidence1.component.scss']
})
export class InputEvidence1Component implements OnInit, OnChanges {

  @Input() characteristic!: CharacteristicID
  @Output() evidenceEmit = new EventEmitter<Evidence[]>()
  @Input() opcional:boolean=false
  fileFlag = true
  inputChange = 'enlace'
  inputChange1 = 'archivo'
  pdfs: File[] = []
  files: File[] = []
  evidences: Evidence[] = []
  helpS!:string
  extras:ExtraInput[] = []

  arrayFormExtras: FormControl[]=[]

  evidenceForm = new FormGroup({
    observation: new FormControl(''),
    link: new FormControl(''),
    file: new FormControl(null)
  })

  arrayForms: FormEvidence[] = [
    {
      form: this.evidenceForm,
      flag: this.fileFlag,
      changeName: this.inputChange
    }
  ]

  changeInput(form: FormEvidence) {
    form.flag = !form.flag
    if (form.changeName === this.inputChange) {
      form.changeName = this.inputChange1

    } else if (form.changeName === this.inputChange1) {
      form.changeName = this.inputChange
    }

  }


  getFiles(event: any, form: FormEvidence) {
    const file = event.target.files[0] as File
    form.evidence = file
    this.emitEvidence()
  }



  addEvidence() {
    const newForm = new FormGroup({
      observation: new FormControl(''),
      link: new FormControl(''),
      file: new FormControl(null)
    })
    this.arrayForms.push({ form: newForm, flag: true, changeName: 'enlace' })
  }
  deleteInput(formEvidence:FormEvidence){
    const i = this.arrayForms.indexOf(formEvidence)
    this.arrayForms = this.arrayForms.splice(i,1)
  }
  dectectIndex(formEvidence:FormEvidence){
    return this.arrayForms.indexOf(formEvidence)
  }
  emitEvidence() {
    this.evidences = []
    this.arrayForms.forEach(formEvidence => {
      if (formEvidence.evidence) {
        const newEvidence: Evidence = {
          characteristicID: this.characteristic.id,
          name: formEvidence.evidence.name,
          link: formEvidence.evidence,
          note: formEvidence.form.get('observation')?.value,
          subIndicatorID: '',
          verified: false
        }
        this.evidences.push(newEvidence)
      }
      if (formEvidence.form.get('link')?.value != '') {
        const newEvidence: Evidence = {
          characteristicID: this.characteristic.id,
          name: this.characteristic.name,
          link: formEvidence.form.get('link')?.value,
          note: formEvidence.form.get('observation')?.value,
          subIndicatorID: '',
          verified: false
        }
        this.evidences.push(newEvidence)
      }
    })
    if(this.extras && this.evidences.length>0){
      this.extras.forEach(extra=>{
        if(!this.evidences[0].extras){
          this.evidences[0].extras=[]
        }
        console.log(this.arrayFormExtras[this.extras.indexOf(extra)].value)
        this.evidences[0].extras?.push({
          clave:extra.clave,
          valor:this.arrayFormExtras[this.extras.indexOf(extra)].value
        })
      })
    }
    console.log(this.evidences)
    this.evidenceEmit.emit(this.evidences)

  }

  onDrop(event: any) {
    const files: FileList = event.dataTransfer!.files;
    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        this.pdfs.push(file);
        //this.emitEvidence(file)
      }
    });

  }

  filterExtras(extraInfo:any):ExtraInput[]{
    //console.log(extraInfo)
    //console.log(typeof extraInfo)
    const res = Object.entries(extraInfo).map(([c,v])=>{
      const value = v as string
      return{
       clave:c,
       tipo:value,
       valor:''
      }
    })
    return res
  }

  constructor() { }

  changeObservation(event: any) {
    this.emitEvidence()
  }
  changeLink(event: any) {
    this.emitEvidence()
  }
  changeExtra(event:any){
    this.emitEvidence()

  }
  ngOnInit(): void {

  }
  ngOnChanges(){
    if(this.characteristic.extras){
    this.extras=this.filterExtras(this.characteristic.extras)
    this.arrayFormExtras=[]
    this.extras.forEach(e=>{
      this.arrayFormExtras.push(
        new FormControl('')
      )
    })
    }
    if(this.characteristic.type==2){
      this.arrayForms.forEach(form=>{
        form.changeName=this.inputChange
        form.flag=false
      })
    }
    if(this.characteristic.help){
    this.helpS=this.characteristic.help
    console.log(this.characteristic)
    }
  }

}
