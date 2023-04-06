import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  evaluated = 9
  totalIndicators=10

  totalEvidences = 210

  evaluatedSub = 75
  totalSubindicators = 100

  red=10
  yellow=20
  green=30
  grey=40
  constructor() { }

  ngOnInit(): void {
  }

}
