import { UserService } from './../../../../services/user/user.service';
import { Subscription } from 'rxjs';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RolService } from 'src/app/services/rol/rol.service';
import { RolID } from 'src/app/models/rol';
import Swal from 'sweetalert2';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { UserIDwithRolID } from 'src/app/models/user';
import { error } from 'console';

@Component({
  selector: 'app-dialog-new-user',
  templateUrl: './dialog-new-user.component.html',
  styleUrls: ['./dialog-new-user.component.scss']
})
export class DialogNewUserComponent implements OnInit,OnChanges {

  @Input() user!:UserIDwithRolID

  formUser=new FormGroup({
    name: new FormControl(''),
    mail: new FormControl(''),
    rol: new FormControl(''),
    password: new FormControl(''),
  })
  subscription!:Subscription
  allRol:RolID[]=[]
  edit=false
  create=true
  constructor(
    private rolService:RolService,
    private userService:UserService,
    private modal: NzModalRef

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.user){
      console.log(this.user)
      this.formUser.get('name')?.setValue(this.user.name)
      this.formUser.get('mail')?.setValue(this.user.mail)
      this.formUser.get('rol')?.setValue(this.user.rol.id)
      this.formUser.get('password')?.setValue('')

    }
  }

  getPassword(){
    const x = this.mail.split('@')[0]
    const y = this.name.split(' ') as string[]
    let z=''
    y.forEach(p=>{
      z+=p[0]
    })
    z+=x
    return z
  }

  createUser(){
    Swal.fire({
      title:'Creando Usuario',
      didOpen:()=>{
        Swal.showLoading()
      }
    })
    this.userService.newUser(this.name,this.mail,this.rol,this.password).subscribe(
      res=>{
        console.log(res)
        Swal.close()
        this.modal.destroy()
      },
      error=>{
        Swal.close()
        console.log(error)
        Swal.fire({
          title:error.error.error,
          icon:'error',
          timer:3000,
          timerProgressBar:false,
        })
      }
    )
  }
  editUser(){
    Swal.fire({
      title:'Editando Usuario',
      didOpen:()=>{
        Swal.showLoading()
      }
    })
    this.userService.editUser(this.user.id,this.name,this.mail,this.rol,this.password).subscribe(
      res=>{
        console.log(res)
        Swal.close()
        this.modal.destroy()
      },
      error=>{
        Swal.close()
        console.log(error)
        Swal.fire({
          title:error.error.error,
          icon:'error',
          timer:3000,
          timerProgressBar:false,
        })
      }
    )
  }
  changeRol(event:RolID){
    this.formUser.get('password')?.setValue(this.getPassword())
  }
  ngOnInit(): void {
    if(this.user){
      this.formUser.get('name')?.setValue(this.user.name)
      this.formUser.get('mail')?.setValue(this.user.mail)
      this.formUser.get('rol')?.setValue(this.user.rol.id)
      this.formUser.get('password')?.setValue('')
      this.create=false
      this.edit=true
    }
    this.subscription=this.rolService.getAllRol().subscribe(
      rol=>{
        this.allRol=rol
      }
    )
  }
  get name(){
    return this.formUser.get('name')?.value
  }
  get mail(){
    return this.formUser.get('mail')?.value
  }
  get rol(){
    return this.formUser.get('rol')?.value
  }
  get password(){
    return this.formUser.get('password')?.value
  }

}
