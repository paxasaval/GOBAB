import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    mail:new FormControl(''),
    password:new FormControl('')
  })


  constructor() { }

  login(){

  }

  ngOnInit(): void {
  }

}
