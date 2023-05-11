import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private titleSubject=new BehaviorSubject<string[]>([])


  constructor() { }
  setTitle(title:string[]){
    this.titleSubject.next(title)
  }
  addSubtitle(subtitle:string){
    const addSubtitle = this.titleSubject.value.concat(subtitle)
    this.titleSubject.next(addSubtitle)
  }
  getTitle(){
    return this.titleSubject.asObservable()
  }

}
