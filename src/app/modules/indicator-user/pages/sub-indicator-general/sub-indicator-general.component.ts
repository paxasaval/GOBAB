import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-indicator-general',
  templateUrl: './sub-indicator-general.component.html',
  styleUrls: ['./sub-indicator-general.component.scss']
})
export class SubIndicatorGeneralComponent implements OnInit {
  title = ''
  id=''
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(params=>{
      this.title = params['title']
      this.id=params['id']
    })
  }

}
