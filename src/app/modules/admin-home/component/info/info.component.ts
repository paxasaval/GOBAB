import { Component, Input, OnInit } from '@angular/core';
import { SubindicatorID } from 'src/app/models/subindicators';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  subindicator!:SubindicatorID

  constructor(
    private subindicatorService:SubindicatorService
  ) { }

  ngOnInit(): void {
    this.subindicatorService.getSelectedSubindicator()
      .subscribe(subindicator=>{
        this.subindicator=subindicator
      })
  }

}
