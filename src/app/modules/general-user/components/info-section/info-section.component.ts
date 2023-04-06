import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss']
})
export class InfoSectionComponent implements OnInit {

  title="SISTEMAS DE GESTIÓN DE LA CALIDAD"
  img='../../../../../assets/infoSlide1.png'
  details=[
    'cursus ac fringilla Nunc non, diam lacus, tincidunt sit convallis. est. lobortis, Praesent nec luctus sodales. at consectetur viverra risus amet, viverra convallis. felis, dignissim, urna. nisi quis libero, vitae nisl. Lorem sed Morbi non',
    'risus Nullam venenatis malesuada sapien nibh varius ex. orci nisi non porta at Donec elementum vitae ex Nunc Nunc sapien efficitur. felis, risus vehicula, Donec nisi leo. Donec ac nec elementum non sapien vitae orci id dui odio viverra ex',
    'lacus Cras non, gravida Sed nisl. Morbi Lorem dolor hendrerit odio ultrices nisl. ipsum ac felis, hendrerit malesuada tortor. id placerat. amet, vel ultrices commodo turpis tempor dolor in Donec convallis. lorem. est. at urna. viverra.'
  ]
  resourses=[
    'https://www.iso.org/obp/ui#iso:std:iso:18091:ed-2:v1:es'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
