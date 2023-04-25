import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-search-specific-subindicator',
  templateUrl: './search-specific-subindicator.component.html',
  styleUrls: ['./search-specific-subindicator.component.scss']
})
export class SearchSpecificSubindicatorComponent implements OnInit {

  @Input() rol:string='user'

  myContol = new FormControl('')
  options:string[]=['One', 'Two', 'Three'];
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  displayedColumns: string[] = ['name', 'type', 'state', 'dateUpdate','responsibles','actions'  ];
  dataSource = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addSubindicator(){
    this.router.navigate(['add-subindicator'],{relativeTo:this.route})
  }

  search(){

  }
  cleanFilters(){

  }
  viewSubindicator(){
    this.router.navigate([`${this.rol}/subindicator-view`])
   }

}
