import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  colorSelected='#FCEA00'
  qualification='Amarillo'
  dateUpdate= new Date()

  constructor() { }

  ngOnInit(): void {
  }

}
