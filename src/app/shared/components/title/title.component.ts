import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() title=''

  constructor(
    private location:Location,
    private titleService:TitleService
  ) { }

  goBack(){
    this.location.back()
  }

  ngOnInit(): void {
    if(this.title===''){
      this.titleService.title$.subscribe(title=>this.title=title)
    }
  }

}
