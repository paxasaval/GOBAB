import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSlide } from 'src/app/modules/general-user/components/semaphore/semaphore.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  title= '4.3 Imagen del entorno y atractividad'

  data!:DataSlide

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.params as DataSlide
    this.title = `${this.data.quadrant}.${this.data.number} ${this.data.name}`
  }

}
