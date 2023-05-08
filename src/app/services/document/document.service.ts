import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documentSelected$ = new BehaviorSubject<string>('')


  constructor() { }

  getDocumentSelected(){
    return this.documentSelected$.asObservable()
  }

  setDocumentSelected(url:string){
    this.documentSelected$.next(url)
  }

}
