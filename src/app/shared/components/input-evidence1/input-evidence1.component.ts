import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CharacteristicID } from 'src/app/models/characteristic';

@Component({
  selector: 'app-input-evidence1',
  templateUrl: './input-evidence1.component.html',
  styleUrls: ['./input-evidence1.component.scss']
})
export class InputEvidence1Component implements OnInit {

  @Input() characteristic!:CharacteristicID

  evidenceForm = new FormGroup({
    observation:new FormControl(''),
    link:new FormControl('')
  })

  pdfs: File[] = []
  files:File[] = []
  getFiles(event:any){
    this.files.push(event.target.files[0])
    console.log(this.files)
  }

  onDrop(event: any) {
    console.log(event)
    const files: FileList = event.dataTransfer!.files;
    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        this.pdfs.push(file);
      }
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}
