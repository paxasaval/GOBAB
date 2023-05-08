import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Evidence, EvidenceID } from 'src/app/models/evidence';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  private apiUrl = `${environment.API_URL}/api/evidences`

  private evidenceSelected$ = new BehaviorSubject<EvidenceID>({
    characteristicID:'',
    id:'',
    link:'',
    name:'',
    note:'',
    subIndicatorID:'',
    verified:false
  })

  constructor(
    private http:HttpClient
  ) { }

  addEvidence(evidence:Evidence){
    return this.http.post<EvidenceID>(`${this.apiUrl}`,evidence)
  }

  getEvidenceSelected(){
    return this.evidenceSelected$.asObservable()
  }

  setEvidenceSelected(evidence:EvidenceID){
    this.evidenceSelected$.next(evidence)
  }

}
