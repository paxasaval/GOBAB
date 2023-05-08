import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { EvidenceID } from 'src/app/models/evidence';
import { DocumentService } from 'src/app/services/document/document.service';
import { EvidenceService } from 'src/app/services/evidence/evidence.service';

@Component({
  selector: 'app-render-document',
  templateUrl: './render-document.component.html',
  styleUrls: ['./render-document.component.scss']
})
export class RenderDocumentComponent implements OnInit {

  url!:string
  evidence!:EvidenceID
  note:string|null=null
  name:string|null=null
  constructor(
    private documentService:DocumentService,
    private evidenceService:EvidenceService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.evidenceService.getEvidenceSelected(),
      this.documentService.getDocumentSelected()
    ]).subscribe(
      ([evidence,document])=>{

        this.url = document
        if(evidence.link == document){
          this.note = evidence.note
          this.name = evidence.name
        }else{
          this.note = null
        }
      }
    )
  }

}
