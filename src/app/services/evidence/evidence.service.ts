import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evidence, EvidenceID } from 'src/app/models/evidence';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  private apiUrl = `${environment.API_URL}/api/evidences`

  constructor(
    private http:HttpClient
  ) { }

  addEvidence(evidence:Evidence){
    return this.http.post<EvidenceID>(`${this.apiUrl}`,evidence)
  }
}
