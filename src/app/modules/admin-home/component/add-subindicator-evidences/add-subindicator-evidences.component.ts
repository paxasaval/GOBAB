import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Evidence } from 'src/app/models/evidence';
import { TypeID } from 'src/app/models/type';

export interface EvidenceSubindicator{
  flag:boolean,
  data:{
    evidences:Evidence[]
  }
}

@Component({
  selector: 'app-add-subindicator-evidences',
  templateUrl: './add-subindicator-evidences.component.html',
  styleUrls: ['./add-subindicator-evidences.component.scss']
})
export class AddSubindicatorEvidencesComponent implements OnInit,AfterViewInit,OnChanges {
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;

  group1: CharacteristicID[] = []
  group2: CharacteristicID[] = []
  group3: CharacteristicID[] = []
  arrayEvidence: Evidence[] = []

  @Input() type!:TypeID
  @Output() evidenceEvent = new EventEmitter<EvidenceSubindicator>()

  constructor() { }

  groupCharacteristics(characteristics: CharacteristicID[]) {
    this.group1 = []
    this.group2 = []
    this.group3 = []
    characteristics.map(characteristic => {
      if (characteristic.group === '1') {
        this.group1.push(characteristic)
      }
      if (characteristic.group === '2') {
        this.group2.push(characteristic)
      }
      if (characteristic.group === '3') {
        this.group3.push(characteristic)
      }
    })
  }
  addEvidence(event: Evidence[]) {
    event.map(evidence => {
      const found = this.arrayEvidence.findIndex(e => ((e.link == evidence.link) && (e.characteristicID == evidence.characteristicID)))
      if (found == -1) {
        if(evidence.name=='' && evidence.link instanceof File){
          evidence.name = evidence.link.name
        }
        this.arrayEvidence.push(evidence)
      } else {
        this.arrayEvidence[found] = evidence
      }
    })
  }
  scroll(name: string, groupName: string) {
    const elementID = name + groupName
    const el = document.getElementById(elementID)
    if (el) {
      this.panels.map(panel => {
        panel.open()
        const panelID = panel._body.nativeElement.parentElement?.id
        if (panelID !== groupName) {
          panel.close()
        }
      })
      setTimeout(() => {
        el.scrollIntoView()
      }, 250)
    }
  }
  continue(){
    const sendData:EvidenceSubindicator={
      flag:true,
      data:{
        evidences:this.arrayEvidence
      }
    }
    this.evidenceEvent.emit(sendData)
  }
  back(){
    const sendData:EvidenceSubindicator={
      flag:false,
      data:{
        evidences:[]
      }
    }
    this.evidenceEvent.emit(sendData)
  }
  ngAfterViewInit(): void {
    this.panels.changes.subscribe(() => {
      this.panels.toArray().forEach(panel => {
        panel.expanded = true
      })
    })
  }
  ngOnChanges(changes:SimpleChanges){
    const characteristics = this.type.characteristics as CharacteristicID[]
    this.groupCharacteristics(characteristics)
  }
  ngOnInit(): void {
  }

}
