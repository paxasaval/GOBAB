import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SubindicatorID } from 'src/app/models/subindicators';
import { TypeID } from '../../../../models/type'
export interface SubindcatorInstance {
  route?: string,
  subindicator?: SubindicatorID
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges {

  @Input() subindicators: string[] | SubindicatorID[] = []
  @Input() generalTypes: TypeID[] = []
  subindicator!: SubindicatorID
  routes: SubindcatorInstance[] = []



  constructor() { }

  ngOnChanges() {
    this.routes = []
    this.generalTypes.forEach(type => {
      const array = this.subindicators as SubindicatorID[]
      const dataRoute = array.find((subindicator: SubindicatorID) => subindicator.typeID === type.id)
      const newRoute: SubindcatorInstance = { subindicator: dataRoute, route: type.name.replace(' ', '-') }
      this.routes.push(newRoute)
    })

  }

  findGenerarlSubindicator(id: string) {
    const array = this.subindicators as SubindicatorID[]
    return array.find((subindicator: SubindicatorID) => subindicator.typeID === id)
  }


  ngOnInit(): void {
  }

}
