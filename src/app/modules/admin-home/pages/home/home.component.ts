import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private title:TitleService) { }

  ngOnInit(): void {
    this.title.setTitle('Inicio')
  }

}
