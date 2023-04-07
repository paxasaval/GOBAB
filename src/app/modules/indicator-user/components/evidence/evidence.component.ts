import { SimpleChanges, Component, ViewChild, ElementRef, Input, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CharacteristicID } from 'src/app/models/characteristic';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.scss']
})
export class EvidenceComponent implements OnInit, AfterViewInit,OnChanges {

  evidenceFlag=false

  @Input() characteristic!:CharacteristicID
  title=''
  documentURL ='https://www.orimi.com/pdf-test.pdf'
  safeURL!:SafeUrl

  constructor(
    private sanitizer:DomSanitizer,

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.characteristic){
      this.title=this.characteristic.name
    }
  }

  ngOnInit(): void {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.documentURL)
  }
  ngAfterViewInit(): void {

  }

}
