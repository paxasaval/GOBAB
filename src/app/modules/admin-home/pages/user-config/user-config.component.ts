import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {

  passwordOld!:string
  passwordNew!:string

  passwordDB!:string

  passwordMatch:boolean =false
  mail!:string
  constructor(
    private userService:UserService
  ) { }

  matcherPassword(event:any){
    console.log(this.passwordOld)
    this.userService.mathPassword(this.mail,this.passwordOld).subscribe(
      res=>{
        console.log(res)
      }
    )
  }

  ngOnInit(): void {
    this.userService.getUserSesion().subscribe(
      user=>{
        this.mail=user.mail
      }
    )
  }

}
