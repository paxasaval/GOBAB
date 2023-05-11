import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {

  array=[1,2,3,4]
  urls:string[]=[
    '../../../../../assets/slideHome1.png',
    '../../../../../assets/slideHome1.png',
    '../../../../../assets/slideHome1.png'
  ]
  effect = 'scrollx'

  constructor() { }

  findIndex(urls:string[],img:string){
    return urls.findIndex(url=>url==img)
  }

  ngOnInit(): void {
    const img='../../../../../assets/slideHome1.png'
    
  }

}
