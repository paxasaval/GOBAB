import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';



@Component({
  selector: 'app-sub-indicator-specific',
  templateUrl: './sub-indicator-specific.component.html',
  styleUrls: ['./sub-indicator-specific.component.scss']
})

export class SubIndicatorSpecificComponent implements OnInit {

  indicator!:IndicatorInstanceID

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private indicatorInstanceService: IndicatorInstanceService
  ) { }

  ngOnInit(): void {
    this.indicatorInstanceService.getIndicatorInstance().subscribe(
      indicator=>{
        this.indicator =indicator
      }
    )
  }

}
