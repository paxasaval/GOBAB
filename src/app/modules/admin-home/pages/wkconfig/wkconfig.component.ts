import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Evidence } from 'src/app/models/evidence';
import { GadID } from 'src/app/models/gad';
import { Report, ReportID } from 'src/app/models/report';
import { GadService } from 'src/app/services/gad/gad.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wkconfig',
  templateUrl: './wkconfig.component.html',
  styleUrls: ['./wkconfig.component.scss']
})
export class WkconfigComponent implements OnInit {

  config: CharacteristicID = {
    group: '0',
    groupName: 'Suba la infografía/portada del proyecto',
    id: '',
    isRequired: true,
    name: 'Portada',
    required: true,
    tier: 1,
    unique: true,
    allowed_formats: ['.pdf']
  }
  newReport=false
  publishAuto=false
  flag=true
  formReport:FormGroup= new FormGroup({
    source:new FormControl('')
  })
  gadSelected!:GadID
  data:FormControl[]=[]
  labels:FormControl[]=[]
  files: any[] = []
  allReports:ReportID[]=[]
  reportSelect!:ReportID

  subscribeListReport!:Subscription
  subscribeGad!:Subscription
  constructor(
    private storageService: StorageService,
    private gadService:GadService
  ) { }

  getEvidence(evidence: Evidence[]) {
  
    this.files = evidence.map(e => {
      return e.link
    })
    
  }
  changeReport(event:Report){
    this.flag=false
  }
  addInfo(){
    this.data.push(new FormControl(''))
    this.labels.push(new FormControl(''))
    this.flag=true
  }
  addReport(){
    this.newReport=true
  }
  listReport(){

    this.subscribeListReport = this.gadService.getReports().subscribe(reports=>{
      this.allReports=reports
      const x = this.allReports.find(r=>r._id === this.gadSelected.reportDefault)
      if(x)[
        this.reportSelect = x
      ]
    })
  }
  saveReport(){
    const source = this.formReport.controls['source'].value
    
    let report:Report = {
      info:[],
      period: new Date().getFullYear().toString(),
      source:source
    }

    for (let index = 0; index < this.data.length; index++) {
      const data = this.data[index].value;
      const label = this.labels[index].value
      report.info.push({data,label})
    }
    this.gadService.addReport(report).subscribe(res=>{
      this.subscribeListReport.unsubscribe()
      this.listReport()
      Swal.fire({
        icon: 'success',
        title: 'Reporte guardado',
        showConfirmButton: false,
        timer: 1500
      })
      this.data = []
      this.labels = []
      this.formReport=new FormGroup({
        source:new FormControl('')
      })
      this.newReport=false
    })
  }

  save(){
    this.flag=true
    this.subscribeGad.unsubscribe()
    this.fetchGad()
    this.gadSelected.publishAuto = this.publishAuto
    this.gadSelected.reportDefault = this.reportSelect._id
    this.gadService.updateConfig(this.gadSelected).subscribe(res=>{

      Swal.fire({
        icon: 'success',
        title: 'Cambios guardados',
        showConfirmButton: false,
        timer: 1500
      })

    }
    )
  }
  changeSwitch(event:any){
    this.flag=false
  }


  fetchGad(){
    this.subscribeGad=this.gadService.getGadSelected().subscribe(
      res=>{
        this.publishAuto = res.publishAuto!
        this.gadSelected = res

      }
    )
  }

  ngOnInit(): void {
    this.listReport()
    this.fetchGad()
  }

}
