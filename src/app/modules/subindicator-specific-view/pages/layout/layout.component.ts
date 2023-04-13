import { Component, OnInit } from '@angular/core';
import { CharacteristicID } from 'src/app/models/characteristic';
import { CharacteristicsService } from 'src/app/services/characteristics/characteristics.service';
import { TypeService } from 'src/app/services/type/type.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  id='6423abae357f0145adbca037'
  characteristicsList:CharacteristicID[]=[]
  constructor(
    private typeService:TypeService,
    private characteristicService:CharacteristicsService
  ) { }

  ngOnInit(): void {
    this.characteristicService.getCharacteristicsByType(this.id).subscribe(
      characteristics=>{
        this.characteristicsList=characteristics
      }
    )
  }

}
