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

@Component({
  selector: 'app-finish-evidence',
  templateUrl: './finish-evidence.component.html',
  styleUrls: ['./finish-evidence.component.scss']
})
export class FinishEvidenceComponent implements OnInit, OnChanges {

  typeID!: TypeID
  @Input() evidences: Evidence[] = []
  groupData: CharacteristicWithEvidence[] = []
  indicator!:IndicatorInstanceID
  constructor(
    private typeService: TypeService,
    private indicatorInstanceService:IndicatorInstanceService,
    private evidenceService: EvidenceService,
    private storageService: StorageService,
    private router:Router
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
    let x=1
    const dialog = Swal.fire({
      title:'Subiendo evidencias',
      text:`evidencias subidas: ${x} / ${this.evidences.length}`,
      didOpen:()=>{
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
          return from(this.storageService.uploadFile2(environment.azureStorage.key, evidence.link,path,()=>{
            x+=1
            Swal.update({text:`evidencias subidas ${x} / ${this.evidences.length}`})
          })).pipe(
            concatMap((res) => {
              evidence.link = res._response.request.url
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
      console.log(`evidencar upload (${count}/${numberEvidences})`)
    }, error => {
      console.log(error)
    })
  }
  ngOnInit(): void {
    combineLatest([
      this.typeService.getTypeSelected(),
      this.indicatorInstanceService.getIndicatorInstance()
    ]).subscribe(([type,indicatorInstance]) => {
      this.typeID = type
      this.indicator=indicatorInstance
      if (this.typeID.id != '') {
        this.groupData = this.groupCharacteristics(type, this.evidences)

      }

    })

  }

}
