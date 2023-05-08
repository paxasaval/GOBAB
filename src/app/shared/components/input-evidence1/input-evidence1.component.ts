import { Evidence } from './../../../models/evidence';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharacteristicID } from 'src/app/models/characteristic';

interface FormEvidence {
  form: FormGroup,
  evidence?: File,
  flag: boolean,
  changeName: string
}
@Component({
  selector: 'app-input-evidence1',
  templateUrl: './input-evidence1.component.html',
  styleUrls: ['./input-evidence1.component.scss']
})
export class InputEvidence1Component implements OnInit {

  @Input() characteristic!: CharacteristicID
  @Output() evidenceEmit = new EventEmitter<Evidence[]>()

  fileFlag = true
  inputChange = 'enlace'
  inputChange1 = 'archivo'
  pdfs: File[] = []
  files: File[] = []
  evidences: Evidence[] = []

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

  constructor() { }

  changeObservation(event: any) {
    this.emitEvidence()
  }
  changeLink(event: any) {
    this.emitEvidence()
  }
  ngOnInit(): void {
  }

}
