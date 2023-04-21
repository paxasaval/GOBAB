import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  user = {
    name:'Paul Sanchez',
    rol:'Administrador'
  }

  userDefault="../../../../assets/userDefault-2.png"

  arrayIndicadores = [
    {
      quadrantName:'Cuandrante 1',
      indicadorDescriton:'Desarrollo...',
      number:1,
      subindicadores:[
        {
          name:'1.1 Gestión Integral de la calidad'
        }
      ]
    },
    {
      quadrantName:'Cuandrante 2',
      number:2,
      indicadorDescriton:'Desarrollo...',
      subindicadores:[
        {
          name:'1.1 Gestión Integral de la calidad'
        },
        {
          name:'1.2 Gestión Integral de la calidad'
        }
      ]
    },
    {
      quadrantName:'Cuandrante 3',
      number:3,
      indicadorDescriton:'Desarrollo...',
      subindicadores:[
        {
          name:'1.1 Gestión Integral de la calidad'
        }
      ]
    }
  ]

  isExpanded = false

  constructor(private titleService:TitleService) { }

  ngOnInit(): void {

  }

  setTitle(title:string){
    this.titleService.setTitle(title)
    console.log(title)
  }

}
