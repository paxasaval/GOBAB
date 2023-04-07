import { CharacteristicID } from './../../../../models/characteristic';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CharacteristicsService } from 'src/app/services/characteristics/characteristics.service';
import { TypeService } from 'src/app/services/type/type.service';
import { switchMap } from 'rxjs/operators';
import { TypeID } from 'src/app/models/type';
@Component({
  selector: 'app-sub-indicator-general',
  templateUrl: './sub-indicator-general.component.html',
  styleUrls: ['./sub-indicator-general.component.scss']
})
export class SubIndicatorGeneralComponent implements OnInit {
  title = ''
  id=''
  characteristics:CharacteristicID[] =[]
  constructor(
    private route:ActivatedRoute,
    private typeService:TypeService,
    private characteriscticService: CharacteristicsService
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(params=>{
      this.title = params['title']
      this.id=params['id']
      this.typeService.getTypeById(this.id).pipe(
        switchMap((typeID:TypeID)=>{
          return this.characteriscticService.getCharacteristicsByType(typeID.id)
        })
      ).subscribe((characteristcs)=>{
        this.characteristics = characteristcs
      })
    })
  }

}
