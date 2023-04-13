import { Component, Input, OnInit } from '@angular/core';
import { CharacteristicID } from 'src/app/models/characteristic';

@Component({
  selector: 'app-side-bar-evidences',
  templateUrl: './side-bar-evidences.component.html',
  styleUrls: ['./side-bar-evidences.component.scss']
})
export class SideBarEvidencesComponent implements OnInit {

  @Input() evidences:CharacteristicID[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
