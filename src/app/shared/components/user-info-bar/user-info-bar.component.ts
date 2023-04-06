import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-bar',
  templateUrl: './user-info-bar.component.html',
  styleUrls: ['./user-info-bar.component.scss']
})
export class UserInfoBarComponent implements OnInit {

  userIsLogged:boolean = false
  image ='../../../../assets/userDefault.png'
  mail = 'paxasaval1003@gmail.com'
  rol = 'ciudadano'
  constructor() { }

  ngOnInit(): void {
  }

  loggOut(){

  }
  loggIn(){

  }
}
