import { Component, OnInit } from '@angular/core';
import { CharacteristicID } from 'src/app/models/characteristic';
import { Evidence } from 'src/app/models/evidence';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';

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

  files: any[] = []

  constructor(
    private storageService: StorageService
  ) { }

  getEvidence(evidence: Evidence[]) {
    console.log(evidence)
    this.files = evidence.map(e => {
      return e.link
    })
    console.log(this.files)
  }

  saveDocument() {
    const file = this.files[0]
    console.log(file)
    this.storageService.uploadFile2(environment.azureStorage.key, file, `test1.1/${file.name}`, () => {
      console.log('save')
    }).then(res => {
       console.log(res._response.request.url)
    })
  }

  ngOnInit(): void {
  }

}
