import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { RolID } from 'src/app/models/rol';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    mail:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })

  ADMIN_ROL='Administrador'
  RESPONSABLE_ROL='Responsable'
  USER_ROL='Ciudadano'


  constructor(
    private authService:AuthService,
    private router:Router,
    private userService:UserService
  ) { }

  get mail(){
    return this.loginForm.get('mail')
  }
  get password(){
    return this.loginForm.get('password')
  }

  login(){
    Swal.fire({
      title:'Iniciando Sesión',
      didRender:()=>{
        Swal.showLoading()
      },
      showConfirmButton:false
    })
    const {mail,password} =  this.loginForm.value
    this.authService.login(mail,password).pipe(
      switchMap(userToken=>{
        console.log(userToken)
        const id = userToken.id as string
        localStorage.setItem('token',userToken.token)
        localStorage.setItem('user',userToken.id)
        return this.userService.userById(id)
      })
    ).subscribe(
      user=>{
      this.userService.setUserSesion(user)
      const rol = user.rol as RolID
      if(rol.name===this.ADMIN_ROL || rol.name===this.RESPONSABLE_ROL){
        this.router.navigate(['/admin'])
        Swal.close()
      }
      if(rol.name===this.USER_ROL){
        this.router.navigate(['/user'])
        Swal.close()
      }
    },
    error=>{
      const msg = error.error.error
      Swal.update({
        title:`Error al iniciar sesion: ${msg}`,
        icon:'error',
        showConfirmButton:true,
      })
    }
    )
  }

  ngOnInit(): void {
  }

}
