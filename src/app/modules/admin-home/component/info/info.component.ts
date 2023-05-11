import { Component, Input, OnInit } from '@angular/core';
import { SubindicatorID } from 'src/app/models/subindicators';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() subindicator!:SubindicatorID

  constructor() { }

  ngOnInit(): void {
  }

}
