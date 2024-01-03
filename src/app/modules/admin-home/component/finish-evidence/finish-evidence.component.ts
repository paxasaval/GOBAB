import { concatMap,reduce } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { combineLatest, from } from 'rxjs';
import { CharacteristicID, CharacteristicWithEvidence } from 'src/app/models/characteristic';
import { Evidence, EvidenceID } from 'src/app/models/evidence';
import { TypeID } from 'src/app/models/type';
import { TypeService } from 'src/app/services/type/type.service';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { IndicatorID } from 'src/app/models/indicator';
import { GadID } from 'src/app/models/gad';
import { SubindicatorID } from 'src/app/models/subindicators';
import { environment } from 'src/environments/environment';
import { ExtraInfoContinue } from '../form-evidence/form-evidence.component';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';

@Component({
  selector: 'app-finish-evidence',
  templateUrl: './finish-evidence.component.html',
  styleUrls: ['./finish-evidence.component.scss']
})
export class FinishEvidenceComponent implements OnInit, OnChanges {

  typeID!: TypeID
  @Input() evidences: Evidence[] = []
  @Input() extras: ExtraInfoContinue[] = []

  groupData: CharacteristicWithEvidence[] = []
  indicator!:IndicatorInstanceID
  subindicator!:SubindicatorID
  constructor(
    private typeService: TypeService,
    private indicatorInstanceService:IndicatorInstanceService,
    private evidenceService: EvidenceService,
    private subindicatorService:SubindicatorService,
    private storageService: StorageService,
    private router:Router
  ) { }

  groupCharacteristics(typeID: TypeID, evidences: Evidence[]): CharacteristicWithEvidence[] {
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

    if (this.typeID) {
      this.groupData = this.groupCharacteristics(this.typeID, this.evidences)
    }
  }
  cancel() {

  }
  saveEvidence() {

    if(this.extras.length>0){
      console.log(this.subindicator.id)
      this.subindicatorService.updateInfoExtraBySubindicatorID(this.subindicator.id,this.extras).subscribe(res=>{
        console.log('actualizado',res)
      })
    }

    let numberEvidences = this.evidences.length
    let x=1
    const dialog = Swal.fire({
      title:`Actualizando ${this.subindicator.name}`,
      text:`Evidencias subidas: ${x} / ${this.evidences.length}`,
      didRender:()=>{
        Swal.showLoading()
      }
    })
    from(this.evidences).pipe(
      concatMap(evidence => {
        if (evidence.link instanceof File) {
          const indicatorCatalog =  this.indicator.indicatorID as IndicatorID
          const gad = this.indicator.gadID as GadID
          const subindicator = evidence.subIndicatorID as SubindicatorID
          const path = gad.name+'/'+this.indicator.year+'/'+indicatorCatalog.quadrantName+'/'+indicatorCatalog.name+'/'+subindicator.name + evidence.link.name
          return from(this.storageService.uploadFile(path,evidence.link)).pipe(
            concatMap((res) => {
              evidence.link = res
              return this.evidenceService.addEvidence(evidence)
            })
          )
        } else {
          return this.evidenceService.addEvidence(evidence)
        }
      }),
      reduce((count)=>count+1,0)
    ).subscribe(count => {
      if(count===numberEvidences){
        Swal.close()
        const currentURL = this.router.url
        const segments = currentURL.split('/');
        segments.pop(); // Elimina el último segmento (parámetro) de la ruta

        const newUrl = segments.join('/');
        this.router.navigateByUrl(newUrl);
      }

    }, error => {

    })
  }
  ngOnInit(): void {
    combineLatest([
      this.typeService.getTypeSelected(),
      this.indicatorInstanceService.getIndicatorInstance(),
      this.subindicatorService.getSelectedSubindicator()
    ]).subscribe(([type,indicatorInstance,subindicator]) => {
      this.typeID = type
      this.indicator=indicatorInstance
      this.subindicator=subindicator
      if (this.typeID.id != '') {
        this.groupData = this.groupCharacteristics(type, this.evidences)

      }

    })

  }

}
