import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TitleService } from 'src/app/services/title/title.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Navigation } from 'src/app/models/navigation';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() title=''

  routes:Navigation[]=[]
  currentUrl=''
  constructor(
    private location:Location,
    private titleService:TitleService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  goBack(){
    this.location.back()
  }

  getPath(url:string){
    let array = url.split('/')
    array.splice(0,2)
    return array
  }

  ngOnInit(): void {
    this.titleService.getRoute().subscribe(
      route=>{
        this.routes=route
      }
    )
  }

}
