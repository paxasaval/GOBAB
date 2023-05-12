import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-steps-evidence',
  templateUrl: './steps-evidence.component.html',
  styleUrls: ['./steps-evidence.component.scss']
})
export class StepsEvidenceComponent implements OnInit,OnChanges {

  @Input() step:number=0
  @Output() stepEvent = new EventEmitter<number>()

  constructor() { }

  changeStep(event:number){
    this.step=event
    console.log(event)
    this.stepEvent.emit(event)
  }

  ngOnChanges(changes:SimpleChanges){

  }

  ngOnInit(): void {
  }

}
