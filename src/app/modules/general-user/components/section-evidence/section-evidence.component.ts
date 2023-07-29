import { Component, OnInit, ViewChildren, Input, QueryList, ElementRef, Renderer2, ChangeDetectorRef, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { CharacteristicID, CharacteristicWithEvidence } from 'src/app/models/characteristic';
import { EvidenceID } from 'src/app/models/evidence';
import { DocumentService } from 'src/app/services/document/document.service';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';

@Component({
  selector: 'app-section-evidence',
  templateUrl: './section-evidence.component.html',
  styleUrls: ['./section-evidence.component.scss']
})
export class SectionEvidenceComponent implements OnInit,AfterViewInit,OnChanges {
  @ViewChildren('titleDiv') titleDivList!:QueryList<ElementRef>;
  @Input() title='Objetivos y Metas'
  @Input() characteristicWithEvidences!:CharacteristicWithEvidence

  evidences:EvidenceID[]=[]
  characteristic!:CharacteristicID

  constructor(
    private renderer:Renderer2,
    private cdr:ChangeDetectorRef,
    private documentService:DocumentService,
    private evidenceService:EvidenceService
  ) { }
  adjustSizeText(){
    this.titleDivList.map((divElement:ElementRef)=>{
      const containerWidth = divElement.nativeElement.clientWidth;
      const contentWidth = divElement.nativeElement.scrollWidth;
      const fontSize = Math.min(100, containerWidth / (contentWidth / 12));
    
        this.renderer.setStyle(divElement.nativeElement, 'font-size', `${fontSize}px`);
      this.renderer.setStyle(divElement.nativeElement, 'height', 'auto');
    })
  }

  ngOnChanges(changes:SimpleChanges){
    if(this.characteristicWithEvidences){
      this.title = this.characteristicWithEvidences.characteristic.name
      this.evidences = this.characteristicWithEvidences.evidences as EvidenceID[]
      this.characteristic=this.characteristicWithEvidences.characteristic
    }
  }

  setEvidence(evidence:EvidenceID){
    this.documentService.setDocumentSelected(evidence.link as string)
    this.evidenceService.setEvidenceSelected(evidence)
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.titleDivList.changes.subscribe(()=>{
      this.adjustSizeText()
    })
    this.cdr.detectChanges();
    this.adjustSizeText();
  }

}
