import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GadID } from 'src/app/models/gad';

@Injectable({
  providedIn: 'root'
})
export class GadService {

  private apiUrl = `${environment.API_URL}/api/gad`
  private gadSubject = new BehaviorSubject<GadID>({
    city: '',
    code: '',
    country: '',
    id: '',
    name: '',
    size: 0,
    state: false,
  })

  constructor(
    private http: HttpClient
  ) {
    http.get<GadID>(`${this.apiUrl}/myWorkspace`).subscribe(
      gad => {
        this.gadSubject.next(gad)

      }
    )
  }

  getGadSelected() {
    return this.gadSubject.asObservable()
  }
  setGadSelected(gad: GadID) {
    return this.gadSubject.next(gad)
  }

}
