import { CharacteristicID, CharacteristicWithEvidence, CharacteristicWithEvidenceID } from './../../../../models/characteristic';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EvidenceID } from 'src/app/models/evidence';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { map, retry } from 'rxjs/operators';
import { TypeID } from 'src/app/models/type';
import { SubindicatorID } from 'src/app/models/subindicators';
import { TypeService } from 'src/app/services/type/type.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user/user.service';
import { UserID } from 'src/app/models/user';
import { RolID } from 'src/app/models/rol';
import { NzModalService, nzModalAnimations } from 'ng-zorro-antd/modal';
import { DialogCheckEvidenceComponent } from '../dialog-check-evidence/dialog-check-evidence.component';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnChanges {

  indicatorID = ''
  typeID!: TypeID
  evidences: EvidenceID[] = []
  type!: TypeID
  dataSource!: Observable<CharacteristicWithEvidenceID[]>
  groupEvidence!: CharacteristicWithEvidenceID[] | null
  displayedColumns: string[] = []
  subscribe1!: Subscription
  ROL_ADMIN = environment.ROL_ADMIN
  user!: UserID
  auth = false
  subindicatorBD!: Subscription
  id!: string
  closeOK!:EventEmitter<any>

  constructor(
    private subindicatorService: SubindicatorService,
    private typeService: TypeService,
    private userService: UserService,
    private modalService: NzModalService
  ) { }



  ngOnChanges(changes: SimpleChanges): void {
  }

  dataEvidencesID(data: CharacteristicWithEvidenceID): EvidenceID[] {
    return data.evidences as EvidenceID[]
  }

  arrayCommits(evidence: any) {
    return evidence.commits
  }
  evidenceQualificate() {

  }
  groupCharacteristics(typeID: TypeID, evidences: EvidenceID[]) {
    const characteristics = typeID.characteristics as CharacteristicID[]
    return characteristics.map((characteristic) => {
      const evidenceArray = evidences.filter(evidence => {
        const characteristicID = evidence.characteristicID
        return characteristicID == characteristic.id
      })

      return { characteristic: characteristic, evidences: evidenceArray }
    })
  }
  changeValidate(evidence: EvidenceID) {

  }

  openReview(evidence: EvidenceID, characteristic: CharacteristicID) {
    const modal = this.modalService.create({
      nzTitle: 'Revision de evidencias',
      nzContent: DialogCheckEvidenceComponent,
      nzComponentParams: {
        evidence: evidence,
        characteristic: characteristic
      },
      nzFooter: null,
    }
    )
    modal.afterClose.subscribe(
      result=>{
        console.log(result)
        this.afterClosed()
      }
    )
  }

  afterClosed() {
    if (!this.subindicatorBD) {
      this.groupEvidence=null
      this.subindicatorBD = this.subindicatorService.getSubindicatorByID(this.id).subscribe(
        subindicatorBD => {
          console.log(subindicatorBD)
          this.groupEvidence = this.groupCharacteristics(this.typeID, subindicatorBD.evidences as EvidenceID[])
        }
      )
    }else{
      this.subindicatorBD.unsubscribe()
      this.subindicatorBD = this.subindicatorService.getSubindicatorByID(this.id).subscribe(
        subindicatorBD => {
          console.log(subindicatorBD)
          this.groupEvidence = this.groupCharacteristics(this.typeID, subindicatorBD.evidences as EvidenceID[])
        }
      )
    }
  }

  setColumns(subindicator: SubindicatorID) {
    this.evidences = subindicator.evidences as EvidenceID[]
    this.displayedColumns = Object.keys(this.evidences[0])
    this.displayedColumns.splice(1, 1)
    this.displayedColumns.pop()
    this.displayedColumns.push('Calificar')
    this.type = subindicator.typeID as TypeID
  }

  authAdmin() {
    const rol = this.user.rol as RolID
    const rolName = rol.name
    if (rolName === this.ROL_ADMIN) {
      this.auth = true
    }
  }

  ngOnInit(): void {
    this.subindicatorService.getSubindicatorByID('64626a74e2044b52bfedac9c').subscribe(
      res=>{
        console.log(res)
      }
    )
    combineLatest([
      this.typeService.getTypeSelected(),
      this.subindicatorService.getSelectedSubindicator(),
      this.userService.getUserSesion()
    ])
      .subscribe(([type, subindicator, user]) => {
        this.typeID = type
        this.id = subindicator.id
        this.groupEvidence = this.groupCharacteristics(type, subindicator.evidences as EvidenceID[])
        this.user = user
        this.authAdmin()
      })
  }

}
