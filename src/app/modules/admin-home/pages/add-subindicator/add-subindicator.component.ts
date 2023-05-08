import { mergeMap, concatMap, catchError } from 'rxjs/operators';
import { Location, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Evidence, EvidenceID } from 'src/app/models/evidence';
import { IndicatorInstanceID } from 'src/app/models/indicatorInstance';
import { Subindicator } from 'src/app/models/subindicators';
import { TypeID } from 'src/app/models/type';
import { IndicatorInstanceService } from 'src/app/services/indicator-instance/indicator-instance.service';
import { SubindicatorService } from 'src/app/services/subindicator/subindicator.service';
import { TypeService } from 'src/app/services/type/type.service';
import { from, of, EMPTY } from 'rxjs';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';
import { UserService } from 'src/app/services/user/user.service';
import { User, UserID } from 'src/app/models/user';

@Component({
  selector: 'app-add-subindicator',
  templateUrl: './add-subindicator.component.html',
  styleUrls: ['./add-subindicator.component.scss']
})
export class AddSubindicatorComponent implements OnInit, AfterViewInit {
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;
  @ViewChild('Entrada') panel1!: MatExpansionPanel
  @ViewChild('Ejecución') panel2!: MatExpansionPanel
  @ViewChild('Finalización') panel3!: MatExpansionPanel

  portada: CharacteristicID = {
    group: '0',
    groupName: 'Suba la infografia/portada del proyecto',
    id: '',
    isRequired: true,
    name: 'Portada',
    required: true,
    tier: 1,
    unique: true
  }
  nameControl = new FormControl('')
  typeControl = new FormGroup({
    type: new FormControl()
  })
  responsibleControl = new FormControl('')
  types: TypeID[] = []
  arrayEvidence: Evidence[] = []
  characteristics: CharacteristicID[] = []
  group1: CharacteristicID[] = []
  group2: CharacteristicID[] = []
  group3: CharacteristicID[] = []
  indicatorInstance!: IndicatorInstanceID
  user!:UserID
  //event evidences
  portadaArray: Evidence[] = []
  constructor(
    private typeService: TypeService,
    private location: Location,
    private viewportScroller: ViewportScroller,
    private indicatorInstanceSevice: IndicatorInstanceService,
    private subindicatorService: SubindicatorService,
    private evidenceService: EvidenceService,
    private userService:UserService
  ) { }

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
  ngAfterViewInit(): void {
    this.panels.changes.subscribe(() => {
      this.panels.toArray().forEach(panel => {
        panel.expanded = true
      })
    })
  }
  selectChanges(event: any) {
    const type = event as TypeID
    this.typeControl.setValue({ type: type })
    this.characteristics = type.characteristics as CharacteristicID[]
    this.groupCharacteristics(this.characteristics)
  }

  addEvidence(event: Evidence[]) {
    event.map(evidence => {
      const found = this.arrayEvidence.findIndex(e => ((e.name == evidence.name) && (e.characteristicID == evidence.characteristicID)))
      if (found == -1) {
        this.arrayEvidence.push(evidence)
      } else {
        this.arrayEvidence[found] = evidence
      }
    })
    console.log(this.arrayEvidence)
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
  saveEvidence() {
    const newSubindicator: Subindicator = {
      commits: [],
      cover: this.portadaArray[0].link as string,
      requireCover: true,
      observationCover: this.portadaArray[0].note,
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
    console.log(this.arrayEvidence)
    this.subindicatorService.addSubindicator(newSubindicator).pipe(
      mergeMap(subindicator => {
        console.log('subindicador subido con exito!')
        return of(subindicator).pipe(
          mergeMap(subindicator => {
            this.arrayEvidence = this.arrayEvidence.map(evidence => {
              evidence.subIndicatorID = subindicator.id;
              return evidence;
            });
            return from(this.arrayEvidence).pipe(
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
      },
      error => {
        console.error('Error al agregar el subindicador y evidencias', error);
      }
    );
  }
  cancelEvidence() {
    this.location.back()
  }

  handlePortada(event: Evidence[]) {
    this.portadaArray = event
  }

  ngOnInit(): void {
    this.typeService.getTypeByMandatory(false).subscribe(
      types => {
        this.types = types
      }
    )
    this.indicatorInstanceSevice.getIndicatorInstance().subscribe(
      indicatorInstance => {
        this.indicatorInstance = indicatorInstance
      }
    )
    this.userService.getUserSesion().subscribe(user=>this.user=user)
  }

  get name() {
    return this.nameControl.value
  }

  get type() {
    return this.typeControl.get('type')?.value
  }

  get responsible() {
    return this.responsibleControl.value
  }


}
