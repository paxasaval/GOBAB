import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() title=''

  constructor(
    private location:Location
  ) { }

  goBack(){
    this.location.back()
  }

  ngOnInit(): void {
  }

}
