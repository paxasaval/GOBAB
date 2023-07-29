import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-steps-subindicator',
  templateUrl: './steps-subindicator.component.html',
  styleUrls: ['./steps-subindicator.component.scss']
})
export class StepsSubindicatorComponent implements OnInit {

  @Input() step:number=0
  @Output() stepEvent = new EventEmitter<number>()

  constructor() { }
  changeStep(event:number){
    this.step=event
    this.stepEvent.emit(event)
  }
  ngOnInit(): void {
  }

}
