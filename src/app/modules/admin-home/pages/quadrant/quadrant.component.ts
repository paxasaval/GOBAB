import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/services/title/title.service';

export interface Data {
    date: Date,
    numberIndicator:number,
    subindicadorName:string,
    responsible:string,
    numberEvidences:number,
    numberCharacteristics:number
    state:number
}

@Component({
  selector: 'app-quadrant',
  templateUrl: './quadrant.component.html',
  styleUrls: ['./quadrant.component.scss']
})
export class QuadrantComponent implements OnInit {

  id!:string
  data:Data[]=[
    {
      date: new Date(),
      numberIndicator:1,
      subindicadorName:'1. Instancia Responsable',
      responsible:'Paul X. Sanchez  V',
      numberEvidences: 75,
      numberCharacteristics:80,
      state:1
    },
    {
      date: new Date(),
      numberIndicator:1,
      subindicadorName:'1. Instancia Responsable',
      responsible:'Paul X. Sanchez  V',
      numberEvidences: 75,
      numberCharacteristics:80,
      state:1
    }
  ]

  constructor(
    private titleService:TitleService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params.id
      this.titleService.setTitle(`Cuadrante ${this.id}`)
    })
  }

}
