import { Component, OnInit, Inject, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CharacteristicID, CharacteristicWithEvidence } from 'src/app/models/characteristic';
import { Evidence } from 'src/app/models/evidence';
import { TypeID } from 'src/app/models/type';
@Component({
  selector: 'app-dialog-abstract',
  templateUrl: './dialog-abstract.component.html',
  styleUrls: ['./dialog-abstract.component.scss']
})
export class DialogAbstractComponent implements OnInit,AfterViewInit,OnChanges {

  evidenceGroup:CharacteristicWithEvidence[]=[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {evidence: Evidence[],type:TypeID},
    public dialogRef:MatDialogRef<DialogAbstractComponent>
  ) { }


  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewInit(): void {

  }

  filterEvidence(){
    const type = this.data.type as TypeID
    const arrayCharacteristic = type.characteristics as CharacteristicID[]
    this.evidenceGroup = arrayCharacteristic.map(characteristic=>{
      return {characteristic:characteristic ,evidences:this.data.evidence.filter(evidence=>evidence.characteristicID as string == characteristic.id)}
    })

  }

  saveEvience(){
    this.dialogRef.close(true)
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    if(this.data){
      this.filterEvidence()
    }
  }


}
