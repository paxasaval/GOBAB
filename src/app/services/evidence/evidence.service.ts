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
    author:'',
    verified:false,
    commits:[]
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

  getEvidenceByID(id:string){
    return this.http.get<EvidenceID>(`${this.apiUrl}/${id}`)
  }

  qualifyEvidence(id:string,qualification:number,commit?:string){
    return this.http.put(`${this.apiUrl}/qualify/${id}`,{qualification:qualification,commit:commit})
  }

  getEvidencesBySubindicatorID(subindicatorID:string){
    return this.http.get<EvidenceID[]>(`${this.apiUrl}/subindicatorID/${subindicatorID}`)
  }
  deleteEvidence(id:string){
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
