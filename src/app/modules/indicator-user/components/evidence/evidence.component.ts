import { SimpleChanges, Component, ViewChild, ElementRef, Input, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CharacteristicID } from 'src/app/models/characteristic';
import { EvidenceCharacteristics } from '../../pages/sub-indicator-general/sub-indicator-general.component';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.scss']
})
export class EvidenceComponent implements OnInit, AfterViewInit,OnChanges {

  evidenceFlag=true

  @Input() characteristicEvidences!:EvidenceCharacteristics
  title=''
  documentURL =''
  safeURL!:SafeUrl

  constructor(
    private sanitizer:DomSanitizer,

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.characteristicEvidences){
      this.evidenceFlag = (this.characteristicEvidences.evidence.length>0)
      this.title=this.characteristicEvidences.characteristic.name
    }
  }
  sanitizerURL(url:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  ngOnInit(): void {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentURL)
  }
  ngAfterViewInit(): void {

  }

}
