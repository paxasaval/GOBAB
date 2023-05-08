import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss']
})
export class InfoSectionComponent implements OnInit {

  title="ISO 18091"
  img='../../../../../assets/infoSlide1.png'
  details=[
    'Ventajas para los CIUDADANOS',
    'Mayor confianza en la institución y su gobierno: el gobierno local alcanza unos niveles óptimos de gestión y asume sus funciones ante los ciudadanos de forma eficiente y transparente.',
    'Propulsa la mejora en otros ámbitos: el buen gobierno local no sólo es positivo para sus propios habitantes, sino que también tiene efectos beneficiosos para el resto de gobiernos regionales y nacionales.',
    'Más y mejores servicios: la optimización de los recursos redunda en una mayor capacidad de atención al ciudadano y sus necesidades.',
    'Ventajas para la ORGANIZACIÓN',
    'Mejora de la eficiencia en la gestión de los procesos, especialmente en lo que se refiere a los procesos de gestión de gobierno.',
    'Mejora de la calidad del servicio al ciudadano, ante la continua y sistemática revisión de los procesos de gobierno, la mejora de la atención al ciudadano o el desarrollo social incluyente y sostenible.',
    'Mayor nivel de capacitación del personal, por medio de la exhaustiva revisión de su formación y necesidades de reciclaje.',

  ]
  resourses=[
    'https://www.iso.org/obp/ui#iso:std:iso:18091:ed-2:v1:es'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
