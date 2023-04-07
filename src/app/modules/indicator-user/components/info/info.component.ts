import { SimpleChanges,Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnChanges {



  @Input() colorSelected='#D9D9D9'
  @Input() qualification:number = 0
  qualificationString:string = 'No evaluado'

  dateUpdate= new Date()

  constructor() { }

  setQualification(){
    if(this.qualification==1){
      this.qualificationString='Rojo'
    }
    if(this.qualification==2){
      this.qualificationString='Amarillo'
    }
    if(this.qualification==3){
      this.qualificationString='Verde'

    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setQualification()
  }

  ngOnInit(): void {
    this.setQualification()
  }


}
