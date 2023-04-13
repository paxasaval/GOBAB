import { Component, ChangeDetectorRef,Renderer2,OnInit, Input, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-section-evidence',
  templateUrl: './section-evidence.component.html',
  styleUrls: ['./section-evidence.component.scss']
})
export class SectionEvidenceComponent implements OnInit,AfterViewInit {
  @ViewChildren('titleDiv') titleDivList!:QueryList<ElementRef>;
  @Input() title='Objetivos y Metas'

  constructor(
    private renderer:Renderer2,
    private cdr:ChangeDetectorRef
  ) { }
  adjustSizeText(){
    this.titleDivList.map((divElement:ElementRef)=>{
      const containerWidth = divElement.nativeElement.clientWidth;
      const contentWidth = divElement.nativeElement.scrollWidth;
      const fontSize = Math.min(100, containerWidth / (contentWidth / 12));
      console.log(containerWidth,contentWidth)
        this.renderer.setStyle(divElement.nativeElement, 'font-size', `${fontSize}px`);
      this.renderer.setStyle(divElement.nativeElement, 'height', 'auto');
    })
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
