import { SimpleChanges,Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnChanges {



  @Input() colorSelected='#D9D9D9'
  @Input() qualification:number = 0
  @Input() lastUpdate!:Date
  qualificationString:string = 'No evaluado'

  constructor() { }

  setQualification(){
    if(this.qualification==1){
      this.qualificationString='Rojo'
      this.colorSelected='#E00613'
    }
    if(this.qualification==2){
      this.qualificationString='Amarillo'
      this.colorSelected='#FCEA00'

    }
    if(this.qualification==3){
      this.qualificationString='Verde'
      this.colorSelected='#009640'
    }
    if(this.qualification==0){
      this.qualificationString='No evaluado'
      this.colorSelected='#D9D9D9'
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setQualification()
  }

  ngOnInit(): void {
    this.setQualification()
  }


}
