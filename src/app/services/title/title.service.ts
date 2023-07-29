import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Navigation } from 'src/app/models/navigation';
@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private titleSubject=new BehaviorSubject<string[]>([])
  private routeSubject= new BehaviorSubject<Navigation[]>([])

  constructor() { }

  setRoute(route:Navigation[]){
    this.routeSubject.next(route)
  }
  addSubRoute(subroute:Navigation){
    const addRoute = this.routeSubject.value.concat(subroute)
    this.routeSubject.next(addRoute)
  }
  getRoute(){
    return this.routeSubject.asObservable()
  }
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
