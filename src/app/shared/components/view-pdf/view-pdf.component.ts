import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit,OnChanges {

  @Input() url:string=''
  formatPDF=false
  safeURL:SafeUrl=''

  constructor(
    private sanitizer:DomSanitizer
  ) { }

  validatePDF(){
    const extension = this.url.includes('.pdf')
    if(extension){
      console.log(extension)
      this.formatPDF=true
    }
  }
  sanitizerURL(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
      this.validatePDF()
  }

}
