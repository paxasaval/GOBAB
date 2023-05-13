import { mergeMap, concatMap, catchError } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CharacteristicID, CharacteristicWithEvidence } from 'src/app/models/characteristic';
import { Evidence } from 'src/app/models/evidence';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { Subindicator } from 'src/app/models/subindicators';
import { TypeID } from 'src/app/models/type';
import { UserID } from 'src/app/models/user';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { EMPTY, from, of } from 'rxjs';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-subindicator-confirm',
  templateUrl: './add-subindicator-confirm.component.html',
  styleUrls: ['./add-subindicator-confirm.component.scss']
})
export class AddSubindicatorConfirmComponent implements OnInit,OnChanges {

  @Input() type!:TypeID
  @Input() name!:string
  @Input() responsible!:string
  @Input() portada!:Evidence[]
  @Input() evidences!:Evidence[]

  groupData: CharacteristicWithEvidence[] = []
  user!:UserID
  indicatorInstance!:IndicatorInstanceID

  constructor(
    private subindicatorService:SubindicatorService,
    private evidenceService:EvidenceService
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

  saveEvidence() {
    Swal.fire({
      title:'Creando subindicador',
      didOpen:()=>{
        Swal.showLoading()
      }
    })
    const newSubindicator: Subindicator = {
      commits: [],
      cover: this.portada[0].link as string,
      requireCover: true,
      observationCover: this.portada[0].note,
      created: new Date(),
      createdBy: this.user.id,
      evidences: [],
      indicadorID: this.indicatorInstance.id,
      lastUpdate: new Date(),
      name: this.name,
      qualification: 0,
      responsible: this.responsible,
      typeID: this.type.id,
    }
    console.log(newSubindicator)
    console.log(this.evidences)
    this.subindicatorService.addSubindicator(newSubindicator).pipe(
      mergeMap(subindicator => {
        console.log('subindicador subido con exito!')
        return of(subindicator).pipe(
          mergeMap(subindicator => {
            this.evidences = this.evidences.map(evidence => {
              evidence.subIndicatorID = subindicator.id;
              return evidence;
            });
            return from(this.evidences).pipe(
              concatMap(evidence => {
                return this.evidenceService.addEvidence(evidence).pipe(
                  catchError(error => {
                    console.error('Error al agregar la evidencia', error);
                    return EMPTY;
                  })
                );
              })
            );
          }),
          catchError(error => {
            console.error('Error al agregar el subindicador', error);
            return EMPTY;
          })
        );
      })
    ).subscribe(
      () => {
        console.log('evidencias agregados al subindicador con éxito');
        Swal.close()
      },
      error => {
        console.error('Error al agregar el subindicador y evidencias', error);
        Swal.close()
        Swal.fire(
          'Error: Lo sentimos no se ha podido completar su peticion',
          '',
          'error'
        )
      }
    );
  }

  ngOnChanges(changes:SimpleChanges){
    this.groupData = this.groupCharacteristics(this.type,this.evidences)
  }
  ngOnInit(): void {
  }

}
