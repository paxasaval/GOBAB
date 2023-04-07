import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-sub-indicator-specific',
  templateUrl: './sub-indicator-specific.component.html',
  styleUrls: ['./sub-indicator-specific.component.scss']
})

export class SubIndicatorSpecificComponent implements OnInit {

  myContol = new FormControl('')
  options:string[]=['One', 'Two', 'Three'];
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

  search(){

  }
}
