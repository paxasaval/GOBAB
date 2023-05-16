import { Component, OnInit, Input } from '@angular/core';
import { CharacteristicID, CharacteristicWithEvidence } from 'src/app/models/characteristic';

@Component({
  selector: 'app-side-bar-evidences',
  templateUrl: './side-bar-evidences.component.html',
  styleUrls: ['./side-bar-evidences.component.scss']
})
export class SideBarEvidencesComponent implements OnInit {
  @Input() evidences:CharacteristicID[] = []
  @Input() characteristicWithEvidences:CharacteristicWithEvidence[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
