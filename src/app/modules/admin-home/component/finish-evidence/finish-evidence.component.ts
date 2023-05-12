import { concatMap } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { combineLatest, from } from 'rxjs';
import { CharacteristicID, CharacteristicWithEvidence } from 'src/app/models/characteristic';
import { Evidence, EvidenceID } from 'src/app/models/evidence';
import { TypeID } from 'src/app/models/type';
import { TypeService } from 'src/app/services/type/type.service';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finish-evidence',
  templateUrl: './finish-evidence.component.html',
  styleUrls: ['./finish-evidence.component.scss']
})
export class FinishEvidenceComponent implements OnInit, OnChanges {

  typeID!: TypeID
  @Input() evidences: Evidence[] = []
  groupData: CharacteristicWithEvidence[] = []

  constructor(
    private typeService: TypeService,
    private evidenceService: EvidenceService,
    private storageService: StorageService,
  ) { }

  groupCharacteristics(typeID: TypeID, evidences: Evidence[]): CharacteristicWithEvidence[] {
    console.log(evidences)
    const characteristics = typeID.characteristics as CharacteristicID[]
    return characteristics.map((characteristic) => {
      const evidenceArray = evidences.filter(evidence => {
        const characteristicID = evidence.characteristicID
        return characteristicID == characteristic.id
      })

      return { characteristic: characteristic, evidences: evidenceArray }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes)
    if (this.typeID) {
      this.groupData = this.groupCharacteristics(this.typeID, this.evidences)
    }
  }
  cancel() {

  }
  saveEvidence() {
    let numberEvidences = this.evidences.length
    const dialog = Swal.fire({
      title:'Subiendo evidencias',
      didOpen:()=>{
        Swal.showLoading()
      }
    })
    from(this.evidences).pipe(
      concatMap(evidence => {
        if (evidence.link instanceof File) {
          return from(this.storageService.uploadFile('test', evidence.link)).pipe(
            concatMap((url) => {
                evidence.link = url
              return this.evidenceService.addEvidence(evidence)
            })
          )
        } else {
          return this.evidenceService.addEvidence(evidence)
        }
      })
    ).subscribe(saveEvidence => {
      if(numberEvidences<this.evidences.length){
        numberEvidences+=1
      }else{
        Swal.close()
      }
      console.log(saveEvidence)
    }, error => {
      console.log(error)
    })
  }
  ngOnInit(): void {
    combineLatest([
      this.typeService.getTypeSelected(),
    ]).subscribe(([type]) => {
      this.typeID = type
      if (this.typeID.id != '') {
        this.groupData = this.groupCharacteristics(type, this.evidences)

      }

    })

  }

}
