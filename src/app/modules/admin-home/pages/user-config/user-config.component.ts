import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {

  passwordOld!:string
  passwordNew!:string

  passwordDB!:string
  idUser!:string
  flag=false
  passwordMatch:boolean =false
  mail!:string
  subscribePasword?:Subscription
  constructor(
    private userService:UserService
  ) { }

  matcherPassword(event:any){
    if(this.subscribePasword){
      this.subscribePasword.unsubscribe()
    }console.log(this.passwordOld)
    console.log(event)
    this.subscribePasword = this.userService.mathPassword(this.mail,this.passwordOld).subscribe(res=>{
      this.flag=res
    })
  }

  changePassword(){
    console.log('asa')
    this.userService.newPassword(this.idUser,this.passwordNew).subscribe(res=>{
      console.log('contraseña actualizada')
      Swal.fire({
        title: 'Contraseña actualizada',
        icon:'success',
        showConfirmButton: false,
        timer:1000,
      })
    })
  }

  ngOnInit(): void {
    this.userService.getUserSesion().subscribe(
      user=>{
        this.mail=user.mail
        this.idUser=user.id
      }
    )
  }

}
